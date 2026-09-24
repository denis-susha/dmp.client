import { useState, useEffect, useCallback, Dispatch, SetStateAction } from "react";

const isClient = typeof window !== "undefined";

/**
 * Custom hook to manage state in localStorage.
 * Ensures client-side only execution, syncs across tabs/windows,
 * and avoids Next.js hydration errors.
 *
 * @param key The key to use in localStorage.
 * @param initialValue The initial value to use if the key is not found, on the server, or during initial hydration. Can be a value or a function returning a value.
 * @returns A stateful value, and a function to update it.
 */
function useLocalStorage<T>(key: string, initialValue: T | (() => T)): [T, Dispatch<SetStateAction<T>>] {
    // Always start from initialValue (also on the client) to avoid hydration mismatches;
    // the stored value is applied by the effect below right after hydration.
    const getInitialState = (): T => (initialValue instanceof Function ? initialValue() : initialValue);

    const [storedValue, setStoredValue] = useState<T>(getInitialState);

    useEffect(() => {
        if (!isClient) {
            return;
        }
        try {
            const item = window.localStorage.getItem(key);
            if (item !== null) {
                const valueFromStorage = JSON.parse(item) as T;
                if (JSON.stringify(storedValue) !== JSON.stringify(valueFromStorage)) {
                    setStoredValue(valueFromStorage);
                }
            }
        } catch (error) {
            console.warn(`Error reading localStorage key “${key}” on mount:`, error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    const setValue: Dispatch<SetStateAction<T>> = useCallback(
        (value) => {
            if (!isClient) {
                console.warn(`Tried to set localStorage key “${key}” from server-side.`);
                return;
            }
            try {
                const valueToStore = value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
                // The native 'storage' event only fires in other tabs; dispatch it manually so that
                // other hook instances in this window stay in sync as well.
                window.dispatchEvent(
                    new StorageEvent("storage", {
                        key: key,
                        newValue: JSON.stringify(valueToStore),
                        storageArea: window.localStorage,
                    })
                );
            } catch (error) {
                console.warn(`Error setting localStorage key “${key}”:`, error);
            }
        },
        [key, storedValue]
    );

    // Sync with changes made in other tabs/windows (and the manual dispatch above).
    useEffect(() => {
        if (!isClient) {
            return;
        }

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === key && event.storageArea === window.localStorage) {
                try {
                    if (event.newValue === null) {
                        const calculatedInitialValue = initialValue instanceof Function ? initialValue() : initialValue;
                        setStoredValue(calculatedInitialValue);
                    } else {
                        const newValueParsed = JSON.parse(event.newValue) as T;
                        // Compare first to avoid an update loop caused by our own manual dispatch.
                        if (JSON.stringify(storedValue) !== JSON.stringify(newValueParsed)) {
                            setStoredValue(newValueParsed);
                        }
                    }
                } catch (error) {
                    console.warn(`Error parsing storage event value for key “${key}”:`, error);
                    setStoredValue(initialValue instanceof Function ? initialValue() : initialValue);
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [key, initialValue, storedValue]);

    return [storedValue, setValue];
}

export default useLocalStorage;

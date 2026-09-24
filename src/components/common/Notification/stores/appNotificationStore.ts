import { createStore } from "zustand/vanilla";
import { AppNotificationType, IAppNotification } from "../appNotification";

export interface IAppNotificationState {
    error: string | null;
    notifications: IAppNotification[];
    addNotification: (message: string, type: AppNotificationType) => void;
    dismissNotification: (id: string) => void;
    setSeen: (id: string, val: boolean) => void;
}

export type AppNotificationStore = IAppNotificationState;

export const createAppNotificationStore = () => {
    return createStore<AppNotificationStore>()((set) => ({
        error: null,
        notifications: [],
        addNotification: (message: string, type: AppNotificationType) => {
            const newNotification = { id: Date.now().toString(), message, type, seen: false } as IAppNotification;
            set((state) => ({ notifications: [...state.notifications, newNotification] }));
        },
        dismissNotification: (id: string) => {
            set((state) => ({ notifications: state.notifications.filter((notification) => notification.id !== id) }));
        },
        setSeen: (id: string, val: boolean) => {
            set(({ notifications }) => ({
                notifications: notifications.map((notification) =>
                    notification.id === id ? { ...notification, seen: val } : notification
                ),
            }));
        },
    }));
};

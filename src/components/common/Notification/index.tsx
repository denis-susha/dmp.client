import React, { FC, useEffect } from "react";
import styles from "./styles.module.css";
import { useAppNotificationStore } from "./stores/appNotificationStoreProvider";

const NotificationComponent: FC = () => {
    const { notifications, dismissNotification, setSeen } = useAppNotificationStore((state) => state);

    useEffect(() => {
        notifications.forEach((notification) => {
            if (!notification.seen) {
                setSeen(notification.id, true);
                setTimeout(() => {
                    dismissNotification(notification.id);
                }, 5000);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(notifications), dismissNotification]);

    return (
        <div className={styles.notificationContainer}>
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`${styles.notification} ${
                        notification.type == "error"
                            ? styles.error
                            : notification.type == "success"
                              ? styles.success
                              : styles.info
                    }`}
                >
                    <span>{notification.message}</span>
                    <button onClick={() => dismissNotification(notification.id)}>
                        <div className="close-btn-content">&times;</div>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default NotificationComponent;

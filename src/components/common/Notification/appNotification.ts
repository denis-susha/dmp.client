export type AppNotificationType = "success" | "error" | "info";

export interface IAppNotification {
    id: string;
    message: string;
    type: AppNotificationType;
    seen: boolean;
}

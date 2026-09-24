import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

class SignalRService {
    private static instance: SignalRService;
    private connection: HubConnection;

    private constructor(hubUrl: string) {
        this.connection = new HubConnectionBuilder()
            .withUrl(hubUrl, { withCredentials: true })
            .configureLogging(LogLevel.Debug)
            .withAutomaticReconnect()
            .build();
    }

    public static getInstance(hubUrl: string) {
        if (!SignalRService.instance) {
            SignalRService.instance = new SignalRService(hubUrl);
        }
        return SignalRService.instance;
    }

    startConnection = async () => {
        if (this.connection.state === "Connected") return; // Avoid reconnecting
        try {
            await this.connection.start();
            console.log("SignalR Connected.");
        } catch (err: any) {
            console.error("Error starting SignalR connection:", err);

            if (err.message.includes("Status code '401'")) {
                window.location.reload();
            } else {
                setTimeout(this.startConnection, 5000); // Retry connection
            }
        }
    };

    stopConnection = () => {
        if (this.connection.state !== "Disconnected") {
            this.connection.stop();
        }
    };

    on(eventName: string, callback: (...args: any[]) => void) {
        this.connection.on(eventName, callback);
    }

    off(eventName: string) {
        this.connection.off(eventName);
    }

    send(eventName: string, ...args: any[]) {
        this.connection.send(eventName, ...args);
    }
}

export default SignalRService;

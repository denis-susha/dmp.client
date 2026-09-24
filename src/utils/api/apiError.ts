export class ApiError {
    public message: string;
    public statusCode: number;

    public constructor(message: string, statusCode: number) {
        this.message = message;
        this.statusCode = statusCode;
    }

    public get forbidden() {
        return this.statusCode === 403;
    }

    public get unauthorized() {
        return this.statusCode === 401;
    }

    public toString() {
        return this.message;
    }
}

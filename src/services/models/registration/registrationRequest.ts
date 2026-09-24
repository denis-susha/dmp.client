export interface IRegistrationRequest {
    email: string;
    password: string;
    confirmPassword: string;
    turnstileToken: string;
}

export interface ICategoryDataRequest {
    category: string;
    page: number;
    filters?: Record<string, string>;
}

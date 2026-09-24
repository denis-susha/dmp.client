import { IBlogPostAttributes } from "./blogPostAttributes";

export interface IBlogPost {
    blogPostId: number;
    slug: string;
    coverPath: string;
    publishedAt: string;
    minRead: number;
    title: string;
    shortContent?: string;
    content?: string;
    attributes?: IBlogPostAttributes;
}

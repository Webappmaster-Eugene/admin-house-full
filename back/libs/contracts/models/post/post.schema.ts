import { z } from 'zod';

export const PostSchema = z.object({
    uuid: z.string().uuid(),
    views: z.number(),
    alias: z.string(),
    description: z.string(),
    finalText: z.string(),
    title: z.string(),
    status: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    ratingName: z.string(),
    articleImage: z.string(),
    authorUuid: z.string(),
    categoryUuid: z.string(),
    creatorUuid: z.string(),
    lastEditorUuid: z.string(),
    updatedAt: z.date(),
    createdAt: z.date(),
});

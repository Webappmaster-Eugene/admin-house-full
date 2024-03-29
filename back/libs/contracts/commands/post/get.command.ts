import { AssessmentsSchema, AuthorSchema, CategorySchema, PostSchema, ProductSchema, QuestionAnswerSchema } from '../../models';
import { z } from 'zod';

const GetPostWithRelationsResponseSchema = PostSchema.merge(
    z.object({
        category: CategorySchema,
        author: AuthorSchema,
        products: z.array(
            ProductSchema.merge(
                z.object({
                    assessments: z.array(AssessmentsSchema),
                }),
            ),
        ),
        questionAnswers: z.array(QuestionAnswerSchema),
    }),
);

const GetPostsResponseSchema = z.object({
    posts: z.array(PostSchema),
});

export namespace GetPostWithRelationsCommand {
    export const ResponseSchema = GetPostWithRelationsResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}

export namespace GetPostsCommand {
    export const ResponseSchema = GetPostsResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}

import { z } from 'zod';
import { AssessmentsSchema, CategorySchema, PostSchema, ProductSchema } from '../../models';
import { DirectionSort, PostStatus } from '../../enums';

const FindPostRequestSchema = z.object({
    category: z.string().optional(),
    status: PostStatus.optional(),
    limit: z.string().transform(val => parseInt(val, 10)),
    offset: z.string().transform(val => parseInt(val, 10)),
    direction: DirectionSort.optional(),
});

const FindPostResponseSchema = z.object({
    posts: z.array(
        PostSchema.merge(
            z.object({
                products: z.array(
                    ProductSchema.merge(
                        z.object({
                            assessments: z.array(AssessmentsSchema),
                        }),
                    ),
                ),

                category: CategorySchema.pick({ title: true, alias: true }),
            }),
        ),
    ),
    totalPage: z.number(),
    page: z.number(),
});

export namespace FindPostCommand {
    export const RequestSchema = FindPostRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = FindPostResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}

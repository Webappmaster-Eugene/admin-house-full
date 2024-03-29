import { z } from 'zod';
import { AssessmentsSchema, CategorySchema, PostSchema, ProductSchema } from '../../models';
import { DirectionSort } from '../../enums';

const SearchPostRequestSchema = z.object({
    category: z.string().optional(),
    limit: z.string().transform(val => parseInt(val, 10)),
    offset: z.string().transform(val => parseInt(val, 10)),
    direction: DirectionSort.optional(),
});

const SearchPostResponseSchema = z.object({
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

export namespace SearchPostCommand {
    export const RequestSchema = SearchPostRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = SearchPostResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}

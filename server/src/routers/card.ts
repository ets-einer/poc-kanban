import { prisma } from '../../utils/prisma';
import { z } from "zod";
import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from '../../utils/trpc';

const createCardSchema = z.object({
    taskName: z.string(),
    priority: z.string(),
    validity: z.string(),
    descriptiom: z.string()
})

export const cardRouter = router({
    allCard: publicProcedure.query(async () => {
        try {
            const allCards = await prisma.card.findMany();
            return { allCards }

        } catch (error) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                cause: error,
                message: "Failed to get all Cards"
            })
        }
    }),
    createCard: publicProcedure
        .input(createCardSchema)
        .mutation(async ({ input }) => {
            try {
                const createCard = await prisma.card.create({
                    data: {
                        taskName: input.taskName,
                        priority: input.priority,
                        validity: input.validity,
                        description: input.descriptiom
                    }
                })
                return { createCard }

            } catch (error) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    cause: error,
                    message: "Failed to create Card"
                })
            }
        }),
});

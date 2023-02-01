import { prisma } from '../../utils/prisma';
import { z } from "zod";
import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from '../../utils/trpc';


const columnScheme = z.object({
    name: z.string(),
    color: z.string(),
    columnId: z.string()
})

const moveCardScheme = z.object({
    previousColumnId: z.string(),
    newColumnId: z.string(),
    cardId: z.string()
})
export const columnRouter = router({
    addColumn: publicProcedure.input(columnScheme).mutation(async ({ input }) => {
        try {
            const column = await prisma.column.create({
                data: {
                    name: input.name,
                    color: input.color
                }
            })
            return { column }
        } catch (error) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                cause: error,
                message: 'Cannot create column!'
            })
        }
    }),
    getColumn: publicProcedure.query(async () => {
        try {
            const columns = await prisma.column.findMany()
            return { columns }
        } catch (error) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                cause: error,
                message: 'Cannot get columns!'
            })
        }
    }),

    })

})
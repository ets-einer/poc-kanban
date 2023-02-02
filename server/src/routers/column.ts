import { prisma } from "../../utils/prisma";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../../utils/trpc";

const createColumnScheme = z.object({
  name: z.string(),
  color: z.string()
})

const columnScheme = z.object({
  name: z.string(),
  color: z.string(),
  columnId: z.string(),
});

const moveCardScheme = z.object({
  newColumnId: z.string(),
  cardId: z.string(),
});

export const columnRouter = router({
  addColumn: publicProcedure.input(createColumnScheme).mutation(async ({ input }) => {
    try {
      const column = await prisma.column.create({
        data: {
          name: input.name,
          color: input.color,
        },
      });
      return { column };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        cause: error,
        message: "Cannot create column!",
      });
    }
  }),
  getColumn: publicProcedure.query(async () => {
    try {
      const columns = await prisma.column.findMany();
      return { columns };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        cause: error,
        message: "Cannot get columns!",
      });
    }
  }),
  updateColumn: publicProcedure
    .input(columnScheme)
    .mutation(async ({ input }) => {
      try {
        const updatedColumn = await prisma.column.update({
          where: {
            id: input.columnId,
          },
          data: {
            name: input.name,
            color: input.color,
          },
        });
        return { updatedColumn };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: error,
          message: "Cannot edit column!",
        });
      }
    }),
  deleteColumn: publicProcedure
    .input(columnScheme)
    .mutation(async ({ input }) => {
      try {
        const deletedColumn = await prisma.column.delete({
          where: {
            id: input.columnId,
          },
        });
        return { deletedColumn };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: error,
          message: "Cannot delete column!",
        });
      }
    }),
  moveCard: publicProcedure
    .input(moveCardScheme)
    .mutation(async ({ input }) => {
      const movedCard = await prisma.card.update({
        where: {
          id: input.cardId,
        },
        data: {
          columnId: input.newColumnId,
        },
      });
      return { movedCard };
    }),
});

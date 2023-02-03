import { prisma } from "../../utils/prisma";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../../utils/trpc";

const createCardSchema = z.object({
  title: z.string(),
  priority: z.string(),
  description: z.string(),
  cardId: z.string(),
});

export const cardRouter = router({
  getAllCards: publicProcedure.query(async () => {
    try {
      const allCards = await prisma.card.findMany({
        include: {
          Column: true,
        },
      });
      return { allCards };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        cause: error,
        message: "Failed to get all Cards",
      });
    }
  }),
  createCard: publicProcedure
    .input(createCardSchema)
    .mutation(async ({ input }) => {
      try {
        const createdCard = await prisma.card.create({
          data: {
            title: input.title,
            description: input.description,
            priority: input.priority,
          },
        });
        return { createdCard };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: error,
          message: "Cannot to create card!",
        });
      }
    }),
  updateCard: publicProcedure
    .input(createCardSchema)
    .mutation(async ({ input }) => {
      try {
        const updatedCard = await prisma.card.update({
          where: {
            id: input.cardId,
          },
          data: {
            title: input.title,
            description: input.description,
            priority: input.priority,
          },
        });
        return { updatedCard };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: error,
          message: "Cannot update card!",
        });
      }
    }),
  deleteCard: publicProcedure
    .input(createCardSchema)
    .mutation(async ({ input }) => {
      try {
        const deletedCard = await prisma.card.delete({
          where: {
            id: input.cardId,
          },
        });
        return { deletedCard };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: error,
          message: "Cannot delete card!",
        });
      }
    }),
});

import { prisma } from "../../utils/prisma";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../../utils/trpc";

//Terminate Member Routes

const createMemberSchema = z.object({
  nameMember: z.string(),
  emailMember: z.string(),
  edvMember: z.string(),
});

export const memberRouter = router({
  allMembers: publicProcedure.query(async () => {
    try {
      const allMembers = await prisma.member.findMany();
      return { allMembers };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        cause: error,
        message: "Failed to get all Members",
      });
    }
  }),

  //Create new edit data mutation
  createMember: publicProcedure
    .input(createMemberSchema)
    .mutation(async ({ input }) => {
      try {
        const createdMember = await prisma.member.create({
          data: {
            name: input.nameMember,
            email: input.emailMember,
            edv: input.edvMember,
          },
        });
        return { createdMember };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: error,
          message: "Failed to create a Member",
        });
      }
    }),
});
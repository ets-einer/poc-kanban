import { prisma } from '../utils/prisma';
import { z } from "zod";
import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from '../utils/trpc';

//Terminate Member Routes

export const memberRouter = router({
    
})
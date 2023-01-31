import superjson from 'superjson'
import { initTRPC } from '@trpc/server';
// import { prisma } from './prisma'

const t = initTRPC.context().create({
    transformer: superjson,
    errorFormatter({ shape }) {
        return shape;
    },
});

export const router = t.router;

export const publicProcedure = t.procedure;
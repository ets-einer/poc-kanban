import express from 'express'
import { date, z } from 'zod'
import cors from 'cors'
import * as trpcExpress from '@trpc/server/adapters/express';
import superjson from 'superjson'
import { initTRPC } from '@trpc/server';
// import { User } from '@prisma/client';
import { prisma } from './prisma'
   
const t = initTRPC.create({
    transformer: superjson,
    errorFormatter({ shape }) {
        return shape;
    },
});


export const router = t.router;

export const mergeRouters = t.mergeRouters;

export const publicProcedure = t.procedure;

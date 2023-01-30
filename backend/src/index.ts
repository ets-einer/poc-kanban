import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './server'
import { prisma } from './utils/prisma';
import { z } from "zod";
import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson'

const app = express()
const PORT = 3000

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
}));

const t = initTRPC.create({
    transformer: superjson,
    errorFormatter({shape}) {
        return shape;
    }
});

const createCardSchema = z.object({
    taskName: z.string(),
    priority: z.string(),
    validity: z.string(),
    descriptiom: z.string()
})

const cardRouter = t.router({
    allCard: t.procedure.query(async () => {
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
    createCard: t.procedure
    .input(createCardSchema)
    .mutation(async ({input}) => {
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

export type AppRouter = typeof cardRouter;

//Config
app.use(cookieParser());
app.use(express.json());
app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: cardRouter,
    }),
);

app.get("/", (req, res) => {
    return res.json({message: "Funcionando"})
});

//Exibir cards
app.get("/card", async (req, res) => {
    const cards = await prisma.card.findMany();
    return res.json({ message: "Teste", cards})
})

app.post("/cards", async (req, res) => {
    //Show req body
    console.log("request: ", req.body);
})

app.listen(PORT, () => { console.log(`Server is running in http://localhost:${PORT}`) })
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './server'

const app = express()
const PORT = 3000

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
}));

//Config
app.use(cookieParser());
app.use(express.json());
app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
    }),
);

app.get("/", (req, res) => {
    return res.json({ message: "Funcionando" })
});

app.listen(PORT, () => { console.log(`Server is running in http://localhost:${PORT}`) })
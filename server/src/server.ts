import { router } from './utils/trpc'
import { cardRouter } from './routers/card'
import { columnRouter } from './routers/column';
export const appRouter = router({
    card: cardRouter,
    column: columnRouter
});

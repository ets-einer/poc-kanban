import { cardRouter } from './routers/card';
import { columnRouter } from './routers/column';
import { router } from './utils/trpc'

export const appRouter = router({
    card: cardRouter,
    column: columnRouter,
  });
  
export type AppRouter = typeof appRouter;
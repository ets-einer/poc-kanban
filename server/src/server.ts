import { cardRouter } from '../src/routers/card';
import { columnRouter } from '../src/routers/column';
import { router } from '../utils/trpc'
import { memberRouter } from './routers/members';

export const appRouter = router({
    card: cardRouter,
    column: columnRouter,
    member: memberRouter,
  });
  
export type AppRouter = typeof appRouter;
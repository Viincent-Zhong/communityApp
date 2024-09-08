import { Router } from 'express';

import indexRouter from './index';
import authRouter from './auth';
import userRouter from './user';

const router = Router();

router.use('/', indexRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter);

export default router;
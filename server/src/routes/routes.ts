import { Router } from 'express';

import indexRouter from './index';
import authRouter from './auth';
import userRouter from './user';
import chatRouter from './posts/chat';
import meetingRouter from './posts/meeting';
import sellRouter from './posts/sells';
import commentRouter from './comments';

const router = Router();

router.use('/', indexRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/posts', chatRouter);
router.use('/posts', meetingRouter);
router.use('/posts', sellRouter);
router.use('/comments', commentRouter);

export default router;
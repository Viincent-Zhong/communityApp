import { Router } from 'express';

import indexRouter from './index';
import authRouter from './auth';

const router = Router();

router.use('/', indexRouter);
router.use('/auth', authRouter);

export default router;
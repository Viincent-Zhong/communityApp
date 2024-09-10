import { Router } from 'express';
import { createSells, getSells, getSell } from '../../controllers/posts/sells';

const router = Router();

router.post('/sells', createSells);

router.get('/sells', getSells);

router.get('/sell-details', getSell);

export default router;
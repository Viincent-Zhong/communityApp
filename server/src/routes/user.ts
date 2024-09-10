import { Router } from 'express';
import { getUser, getUserFromId } from '../controllers/user';

const router = Router();

router.get('/', getUser);

router.get('/', getUserFromId);

export default router;
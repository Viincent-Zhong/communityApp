import { Router } from 'express';
import { getUser, getUserFromId, updateUser } from '../controllers/user';

const router = Router();

router.get('/', getUser);

router.get('/unique', getUserFromId);

router.post('/', updateUser);

export default router;
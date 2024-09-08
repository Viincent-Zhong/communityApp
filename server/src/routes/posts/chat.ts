import { Router } from 'express';
import { createChat } from '../../controllers/posts/chat';

const router = Router();

router.post('/chat', createChat);

export default router;
import { Router } from 'express';
import { createChat, getChats, getChat } from '../../controllers/posts/chat';

const router = Router();

router.post('/chat', createChat);

router.get('/chat', getChats);

router.get('/chat-details', getChat);

export default router;
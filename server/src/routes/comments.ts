import { Router } from 'express';
import { createComment, getComments } from '../controllers/comments';

const router = Router();

router.post('/', createComment);
router.get('/', getComments);

export default router;
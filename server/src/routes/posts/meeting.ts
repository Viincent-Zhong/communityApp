import { Router } from 'express';
import { createMeeting, getMeetings, getMeeting } from '../../controllers/posts/meeting';

const router = Router();

router.post('/meeting', createMeeting);

router.get('/meeting', getMeetings);

router.get('/meeting', getMeeting);


export default router;
import { Router } from 'express';
import { submitLead, getLeads } from '../controllers/leadController.js';
import { protect } from '../middleware/auth.js';

const router = Router();
router.post('/', submitLead);
router.get('/', protect, getLeads);

export default router;

import { Router } from 'express';
import { fetchSettingsController, updateSettingsController } from '../controllers/settingsController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', fetchSettingsController);
router.put('/', protect, updateSettingsController);

export default router;

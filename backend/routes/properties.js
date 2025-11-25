import { Router } from 'express';
import {
  getAllProperties,
  getProperty,
  createPropertyController,
  updatePropertyController,
  deletePropertyController
} from '../controllers/propertyController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', getAllProperties);
router.get('/:id', getProperty);
router.post('/', protect, upload.array('images'), createPropertyController);
router.put('/:id', protect, upload.array('images'), updatePropertyController);
router.delete('/:id', protect, deletePropertyController);

export default router;

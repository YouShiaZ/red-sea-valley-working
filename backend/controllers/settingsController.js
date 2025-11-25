import Joi from 'joi';
import { getSettings, setSettings } from '../models/settingsModel.js';

const settingsSchema = Joi.object({
  email: Joi.string().email().allow(''),
  whatsapp: Joi.string().allow(''),
  facebook: Joi.string().allow(''),
  instagram: Joi.string().allow(''),
  tiktok: Joi.string().allow('')
});

export const fetchSettingsController = async (_req, res, next) => {
  try {
    const settings = await getSettings();
    res.json(settings);
  } catch (err) {
    next(err);
  }
};

export const updateSettingsController = async (req, res, next) => {
  try {
    const { error, value } = settingsSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json({ message: 'Validation failed', details: error.details });
    const saved = await setSettings(value);
    res.json(saved);
  } catch (err) {
    next(err);
  }
};

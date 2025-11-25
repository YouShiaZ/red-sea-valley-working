import Joi from 'joi';
import { createLead, listLeads } from '../models/leadModel.js';
import { messaging } from '../config/firebase.js';

const notifyWebhook = async (url, payload) => {
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.warn('Notification webhook skipped', error.message);
  }
};

const leadSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().allow(''),
  message: Joi.string().allow(''),
  propertyId: Joi.string().required()
});

export const submitLead = async (req, res, next) => {
  try {
    const { error, value } = leadSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json({ message: 'Validation failed', details: error.details });

    const lead = await createLead(value);

    await notifyWebhook(process.env.WHATSAPP_WEBHOOK, { type: 'whatsapp', lead });
    await notifyWebhook(process.env.EMAIL_WEBHOOK, { type: 'email', lead });

    // Notify via FCM topic if configured
    try {
      await messaging().send({
        topic: 'rsv-leads',
        notification: { title: 'New RSV lead', body: `${value.name} for ${value.propertyId}` },
        data: { phone: value.phone, email: value.email || '', message: value.message || '' }
      });
    } catch (notifyErr) {
      console.warn('FCM notification skipped', notifyErr.message);
    }

    res.status(201).json(lead);
  } catch (err) {
    next(err);
  }
};

export const getLeads = async (_req, res, next) => {
  try {
    const leads = await listLeads();
    res.json(leads);
  } catch (err) {
    next(err);
  }
};

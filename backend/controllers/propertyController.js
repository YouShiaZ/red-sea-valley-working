import Joi from 'joi';
import { listProperties, findProperty, createProperty, updateProperty, removeProperty } from '../models/propertyModel.js';
import { uploadImages } from '../utils/storage.js';
import { seedProperties } from '../config/seedData.js';

const propertySchema = Joi.object({
  title: Joi.string().required(),
  type: Joi.string().valid('villa', 'apartment', 'studio', 'shop').required(),
  location: Joi.string().required(),
  price: Joi.number().required(),
  rent: Joi.boolean().default(false),
  bedrooms: Joi.number().min(0).required(),
  bathrooms: Joi.number().min(0).required(),
  area: Joi.number().min(0).required(),
  furnished: Joi.boolean().default(false),
  floor: Joi.number().min(0).required(),
  finishing: Joi.string().allow('').default(''),
  description: Joi.string().allow(''),
  coordinates: Joi.object({ lat: Joi.number(), lng: Joi.number() }).default({}),
  images: Joi.array().items(Joi.string().uri()).default([]),
  status: Joi.string().valid('available', 'sold', 'rented').default('available')
});

export const getAllProperties = async (_req, res, next) => {
  try {
    const properties = await listProperties();
    res.json(properties);
  } catch (error) {
    console.warn('Serving seed properties', error.message);
    res.json(seedProperties);
  }
};

export const getProperty = async (req, res, next) => {
  try {
    const property = await findProperty(req.params.id);
    if (!property) return res.status(404).json({ message: 'Not found' });
    res.json(property);
  } catch (error) {
    const fallback = seedProperties.find((p) => p.id === req.params.id);
    if (fallback) return res.json(fallback);
    next(error);
  }
};

export const createPropertyController = async (req, res, next) => {
  try {
    const { error, value } = propertySchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json({ message: 'Validation failed', details: error.details });
    if (req.files?.length) {
      const urls = await uploadImages(req.files);
      value.images = [...(value.images || []), ...urls];
    }
    const property = await createProperty(value);
    res.status(201).json(property);
  } catch (err) {
    next(err);
  }
};

export const updatePropertyController = async (req, res, next) => {
  try {
    const { error, value } = propertySchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json({ message: 'Validation failed', details: error.details });
    if (req.files?.length) {
      const urls = await uploadImages(req.files);
      value.images = [...(value.images || []), ...urls];
    }
    const updated = await updateProperty(req.params.id, value);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deletePropertyController = async (req, res, next) => {
  try {
    await removeProperty(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

import { bucket } from '../config/firebase.js';
import { randomUUID } from 'crypto';

export const uploadImages = async (files = []) => {
  const uploaded = [];
  for (const file of files) {
    const filename = `properties/${randomUUID()}-${file.originalname}`;
    const fileUpload = bucket().file(filename);
    await fileUpload.save(file.buffer, { contentType: file.mimetype, public: true });
    await fileUpload.makePublic();
    uploaded.push(`https://storage.googleapis.com/${bucket().name}/${filename}`);
  }
  return uploaded;
};

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getAdmin, setAdmin } from '../models/adminModel.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let admin = await getAdmin();

    if (!admin && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      const hashed = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);
      admin = { email: process.env.ADMIN_EMAIL, password: hashed };
      await setAdmin(admin);
    }

    if (!admin) return res.status(401).json({ message: 'Admin not configured' });

    const isMatch = email === admin.email && bcrypt.compareSync(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'supersecret', { expiresIn: '7d' });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

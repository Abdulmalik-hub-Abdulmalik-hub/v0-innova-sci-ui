import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // Changed from 'bcrypt' to 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET is not defined in environment variables.');
}

/**
 * Handles JWT Generation and Password Hashing
 * Optimized for Vercel Serverless Functions
 */
export const hashPassword = async (password: string): Promise<string> => {
  // Using 10 rounds for optimal performance on serverless
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePasswords = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const signToken = (payload: object): string => {
  if (!JWT_SECRET) throw new Error('JWT_SECRET is missing');
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' }); // Extended to 7 days for better UX
};

export const verifyToken = (token: string): any => {
  try {
    if (!JWT_SECRET) return null;
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return null;
  }
};

import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  token: z.string(),
  password: z.string().min(6),
  repeatPassword: z.string().min(6),
});

export const tokenSchema = z.object({
  email: z.string().email(),
});
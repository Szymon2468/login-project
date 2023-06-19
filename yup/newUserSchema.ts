import type Prisma from '@prisma/client';
import * as y from 'yup';

export const newUserSchema: y.Schema<Partial<Prisma.User>> = y.object().shape({
  name: y
    .string()
    .required('You need to type your name.')
    .min(3, 'Your name should be at least 3 characters of length.'),
  email: y
    .string()
    .required('You need to type your email.')
    .email('Your typed email is not valid, check your email.'),
  password: y
    .string()
    .required('You need to type your password.')
    .min(10, 'Your password should be at least 10 characters of length.')
});

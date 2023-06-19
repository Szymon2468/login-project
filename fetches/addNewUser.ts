import { newUserSchema } from '@/yup/newUserSchema';

export const addNewUser = async (data: any) => {
  await newUserSchema.validate(data);

  const response: any = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if (response.ok) {
    return await result;
  }

  throw new Error(result.message);
};

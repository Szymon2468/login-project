export const changePassword = async (
  newPassword: string,
  oldPassword: string
) => {
  const response = await fetch('/api/auth/change-password', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ newPassword, oldPassword }),
    credentials: 'same-origin'
  });

  if (response.ok) {
    return response;
  }

  throw new Error('response nie okej');
};

export const sendMail = async (email: string, link: string) => {
  const result = await fetch('http://localhost:3000/api/email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, link })
  });
};

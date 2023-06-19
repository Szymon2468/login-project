import { checkIfTokenExists } from '@/app/api/utils/checkIfTokenExists';
import PageLayout from './PageLayout';

// export const dynamicParams = false;

// export async function generateStaticParams() {
//   const tokens = await getAllTokens();

//   if (tokens.length > 0) {
//     return tokens.map((token: any) => ({
//       token: token.token
//     }));
//   }

//   return [];
// }

const ForgotPasswordWithTokenPage = async ({
  params
}: {
  params: { token: string };
}) => {
  if (!(await checkIfTokenExists(params.token))) {
    return <p>Lol Ci w zęby</p>;
  }
  console.log('params', params);

  return <PageLayout token={params.token} />;
};

export default ForgotPasswordWithTokenPage;

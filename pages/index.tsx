import type { NextPage } from 'next';
import SigninBtn from '../components/SigninBtn';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import useCurrentUser from '../hooks/useCurrentUser';

const Home: NextPage = () => {
  const user = useCurrentUser();
  return (
    <>
      <h1>React & Next.js と AADB2C の連携</h1>

      <UnauthenticatedTemplate>
        <SigninBtn />
      </UnauthenticatedTemplate>

      <AuthenticatedTemplate>
        <p>
          こんにちは、{user?.familyName} {user?.givenName} さん
        </p>
        <p>メールアドレス：{user?.email}</p>
      </AuthenticatedTemplate>
    </>
  );
};

export default Home;
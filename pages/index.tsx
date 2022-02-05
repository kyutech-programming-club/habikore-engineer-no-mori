import type { NextPage } from 'next';
import SigninBtn from '../components/SigninBtn';

const Home: NextPage = () => {
  return (
    <>
      <h1>React & Next.js と AADB2C の連携</h1>
      <SigninBtn />
    </>
  );
};

export default Home;
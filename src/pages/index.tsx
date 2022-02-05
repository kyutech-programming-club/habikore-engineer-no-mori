import type { NextPage } from "next";
import Canvas from "../components/canvas";
import SigninBtn from '../components/SigninBtn';
import useCurrentUser from '../hooks/useCurrentUser';

const Home: NextPage = () => {
  const user = useCurrentUser();
  return ( 
  <>
    <h1>React & Next.js と AADB2C の連携</h1>
    <SigninBtn />
    <p>こんにちは、{user?.familyName} {user?.givenName} さん</p>
    <Canvas />
  </>
  );
};

export default Home;

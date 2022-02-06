import type { NextPage } from "next";
import Canvas from "../components/canvas";
import Header from "../components/Header";
import Modal from "../components/Modal";
import SigninBtn from "../components/SigninBtn";

import { get_user } from "../db/cosmos";
import useCurrentUser from "../hooks/useCurrentUser";

const Home: NextPage = () => {
  const user = useCurrentUser();
  get_user();
  return (
    <>
      <h1>React & Next.js と AADB2C の連携</h1>
      <SigninBtn />
      <button onClick={async () => await get_user()}>取得</button>
      <div>
        こんにちは、{user?.familyName} {user?.givenName} さん
      </div>
      <Canvas />
    </>
  );
};

export default Home;

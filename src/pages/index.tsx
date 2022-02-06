import type { NextPage } from "next";
import Canvas from "../components/canvas";
import Header from "../components/Header";
import Modal from "../components/Modal";
import SigninBtn from "../components/SigninBtn";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      {/* <h1>React & Next.js と AADB2C の連携</h1> */}
      {/* <SigninBtn /> */}
      {/* <div>
        こんにちは、{user?.familyName} {user?.givenName} さん
      </div> */}
      <Canvas />
    </>
  );
};

export default Home;

import { useMsal } from "@azure/msal-react";
import type { NextPage } from "next";
import { useRecoilState } from "recoil";
import { userState } from "../atom/atoms";
import Canvas from "../components/canvas";
import SigninBtn from "../components/SigninBtn";

import { create_user, get_user } from "../db/cosmos";
import useCurrentUser, { Account } from "../hooks/useCurrentUser";

const Home: NextPage = () => {
  const userr = useCurrentUser();
  const [user, setUser] = useRecoilState(userState);
  const { accounts } = useMsal();
  return (
    <>
      <h1>React & Next.js と AADB2C の連携</h1>
      <SigninBtn />
      <button
        onClick={async () => {
          const list = await get_user(userr?.sub);
          setUser({
            b2c_id: list[0],
            name: list[1],
            state: list[2],
            totalPoint: list[3],
            usedPoint: list[4],
            position: list[5],
            id: list[6],
          });
          console.log(user.name);
        }}
      >
        取得
      </button>
      <button
        onClick={() => {
          if (accounts.length > 0) {
            const account = accounts[0] as Account;

            create_user(
              account.idTokenClaims?.sub,
              account.idTokenClaims?.name,
              0,
              0,
              []
            );
          }
        }}
      >
        新しいお友達になる
      </button>
      <Canvas />
    </>
  );
};

export default Home;

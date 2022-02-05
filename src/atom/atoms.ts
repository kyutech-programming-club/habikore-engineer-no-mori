import { atom } from "recoil";
import { User } from "../components/canvas";

export const openState = atom<boolean>({
  key: "openState",
  default: false,
});

export const userState = atom<User>({
  key: "userState",
  default: {
    b2c_id: "",
    name: "",
    state: 0,
    totalPoint: 0,
    usedPoint: 0,
    position: null,
  },
});

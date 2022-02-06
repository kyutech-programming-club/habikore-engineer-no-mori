import { atom } from "recoil";
import { Card, User } from "../components/canvas";

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
    id: "",
  },
});

export const clickedImageState = atom<{ url: string; isImage: boolean }>({
  key: "clickedImageState",
  default: {
    url: "",
    isImage: false,
  },
});

export const cardsState = atom<Card[]>({
  key: "cardsState",
  default: [],
  dangerouslyAllowMutability: true,
});

export const indexState = atom<number>({
  key: "indexState",
  default: 0,
});

import { useState } from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import Modal from "./Modal";
import {
  cardsState,
  clickedImageState,
  indexState,
  openState,
  userState,
} from "../atom/atoms";

export type Card = {
  index: number;
  url: string;
  x: number;
  y: number;
};

export type User = {
  b2c_id: string;
  name: string;
  state: number;
  totalPoint: number;
  usedPoint: number;
  position: Card[] | null;
  id: string;
};

const Canvas: React.VFC = () => {
  // すべてのステッカーの配列
  const [cards, setCards] = useRecoilState<Card[]>(cardsState);
  // 追加するカードのインデックスをインクリメントする関数
  const [initialIndex, setInitialIndex] = useRecoilState(indexState);
  // カードを追加する関数
  // const addCard = (url: string) => {
  //   setCards([
  //     ...cards,
  //     {
  //       index: initialIndex,
  //       url,
  //       x: Math.floor(Math.random() * (200 - 80) + 80),
  //       y: Math.floor(Math.random() * (200 - 80) + 80),
  //     },
  //   ]);
  //   setInitialIndex(initialIndex + 1);
  // };
  // 特定番目のカードの座標を更新する
  const update = (index: number, x: number, y: number) => {
    const specificCard = cards[index];
    specificCard.x = x;
    specificCard.y = y;
  };
  // ドラッグしているオブジェクトのインデックス
  const [draggingIndex, setDraggingIdex] = useState<number>(0);
  const [trigger, setTrigger] = useState(0);

  const [showModal, setShowModal] = useRecoilState(openState);

  const [user, setUser] = useRecoilState(userState);
  const [image, setImage] = useRecoilState(clickedImageState);

  return (
    <div
      className="w-screen h-screen"
      style={{
        position: "relative",
        backgroundImage: "url(/tree5.png)",
      }}
      onDrop={(e) => {
        update(draggingIndex, e.clientX, e.clientY);
        setTrigger((initialTrigger) => {
          return initialTrigger + 1;
        });
        console.log(draggingIndex);
      }}
      onDragOver={(e) => e.preventDefault()} // enable onDrop event
    >
      {/* <button onClick={() => addCard("ahiahi")}>Add card!</button> */}
      <div>
        {cards.map((card) => (
          <div
            key={card.index}
            style={{
              position: "absolute",
              top: String(card.y) + "px",
              left: String(card.x) + "px",
            }}
            onDrag={() => {
              setDraggingIdex(card.index);
              console.log(card.index);
            }}
            draggable={true}
          >
            <Image src={card.url} alt="bird" width={128} height={128} />
          </div>
        ))}
      </div>
      <button>写真を撮ろう！</button>
      <button onClick={() => setShowModal((flag) => !flag)}>
        住人を招待する
      </button>
      {showModal && <Modal />}
    </div>
  );
};

export default Canvas;

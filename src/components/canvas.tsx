import { useState } from "react";
import Image from "next/image";
import { update_user } from "../db/cosmos";

type Card = {
  index: number;
  url: string;
  x: number;
  y: number;
};

const Canvas: React.VFC = () => {
  // すべてのステッカーの配列
  const [cards, setCards] = useState<Card[]>([]);
  // 追加するカードのインデックスをインクリメントする関数
  const [initialIndex, setInitialIndex] = useState(0);
  // カードを追加する関数
  const addCard = (url: string) => {
    setCards([
      ...cards,
      {
        index: initialIndex,
        url,
        x: Math.floor(Math.random() * (200 - 80) + 80),
        y: Math.floor(Math.random() * (200 - 80) + 80),
      },
    ]);
    setInitialIndex(initialIndex + 1);
  };
  // 特定番目のカードの座標を更新する
  const update = (index: number, x: number, y: number) => {
    const specificCard = cards[index];
    specificCard.x = x;
    specificCard.y = y;
  };
  // ドロップされた時の位置を保持する
  const [droppedPosition, setDroppedPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  // ドラッグしているオブジェクトのインデックス
  const [draggingIndex, setDraggingIdex] = useState<number>(0);
  const [trigger, setTrigger] = useState(0);

  return (
    <div
      style={{
        width: "1000px",
        height: "1000px",
        position: "relative",
        backgroundImage: "url(/sougen.jpg)",
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
      <button onClick={() => addCard("ahiahi")}>Add card!</button>
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
            <Image src="/bird.png" alt="bird" width={128} height={128} />
          </div>
        ))}
      </div>
      <button onClick={update_user()}>写真を撮ろう！</button>
    </div>
  );
};

export default Canvas;

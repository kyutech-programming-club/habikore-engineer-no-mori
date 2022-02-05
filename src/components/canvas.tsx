import { useState } from "react";
import Image from "next/image";

const Canvas: React.VFC = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div
      style={{
        width: "1000px",
        height: "1000px",
        position: "relative",
        backgroundImage: "url(/sougen.jpg)",
      }}
      onDrop={(e) => setPos({ x: e.clientX, y: e.clientY })}
      onDragOver={(e) => e.preventDefault()} // enable onDrop event
    >
      <div
        style={{ position: "absolute", top: pos.y + "px", left: pos.x + "px" }}
        draggable={true}
      >
        <Image src="/bird.png" alt="bird" width={128} height={128} />
      </div>
    </div>
  );
};

export default Canvas;

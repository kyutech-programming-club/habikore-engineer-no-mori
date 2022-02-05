import { useState } from "react";

const Canvas: React.VFC = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div
      style={{ width: "1000px", height: "1000px", position: "relative" }}
      onDrop={(e) => setPos({ x: e.clientX, y: e.clientY })}
      onDragOver={(e) => e.preventDefault()} // enable onDrop event
    >
      <div
        style={{ position: "absolute", top: pos.y + "px", left: pos.x + "px" }}
        draggable={true}
      >
        Wash your hands clean!
      </div>
    </div>
  );
};

export default Canvas;

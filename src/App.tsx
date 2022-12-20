import React, { useState } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";

interface PointInterface {
  id: string;
  posX: number;
  posY: number;
}

function App() {
  const [points, setPoints] = useState<PointInterface[]>([]);

  const handleAddPoint = (event: React.MouseEvent<HTMLDivElement>) => {
    const newPoints: PointInterface[] = [
      ...points,
      {
        id: uuid(),
        posX: event.clientX,
        posY: event.clientY,
      },
    ];
    newPoints && setPoints(newPoints);
  };
  console.log(points);

  return (
    <div className="app" onClick={handleAddPoint}>
      <div className="buttons">
        <button className="button">UNDO</button>
        <button className="button">REDO</button>
      </div>
      {points.map((point) => {
        return (
          <span
            className="point"
            key={point.id}
            style={{ left: point.posX - 10, top: point.posY - 10 }}
          />
        );
      })}
    </div>
  );
}

export default App;

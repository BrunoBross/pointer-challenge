import React, { useState } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";

interface PointInterface {
  id: string;
  posX: number;
  posY: number;
  color: string;
}

function App() {
  const [points, setPoints] = useState<PointInterface[]>([]);
  const [ghostPoints, setGhostPoints] = useState<PointInterface[]>([]);

  const handleAddPoint = (event: React.MouseEvent<HTMLDivElement>) => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    const newPoints: PointInterface[] = [
      ...points,
      {
        id: uuid(),
        posX: event.clientX,
        posY: event.clientY,
        color: `#${randomColor}`,
      },
    ];

    newPoints && setPoints(newPoints);
  };

  const handleUndoPoint = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    const lastPointOnPoints = points.at(-1);
    let newGhostPoints: PointInterface[] = [];

    if (lastPointOnPoints) {
      newGhostPoints = [...ghostPoints, lastPointOnPoints];
      points.pop();
      setGhostPoints(newGhostPoints);
    }
  };

  const handleRedoPoint = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    const lastPoint = ghostPoints.pop();
    let newPoints: PointInterface[] = [];

    if (lastPoint) {
      newPoints = [...points, lastPoint];
      setPoints(newPoints);
    }
  };

  return (
    <div className="app" onClick={handleAddPoint}>
      <div className="buttons">
        <button className="button" onClick={handleUndoPoint}>
          UNDO
        </button>
        <button className="button" onClick={handleRedoPoint}>
          REDO
        </button>
      </div>
      {points.map((point) => {
        return (
          <span
            className="point"
            key={point.id}
            style={{
              left: point.posX - 10,
              top: point.posY - 10,
              backgroundColor: point.color,
            }}
          />
        );
      })}
    </div>
  );
}

export default App;

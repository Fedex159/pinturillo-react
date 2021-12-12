import React, { useRef, useState, useEffect } from "react";
import s from "./Whiteboard.module.css";

function Whiteboard() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [boundings, setBoundings] = useState(null);
  const [mouseCoordinates, setMouseCoordinates] = useState({
    mouseX: 0,
    mouseY: 0,
  });
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      setContext(ref.current.getContext("2d"));
      setBoundings(ref.current.getBoundingClientRect());
    }
  }, [ref]);

  useEffect(() => {
    if (context) {
      context.strokeStyle = "black";
      context.lineWidth = 1;
    }
  }, [context]);

  const handleCoordinate = (event) => {
    if (boundings) {
      setMouseCoordinates(() => {
        let mouseX = event.clientX - boundings.left;
        let mouseY = event.clientY - boundings.top;
        return { mouseX, mouseY };
      });
    }
  };

  const handleDown = (event) => {
    handleCoordinate(event);
    setIsDrawing(true);

    // Start Drawing
    context.beginPath();
    context.moveTo(mouseCoordinates.mouseX, mouseCoordinates.mouseY);
  };

  const handleMove = (event) => {
    handleCoordinate(event);

    if (isDrawing) {
      context.lineTo(mouseCoordinates.mouseX, mouseCoordinates.mouseY);
      context.stroke();
    }
  };

  const handleUp = (event) => {
    handleCoordinate(event);
    setIsDrawing(false);
  };

  return (
    <div className={s.container}>
      <canvas
        ref={ref}
        onMouseDown={handleDown}
        onMouseMove={handleMove}
        onMouseUp={handleUp}
        width="500"
        height="500"
      ></canvas>
    </div>
  );
}

export default Whiteboard;

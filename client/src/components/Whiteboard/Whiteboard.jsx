import React, { useRef, useState, useEffect } from "react";
import Palette from "./Palette/Palette";
import s from "./Whiteboard.module.css";

function scaleCanvas(coordinates, userWidth, userHeight, ref) {
  let newCoordinates = {};

  const xPorcentage = (ref.current.width * 100) / userWidth;
  const yPorcentage = (ref.current.height * 100) / userHeight;

  newCoordinates.mouseX =
    xPorcentage < 100
      ? Math.ceil((coordinates.mouseX * xPorcentage) / 100)
      : coordinates.mouseX;

  newCoordinates.mouseY =
    yPorcentage < 100
      ? Math.ceil((coordinates.mouseY * yPorcentage) / 100)
      : coordinates.mouseY;

  return newCoordinates;
}

function Whiteboard({ socket }) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [boundings, setBoundings] = useState(null);
  const [mouseCoordinates, setMouseCoordinates] = useState({
    mouseX: 0,
    mouseY: 0,
  });
  const ref = useRef(null);
  const [userDrawing, setUserDrawing] = useState(false);

  useEffect(() => {
    socket.on("startDrawing", (coordinates, width, height) => {
      if (context && !userDrawing) {
        // console.log("entro startDrawing");
        const { mouseX, mouseY } = scaleCanvas(coordinates, width, height, ref);
        context.beginPath();
        context.moveTo(mouseX, mouseY);
        setUserDrawing(true);
      }
    });

    socket.on("drawing", (coordinates, width, height) => {
      // console.log("entro drawing");
      if (context && userDrawing) {
        const { mouseX, mouseY } = scaleCanvas(coordinates, width, height, ref);
        context.lineTo(mouseX, mouseY);
        context.stroke();
      }
    });

    socket.on("notDrawing", () => {
      setUserDrawing(false);
    });
  }, [context, userDrawing, socket]);

  useEffect(() => {
    if (ref.current) {
      const bound = ref.current.getBoundingClientRect();

      setContext(ref.current.getContext("2d"));
      setBoundings(bound);

      ref.current.width = ref.current.offsetWidth;
      ref.current.height = ref.current.offsetHeight;
    }
  }, [ref]);

  // useEffect(() => {
  //   if (context) {
  //     // context.strokeStyle = "#21751f";
  //     context.lineWidth = 10;
  //   }
  // }, [context]);

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
    socket.emit(
      "startDrawing",
      mouseCoordinates,
      ref.current.width,
      ref.current.height
    );
    context.beginPath();
    context.moveTo(mouseCoordinates.mouseX, mouseCoordinates.mouseY);
  };

  const handleMove = (event) => {
    handleCoordinate(event);

    if (isDrawing) {
      socket.emit(
        "drawing",
        mouseCoordinates,
        ref.current.width,
        ref.current.height
      );
      context.lineTo(mouseCoordinates.mouseX, mouseCoordinates.mouseY);
      context.stroke();
    }
  };

  const handleUp = (event) => {
    socket.emit("notDrawing");
    handleCoordinate(event);
    setIsDrawing(false);
  };

  // const handleClick = (event) => {
  //   handleCoordinate(event);

  //   context.beginPath();
  //   context.moveTo(mouseCoordinates.mouseX, mouseCoordinates.mouseY);
  //   context.lineTo(mouseCoordinates.mouseX + 1, mouseCoordinates.mouseY + 1);
  //   context.stroke();
  // };

  const clearPage = () => {
    if (ref.current) {
      context.clearRect(0, 0, ref.current.width, ref.current.height);
    }
  };

  const changeColor = (color) => {
    if (context) {
      context.strokeStyle = color;
    }
  };

  const changeBrush = (size) => {
    if (context) {
      context.lineWidth = size;
    }
  };

  return (
    <div className={s.container}>
      <Palette
        clearPage={clearPage}
        changeColor={changeColor}
        changeBrush={changeBrush}
      />
      <canvas
        ref={ref}
        onMouseDown={handleDown}
        onMouseMove={handleMove}
        onMouseUp={handleUp}
        // onClick={handleClick}
      ></canvas>
    </div>
  );
}

export default Whiteboard;

import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header/Header";
import Palette from "./Palette/Palette";
import s from "./Whiteboard.module.css";

let mouseCoordinates = { mouseX: 0, mouseY: 0 };
let userDrawing = false;
let userStartCoords = { mouseX: 0, mouseY: 0 };

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

function Whiteboard({ socket, id }) {
  const navigate = useNavigate();
  const turn = useSelector((state) => state.turn);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [boundings, setBoundings] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    if (socket) {
      socket.on("startDrawing", (coordinates, width, height) => {
        if (context && !userDrawing) {
          // console.log("entro startDrawing");
          userStartCoords = scaleCanvas(coordinates, width, height, ref);
          userDrawing = true;
        }
      });

      socket.on("drawing", (coordinates, width, height) => {
        // console.log("entro drawing");
        if (context && userDrawing) {
          const { mouseX, mouseY } = scaleCanvas(
            coordinates,
            width,
            height,
            ref
          );
          context.beginPath();
          context.moveTo(userStartCoords.mouseX, userStartCoords.mouseY);
          context.lineTo(mouseX, mouseY);
          context.closePath();
          context.stroke();
          userStartCoords = { mouseX, mouseY };
        }
      });

      socket.on("notDrawing", () => {
        userDrawing = false;
      });

      socket.on("draw dot", (coordinates, width, height) => {
        if (context) {
          const { mouseX, mouseY } = scaleCanvas(
            coordinates,
            width,
            height,
            ref
          );
          context.beginPath();
          context.moveTo(mouseX, mouseY);
          context.lineTo(mouseX, mouseY);
          context.stroke();
        }
      });

      socket.on("clear page", () => {
        if (context) {
          context.clearRect(0, 0, ref.current.width, ref.current.height);
        }
      });

      socket.on("brush color", (color) => {
        if (context) {
          context.strokeStyle = color;
        }
      });

      socket.on("brush size", (size) => {
        if (context) {
          context.lineWidth = size;
        }
      });
    }
  }, [context, socket]);

  useEffect(() => {
    if (ref.current) {
      const bound = ref.current.getBoundingClientRect();
      const ctx = ref.current.getContext("2d");

      setContext(ctx);
      setBoundings(bound);

      ref.current.width = ref.current.offsetWidth;
      ref.current.height = ref.current.offsetParent.offsetHeight - 100;

      // Initial brush
      ctx.lineWidth = 10;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      const resizeCanvas = () => {
        if (ref.current) {
          const bound = ref.current.getBoundingClientRect();
          ref.current.width = ref.current.offsetWidth;
          ref.current.height = ref.current.offsetParent.offsetHeight - 100;
          ctx.lineWidth = 10;
          ctx.lineJoin = "round";
          ctx.lineCap = "round";
          setBoundings(bound);
        }
      };
      window.addEventListener("resize", resizeCanvas);
    }
  }, [ref]);

  const handleCoordinate = (event) => {
    if (boundings) {
      let mouseX = event.clientX - boundings.left;
      let mouseY = event.clientY - boundings.top;
      mouseCoordinates = { mouseX, mouseY };
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
      ref.current.height,
      id
    );
  };

  const handleMove = (event) => {
    const currentX = mouseCoordinates.mouseX;
    const currentY = mouseCoordinates.mouseY;

    handleCoordinate(event);

    if (isDrawing) {
      socket.emit(
        "drawing",
        mouseCoordinates,
        ref.current.width,
        ref.current.height,
        id
      );

      context.beginPath();
      context.moveTo(currentX, currentY);
      context.lineTo(mouseCoordinates.mouseX, mouseCoordinates.mouseY);
      context.closePath();
      context.stroke();
    }
  };

  const handleUp = (event) => {
    socket.emit("notDrawing", id);
    handleCoordinate(event);
    setIsDrawing(false);
  };

  const handleClick = (event) => {
    handleCoordinate(event);

    socket.emit(
      "draw dot",
      mouseCoordinates,
      ref.current.width,
      ref.current.height,
      id
    );
    context.beginPath();
    context.moveTo(mouseCoordinates.mouseX, mouseCoordinates.mouseY);
    context.lineTo(mouseCoordinates.mouseX, mouseCoordinates.mouseY);
    context.stroke();
  };

  const clearPage = () => {
    if (ref.current) {
      context.clearRect(0, 0, ref.current.width, ref.current.height);
      socket.emit("clear page", id);
    }
  };

  const changeColor = (color) => {
    if (context) {
      context.strokeStyle = color;
      socket.emit("brush color", color, id);
    }
  };

  const changeBrush = (size) => {
    if (context) {
      context.lineWidth = size;
      socket.emit("brush size", size, id);
    }
  };

  const closeRoom = () => {
    socket.disconnect();
    navigate({ pathname: "/" }, { replace: true });
  };

  return (
    <div className={s.container}>
      <Header
        socket={socket}
        room={id}
        round={1}
        word={"test"}
        onClick={closeRoom}
      />
      {socket && socket.id === turn ? (
        <Palette
          clearPage={clearPage}
          changeColor={changeColor}
          changeBrush={changeBrush}
        />
      ) : null}
      <canvas
        ref={ref}
        onMouseDown={socket && socket.id === turn ? handleDown : null}
        onMouseMove={socket && socket.id === turn ? handleMove : null}
        onMouseUp={socket && socket.id === turn ? handleUp : null}
        onClick={socket && socket.id === turn ? handleClick : null}
      ></canvas>
    </div>
  );
}

export default Whiteboard;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getWords } from "../../../utils";
import s from "./Header.module.css";

function Words({ socket, room, setWord, handleStart }) {
  const [words, setWords] = useState([]);

  const handleClick = (event) => {
    socket.emit("word", event.target.id, room);
    setWord(event.target.id);
    handleStart();
  };

  useEffect(() => {
    getWords()
      .then((data) => setWords(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={s.words}>
      {words.map((w, i) => (
        <div key={`${w}_${i}`} className={s.word} onClick={handleClick}>
          <h3 id={w}>{w}</h3>
        </div>
      ))}
    </div>
  );
}

function Header({ socket, room, round, onClick }) {
  const turn = useSelector((state) => state.turn);
  const [counter, setCounter] = useState(99);
  const [startCounter, setStartCounter] = useState(false);
  const [word, setWord] = useState("");
  const flag = socket && socket.id === turn;

  const handleStart = () => {
    if (flag) {
      setStartCounter(true);
      setCounter(99);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("counter", (userCount) => {
        setCounter(userCount);
      });

      socket.on("word", (userWord) => {
        setWord(userWord);
      });
    }
  }, [socket]);

  // useEffect(() => {
  //   if (socket && socket.id === turn) {
  //     setStartCounter(true);
  //     setCounter(99);
  //   }
  // }, [socket, turn]);

  useEffect(() => {
    if (socket) {
      let intervalo = null;

      if (startCounter && counter > 0) {
        intervalo = setInterval(() => {
          socket.emit("counter", counter - 1, room);
          setCounter((prev) => prev - 1);
        }, 1000);
      }

      if (counter === 0) {
        // socket.emit("turn end", room);
        clearInterval(intervalo);
      }

      return () => clearInterval(intervalo);
    }
  }, [socket, startCounter, counter, room]);

  return (
    <div className={s.container}>
      <div className={s.counter}>
        <span>{counter}</span>
      </div>
      <div className={s.data}>
        <div className={s.info}>
          <h4>Room ID: {room}</h4>
          <h4>Round: {round}</h4>
        </div>
        {word ? (
          <h3 className={`${s.dataWord} ${!flag && s.dataWordSpace}`}>
            {flag ? word : word[0] + "_".repeat(word.length - 1)}
          </h3>
        ) : null}
        {!word && flag ? (
          <Words
            socket={socket}
            room={room}
            setWord={setWord}
            handleStart={handleStart}
          />
        ) : null}
      </div>
      <button onClick={onClick}>x</button>
    </div>
  );
}

export default Header;

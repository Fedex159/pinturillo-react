import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import s from "./Chat.module.css";

function Chat({ socket, id }) {
  const name = useSelector((state) => state.name);
  const refList = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (refList.current) {
      refList.current.scrollTo(0, refList.current.scrollHeight);
    }
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on("message incoming", (name, text, userId) => {
        setMessages((prev) => [...prev, { name, text, userId }]);
      });
    }
  }, [socket]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.target.message.value;
    if (value) {
      socket.emit("message send", name, value, id, socket.id);
      setMessages((prev) => [
        ...prev,
        { name: name, text: value, userId: socket.id },
      ]);
      event.target.reset();
    }
  };

  return (
    <div className={s.container}>
      <h4>Chat</h4>
      <ul ref={refList}>
        {messages.map((m, i) => (
          <li key={`${m.userId}_${i}`}>
            <p>
              <span
                className={socket.id === m.userId ? s.myMessage : s.userMessage}
              >
                {m.name}:{" "}
              </span>
              {m.text}
            </p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input name="message" placeholder="Write..." />
      </form>
    </div>
  );
}

export default Chat;

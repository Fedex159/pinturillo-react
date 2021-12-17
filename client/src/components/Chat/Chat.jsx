import React, { useState, useEffect } from "react";
import s from "./Chat.module.css";

function Chat({ socket, id }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on("message incoming", (userId, text) => {
        setMessages((prev) => [...prev, { userId, text }]);
      });
    }
  }, [socket]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.target.message.value;
    if (value) {
      socket.emit("message send", socket.id, value, id);
      setMessages((prev) => [...prev, { userId: socket.id, text: value }]);
      event.target.reset();
    }
  };

  return (
    <div className={s.container}>
      Chat
      <ul>
        {messages.map((m, i) => (
          <li key={`${m.userId}_${i}`}>
            <p>
              <span
                className={socket.id === m.userId ? s.myMessage : s.userMessage}
              >
                {m.userId}:{" "}
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

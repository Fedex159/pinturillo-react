import React, { useState, useEffect } from "react";
import s from "./Chat.module.css";

function Chat({ socket }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message incoming", (id, text) => {
      setMessages((prev) => [...prev, { id, text }]);
    });
  }, [socket]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.target.message.value;
    if (value) {
      socket.emit("message send", socket.id, value);
      setMessages((prev) => [...prev, { id: socket.id, text: value }]);
      event.target.reset();
    }
  };

  return (
    <div className={s.container}>
      Chat
      <ul>
        {messages.map((m) => (
          <li>
            <p>
              <span
                className={socket.id === m.id ? s.myMessage : s.userMessage}
              >
                {m.id}:{" "}
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

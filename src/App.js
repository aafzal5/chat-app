import { useState } from "react";

import InputEmoji from "react-input-emoji";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";

import "./App.css";

function App() {
  const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  // const [time, setTime] = useState("");

  const handleInputChange = (message) => {
    setMessage(message);
  };

  //function to show the time when the message is sent.
  // const handleTime = () => {
  //   const now = new Date();
  //   const hours = now.getHours();
  //   const minutes = now.getMinutes();
  //   const formattedTime = hours + ":" + (minutes < 10 ? "0" : "") + minutes;
  //   setTime(formattedTime);
  // };

  const handleSendClick = () => {
    const randomUserIndex = Math.floor(Math.random() * user_list.length);
    const username = user_list[randomUserIndex];
    const newMessage = {
      username,
      text: message,
      likes: 0,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([newMessage, ...messages]);
    setMessage("");
    // handleTime();
  };

  const handleLikeClick = (index) => {
    const newMessages = [...messages];
    newMessages[index].likes += 1;
    setMessages(newMessages);
  };

  return (
    <div className="chat-app">
      <h2>React Chat App</h2>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div className="chat-message" key={index}>
            <div className="message-content">
              <div className="message-header">
              <span
                  className={`avatar-circle ${msg.username
                    .charAt(0)
                    .toLowerCase()}`}
                >
                  {msg.username.charAt(0).toUpperCase()}
                </span>
                <span className="username">{msg.username}</span>
                <span className="message-time">{msg.timestamp}</span>
              </div>
              <div className="main-message-box">
                <div className="message-text">{msg.text}</div>
                <span>
                  <button
                    className="like-button"
                    onClick={() => handleLikeClick(index)}
                  >
                    <FontAwesomeIcon icon={faThumbsUp} /> {msg.likes}
                  </button>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <InputEmoji
          value={message}
          onChange={handleInputChange}
          cleanOnEnter
          onEnter={handleSendClick}
          placeholder="Type a message . . ."
          fontFamily="Poppins"
          borderColor="#646464"
        />
      </div>
    </div>
  );
}

export default App;

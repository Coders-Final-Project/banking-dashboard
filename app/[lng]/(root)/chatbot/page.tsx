"use client";

import { useState } from "react";

import "@/sass/pages/_chatbot.scss";
import "@/sass/layout/_pageHeader.scss";

import axios from "axios";

import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";

const Chatbot = ({ params: { lng } }: { params: { lng: string } }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/chatbot", {
        inputValue: question,
      });

      setAnswer(response.data.answer[0].message.content);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="chatbot">
      <header className="page__header">
        <div className="page__header__welcome">
          <div className="page__header__welcome__title">Chatbot</div>
        </div>
        <AvatarDetail lng={lng} />
      </header>
      <div className="chatbot__content">
        <div className="chatbot__content__form">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button onClick={handleSubmit}>Send</button>
        </div>
        <div className="chatbot__content__answer">{answer}</div>
      </div>
    </main>
  );
};

export default Chatbot;

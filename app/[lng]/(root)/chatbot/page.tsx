"use client";

import { useState, useRef } from "react";

import Image from "next/image";

import "@/sass/pages/_chatbot.scss";
import "@/sass/layout/_pageHeader.scss";

import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import AvatarDetail from "@/shared/AvatarDetail/AvatarDetail";

import { useGlobalContext } from "@/context/store";
import { setChatBotMessages } from "@/globalRedux/features/appSlice";
import { StateProps } from "@/interface";

import { definedQuestions } from "@/constants";

const Chatbot = ({ params: { lng } }: { params: { lng: string } }) => {
  const [question, setQuestion] = useState("");

  const messages = useSelector((state: StateProps) => state.chatbotMessages);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const { data } = useGlobalContext();
  const url = data.profileImg?.[0]?.fileUrl?.secure_url;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(setChatBotMessages({ key: "client", value: question }));

    setQuestion("");

    try {
      const response = await axios.post("/api/chatbot", {
        inputValue: question,
      });

      const chatbotResponse = response.data.answer[0].message.content;

      dispatch(setChatBotMessages({ key: "chatbot", value: chatbotResponse }));

      chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
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
        <div className="chatbot__content__blank" ref={chatContainerRef}>
          {messages.length === 0 && (
            <div className="chatbot__content__blank__preview">
              <div className="chatbot__content__blank__preview__title">
                Ask what you want...
              </div>
              <div className="chatbot__content__blank__preview__content">
                {definedQuestions.map((question, index) => (
                  <div
                    key={index}
                    className="chatbot__content__blank__preview__content__item"
                    onClick={() => setQuestion(question)}
                  >
                    {question}
                  </div>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, index) => {
            if (message.key === "client") {
              return (
                <div
                  key={index}
                  className="chatbot__content__blank__item client"
                >
                  <div className="chatbot__content__blank__item__text">
                    {message.value}
                  </div>
                  <Image
                    src={`${url ? url : "/assets/user/user.png"}`}
                    alt={data.firstName}
                    width={35}
                    height={35}
                    className="chatbot__content__blank__item__img"
                  />
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className="chatbot__content__blank__item chatbot"
                >
                  <Image
                    src="/assets/chatbot/chatbot.png"
                    alt="chatbot"
                    width={35}
                    height={35}
                    className="chatbot__content__blank__item__img"
                  />
                  <div className="chatbot__content__blank__item__text">
                    {message.value}
                  </div>
                </div>
              );
            }
          })}
        </div>
        <form className="chatbot__content__form">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="chatbot__content__form__input"
          />
          <button
            onClick={(e) => handleSubmit(e)}
            type="submit"
            className="chatbot__content__form__btn"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
};

export default Chatbot;

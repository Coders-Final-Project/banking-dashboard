"use client";

import Image from "next/image";

import { useEffect } from "react";

import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { setNotifications } from "@/globalRedux/features/appSlice";

import { useGlobalContext } from "@/context/store";

import "@/sass/components/_notifications.scss";

import { StateProps } from "@/interface";

const Notifications = () => {
  const { data } = useGlobalContext();

  const dispatch = useDispatch();

  const notifications = useSelector((state: StateProps) => state.notifications);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.post("/api/notifications", {
          userID: data._id,
        });

        dispatch(setNotifications(response.data.notification));
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotifications();
  }, [data._id, dispatch]);

  return (
    <div className="notifications">
      <div className="notifications__header">
        <div className="notifications__header__all">notifications (5)</div>
        <div className="notifications__header__new">new (1)</div>
      </div>
      <div className="notifications__body">
        {notifications.map((item) => (
          <div key={item._id} className="notifications__body__item">
            <Image
              src="/assets/home/people.png"
              alt="notify"
              width={24}
              height={24}
              className="notifications__body__item__img"
            />
            <div className="notifications__body__item__content">
              <div className="notifications__body__item__content__title">
                {item.content}
              </div>
              <div className="notifications__body__item__content__time"></div>
            </div>
            <button className="notifications__body__item__btn">X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;

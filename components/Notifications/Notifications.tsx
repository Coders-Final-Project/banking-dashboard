"use client";

import Image from "next/image";

import { useEffect } from "react";

import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { setNotifications } from "@/globalRedux/features/appSlice";

import { useGlobalContext } from "@/context/store";

import "@/sass/components/_notifications.scss";

import { StateProps } from "@/interface";

import { getFormattedDate, defineNotificationImage } from "@/helpers";

const Notifications = () => {
  const { data } = useGlobalContext();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.post("/api/notifications", {
          userID: data._id,
        });

        dispatch(setNotifications(response.data.notifications));
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotifications();
  }, [data._id, dispatch]);

  const notifications = useSelector((state: StateProps) => state.notifications);

  const handleNotificationDelete = async (id: string) => {
    try {
      const response = await axios.post("/api/notifications/delete", {
        userID: data._id,
        notificationId: id,
      });

      dispatch(setNotifications(response.data.notifications));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="notifications">
      <div className="notifications__header">
        <div className="notifications__header__all">
          notifications ({notifications?.length})
        </div>
        <div className="notifications__header__new">new (1)</div>
      </div>
      <div className="notifications__body">
        {notifications?.map((item) => {
          const { formattedDate } = getFormattedDate(item.createdAt);

          const imgName = defineNotificationImage(item.key);

          return (
            <div key={item._id} className="notifications__body__item">
              <Image
                src={`/assets/notifications/${imgName}`}
                alt="notify"
                width={30}
                height={30}
                className="notifications__body__item__img"
              />
              <div className="notifications__body__item__content">
                <div className="notifications__body__item__content__title">
                  {item.content}
                </div>
                <div className="notifications__body__item__content__time">
                  {formattedDate}
                </div>
              </div>
              <button
                className="notifications__body__item__btn"
                onClick={(e) => {
                  handleNotificationDelete(item._id);
                  e.stopPropagation();
                }}
              >
                <Image
                  src="/assets/notifications/delete.png"
                  alt="delete"
                  width={15}
                  height={15}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;

"use client";

import Image from "next/image";

import { useEffect, useState } from "react";

import axios from "axios";

import { useDispatch } from "react-redux";

import { useGlobalContext } from "@/context/store";

import "@/sass/components/_notifications.scss";

import { INotifications } from "@/interface";

import { getFormattedDate, defineNotificationImage } from "@/helpers";

import useSWR, { useSWRConfig } from "swr";

const Notifications = () => {
  const [errorAlert, setErrorAlert] = useState("");

  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (errorAlert !== "") {
      setTimeout(() => {
        setErrorAlert("");
      }, 2000);
    }
  }, [errorAlert]);

  const { data } = useGlobalContext();

  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response;
    } catch (error: any) {
      setErrorAlert(error?.message);
    }
  };

  const { data: notifications, isLoading } = useSWR(
    `/api/notifications/fetch/${data._id}`,
    fetcher,
  );

  const handleNotificationDelete = async (id: string) => {
    try {
      await axios.delete(`/api/notifications/delete/${data._id}/${id}`);

      mutate(`/api/notifications/fetch/${data._id}`);
    } catch (error: any) {
      setErrorAlert(error.response.data.message);
    }
  };

  return (
    <div className="notifications">
      <div className="notifications__header">
        <div className="notifications__header__all">
          notifications ({notifications?.data?.notifications.length})
        </div>
        <div className="notifications__header__new">new (1)</div>
      </div>
      <div className="notifications__body">
        {isLoading && (
          <div className="notifications__body__empty">Loading...</div>
        )}

        {notifications?.data?.notifications.length === 0 && (
          <div className="notifications__body__empty">Empty!</div>
        )}

        {notifications?.data?.notifications.map((item: INotifications) => {
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
              <div
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
              </div>
            </div>
          );
        })}
      </div>
      {errorAlert !== "" && (
        <div className="notification__alert--error">{errorAlert}</div>
      )}
    </div>
  );
};

export default Notifications;

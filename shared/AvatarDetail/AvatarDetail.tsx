"use client";

import Image from "next/image";

import { useState, useEffect, useRef } from "react";

import { useGlobalContext } from "@/context/store";

import { definedContracts } from "@/constants";

import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import { usePathname } from "next/navigation";

import "@/sass/layout/_avatarDetail.scss";

import Button from "@/components/Button/Button";
import { StateProps } from "@/interface";
import {
  setUserCardInfo,
  setInsuranceCompleted,
  decreaseNotificationsToZero,
} from "@/globalRedux/features/appSlice";

import Notifications from "@/components/Notifications/Notifications";

interface Props {
  hasBtn?: boolean;
  lng?: string;
}

const AvatarDetail = ({ hasBtn, lng }: Props) => {
  const [serverError, setServerError] = useState("");
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);

  useEffect(() => {
    if (serverError !== "") {
      setTimeout(() => {
        setServerError("");
      }, 1500);
    }
  }, [serverError]);

  const userCard = useSelector((state: StateProps) => state.userCard);

  const contractsLength = useSelector(
    (state: StateProps) => state.contractsLength,
  );

  const notificationCount = useSelector(
    (state: StateProps) => state.notificationCount,
  );

  const { data } = useGlobalContext();

  const dispatch = useDispatch();

  const currentPage = usePathname();

  const url = data?.profileImg?.[0]?.fileUrl?.secure_url;

  const effectRef = useRef(false);

  useEffect(() => {
    if (effectRef.current === false) {
      const fetchCardInfo = async () => {
        try {
          if (data._id) {
            const response = await axios.get(`/api/card/fetch/${data._id}`);

            if (response.data.card !== undefined) {
              dispatch(setUserCardInfo(response.data.card));
            }
          }
        } catch (error: any) {
          // setTimeout(() => {
          //   setServerError(error.response.data.message);
          // }, 1000);
        }
      };

      if (
        currentPage.includes("contracts") ||
        currentPage === "/en" ||
        currentPage === "/az"
      ) {
        fetchCardInfo();
      }
      dispatch(setInsuranceCompleted(data.insuranceCompleted));
    }

    return () => {
      effectRef.current = true;
    };
  }, [currentPage, data, dispatch]);

  const isContractAvailable = definedContracts.length > contractsLength;

  const handleNotifyOpen = () => {
    if (isNotifyOpen) {
      setIsNotifyOpen(false);
    } else {
      setIsNotifyOpen(true);
      dispatch(decreaseNotificationsToZero());
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("/api/user/logout");

      localStorage.removeItem("persist:root");
      localStorage.removeItem("persist:primary");

      window.location.href = "/signin";
    } catch (error: any) {
      setServerError(error.message);
    }
  };

  const notificationImg = isNotifyOpen ? "alert.png" : "bell.png";

  return (
    <div className="avatar__detail">
      {hasBtn && userCard._id !== -1 && isContractAvailable && (
        <Button
          text="Create A Contract"
          icon="frame.png"
          url="create"
          lng={lng}
        />
      )}
      <button className="notify__btn" onClick={handleNotifyOpen}>
        <Image
          src={`/assets/notifications/${notificationImg}`}
          alt="notification"
          width={24}
          height={24}
          className="notify__btn__img"
          onClick={handleNotifyOpen}
        />
        {isNotifyOpen && (
          <div className="notify__btn__content">
            <Notifications />
          </div>
        )}
        {notificationCount > 0 && (
          <div className="notify__btn__count">{notificationCount}</div>
        )}
      </button>
      <div className="avatar__detail__person">
        <Image
          src={`${url ? url : "/assets/user/user.png"}`}
          alt={data.firstName}
          width={40}
          height={40}
          className="avatar__detail__person__img"
        />
        <div className="avatar__detail__person__info">
          <div className="avatar__detail__person__info__name">
            {data.firstName}
          </div>
          <div className="avatar__detail__person__info__position">
            {data.job}
          </div>
        </div>
        <div className="avatar__detail__person__dropdown">
          <button
            onClick={handleLogout}
            className="avatar__detail__person__dropdown__logoutBtn"
          >
            Logout
          </button>
        </div>
      </div>
      {serverError !== "" && (
        <div className="pop-up pop-up__error">
          <h2 className="pop-up__text__error">{serverError}</h2>
        </div>
      )}
    </div>
  );
};

export default AvatarDetail;

"use client";

import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useGlobalContext } from "@/context/store";

import axios from "axios";

import "@/sass/layout/_avatarDetail.scss";

import Button from "@/components/Button/Button";

interface Props {
  hasBtn?: boolean;
}

const AvatarDetail = ({ hasBtn }: Props) => {
  const [serverError, setServerError] = useState("");

  const { data } = useGlobalContext();

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get("/api/user/logout");
      router.push("/signin");
    } catch (error: any) {
      setServerError(error.message);
    }
  };

  return (
    <div className="avatar__detail">
      {hasBtn && (
        <Button
          text="create a contract"
          icon="frame.png"
          url="/contracts/create"
        />
      )}
      <Image
        src="/assets/home/notification.png"
        alt="notification"
        width={24}
        height={24}
        className="avatar__detail__notify"
      />
      <div className="avatar__detail__person">
        <Image
          src={`/assets/home/person-chris.png`}
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
          <Link
            href="/settings"
            className="avatar__detail__person__dropdown__profile"
          >
            Profile
          </Link>
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

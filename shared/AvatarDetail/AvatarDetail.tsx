"use client";

import Image from "next/image";
import Link from "next/link";

import { useState, useEffect, useRef } from "react";

import { useGlobalContext } from "@/context/store";

import { definedContracts } from "@/constants";

import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import { usePathname, useRouter } from "next/navigation";

import "@/sass/layout/_avatarDetail.scss";

import Button from "@/components/Button/Button";
import { StateProps } from "@/interface";
import {
  setUserCardInfo,
  setInsuranceCompleted,
  setTransactions,
  setContractual,
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

  const companyContracts = useSelector(
    (state: StateProps) => state.companyContracts,
  );

  const notificationCount = useSelector(
    (state: StateProps) => state.notificationCount,
  );

  const { data } = useGlobalContext();

  const dispatch = useDispatch();

  const currentPage = usePathname();
  const router = useRouter();

  const url = data.profileImg?.[0]?.fileUrl?.secure_url;

  const effectRef = useRef(false);

  useEffect(() => {
    if (effectRef.current === false) {
      const fetchCardInfo = async () => {
        try {
          if (
            data._id &&
            (currentPage === `/az` ||
              currentPage === `/en` ||
              currentPage.includes("cards"))
          ) {
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

      const fetchTransactions = async () => {
        try {
          if (
            data._id &&
            (currentPage === `/az` ||
              currentPage === `/en` ||
              currentPage.includes("transactions"))
          ) {
            const response = await axios.get(`/api/transactions/${data._id}`);

            dispatch(setTransactions(response.data.transactions));
          }
        } catch (error: any) {
          setServerError(error.response.data.message);
        }
      };

      const fetchContractuals = async () => {
        try {
          if (data._id && currentPage.includes("cards")) {
            const response = await axios.get(`/api/contractuals/${data._id}`);
            dispatch(setContractual(response.data.contractuals));
          }
        } catch (error: any) {
          setServerError(error.response.data.message);
        }
      };

      fetchTransactions();
      fetchCardInfo();
      fetchContractuals();

      dispatch(setInsuranceCompleted(data.insuranceCompleted));
    }

    return () => {
      effectRef.current = true;
    };
  }, [currentPage, data, dispatch]);

  const activeContracts = companyContracts.map(
    (contract: any) => contract.company,
  );

  const isContractAvailable =
    definedContracts.length !== activeContracts.length;

  const handleNotifyOpen = () => {
    if (isNotifyOpen) {
      setIsNotifyOpen(false);
    } else {
      setIsNotifyOpen(true);
      dispatch(decreaseNotificationsToZero());
    }
  };

  useEffect(() => {
    setTimeout(() => {
      router.replace("/");
    }, 1000);
  }, [router]);

  const handleLogout = async () => {
    try {
      await axios.get("/api/user/logout");
      const itemsToRemove = ["persist:root", "persist:primary"];

      itemsToRemove.forEach((key) => {
        localStorage.removeItem(key);
      });
      router.replace("/signin");
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
          <Link
            href="/settings"
            className="avatar__detail__person__dropdown__profile"
          >
            Profile
          </Link>
          <Link
            href="/contact"
            className="avatar__detail__person__dropdown__profile"
          >
            Contact
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

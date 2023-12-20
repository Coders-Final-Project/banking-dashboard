"use client";

import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import "@/sass/components/_sidemenu.scss";

import Image from "next/image";

import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import { increaseNotificationCount } from "@/globalRedux/features/appSlice";

import { useGlobalContext } from "@/context/store";

import { StateProps } from "@/interface";

import { useTranslation } from "@/i18n/client";

interface IProps {
  setOpenSideMenu: Dispatch<SetStateAction<boolean>>;
}

interface IInputvalues {
  email: string;
  pname: string;
  date: string;
  dueon: string;
}

const Sidemenu = ({ setOpenSideMenu }: IProps) => {
  const [inputValues, setInputValues] = useState<IInputvalues>({
    email: "",
    pname: "",
    date: "",
    dueon: "",
  });

  const [inputs, setInputs] = useState([
    { item: "", rate: "", hours: "", total: "" },
  ]);

  const [successAlert, setSuccessAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");

  useEffect(() => {
    if (successAlert || errorAlert) {
      setTimeout(() => {
        setSuccessAlert("");
        setErrorAlert("");
      }, 2000);
    }
  }, [successAlert, errorAlert]);

  const curLang = useSelector((state: StateProps) => state.curLang);

  const dispatch = useDispatch();

  const { data } = useGlobalContext();

  const { t } = useTranslation(curLang);

  const handleAddInput = () => {
    setInputs([...inputs, { item: "", rate: "", hours: "", total: "" }]);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    let { name, value } = event.target;

    let onChangeValue = [...inputs];
    //@ts-ignore
    onChangeValue[index][name] = value;

    onChangeValue[index]["total"] = String(
      Number(inputs[index].hours) * Number(inputs[index].rate),
    );

    setInputs(onChangeValue);
  };

  // const handleDeleteInput = (index: number) => {
  //   const newArray = [...inputs];
  //   newArray.splice(index, 1);
  //   setInputs(newArray);
  // };

  const changeState = () => {
    setOpenSideMenu((prev: boolean) => !prev);
  };

  const getEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    let emailadd = inputValues;
    emailadd.email = e.target.value;

    setInputValues({ ...inputValues });
  };

  const getPname = (e: React.ChangeEvent<HTMLInputElement>) => {
    let pname = inputValues;
    pname.pname = e.target.value;

    setInputValues({ ...inputValues });
  };

  const getDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    let date = inputValues;
    date.date = e.target.value;

    setInputValues({ ...inputValues });
  };

  const getDueon = (e: React.ChangeEvent<HTMLInputElement>) => {
    let dueon = inputValues;
    dueon.dueon = e.target.value;

    setInputValues({ ...inputValues });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const receiverData = inputValues;
    const itemData = inputs;

    if (data._id) {
      try {
        const response = await axios.post("/api/invoice", {
          userID: data._id,
          receiverData: receiverData,
          itemData: itemData,
        });

        const status = response.data.status;
        const message = response.data.message;

        if (status === 400 || status === 500) {
          setErrorAlert(message);
        }
        if (status === 200) {
          setSuccessAlert(message);
          dispatch(increaseNotificationCount());
        }
      } catch (error) {
        setErrorAlert("Something went wrong!");
      }
    } else {
      setErrorAlert("Something went wrong!");
    }

    setInputValues({
      email: "",
      pname: "",
      date: "",
      dueon: "",
    });

    setInputs([{ item: "", rate: "", hours: "", total: "" }]);
  };

  return (
    <>
      <div className="bg-shadow"></div>
      <div className="sidemenu">
        <div className="sidemenu__header">
          <div>{t("invoice.sidemenu.text")}</div>
          <div onClick={changeState}>X</div>
        </div>
        <div className="sidemenu__code">
          <div className="sidemenu__code--codeid">#MF-235712</div>
          <div className="sidemenu__code--codecopy">
            <Image
              src="/assets/invoices/copy.png"
              alt="copy-icon"
              width={20}
              height={20}
            />
            <p>{t("invoice.sidemenu.text1")}</p>
          </div>
        </div>
        <form action="" onSubmit={onSubmit}>
          <div className="sidemenu__form">
            <div className="email">
              <div>{t("invoice.sidemenu.text2")}</div>
              <input
                type="email"
                id="email"
                placeholder={`${t("invoice.sidemenu.text3")}`}
                value={inputValues.email}
                onChange={(e) => getEmail(e)}
                required
                autoComplete="off"
              />
            </div>
            <div className="pname">
              <div>{t("invoice.sidemenu.text4")}</div>
              <input
                type="text"
                id="project"
                placeholder={`${t("invoice.sidemenu.text5")}`}
                value={inputValues.pname}
                onChange={(e) => getPname(e)}
                required
                autoComplete="off"
              />
            </div>
            <div className="sidemenu__form--date">
              <div>
                <div className="dateTitle">{t("invoice.sidemenu.text7")}</div>
                <input
                  type="date"
                  id="date"
                  value={inputValues.date}
                  onChange={(e) => getDate(e)}
                  required
                  autoComplete="off"
                />
              </div>
              <div>
                <div className="dateTitle">{t("invoice.sidemenu.text8")}</div>
                <input
                  type="date"
                  id="dueon"
                  value={inputValues.dueon}
                  onChange={(e) => getDueon(e)}
                  required
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <div className="sidemenu__addItem">
            <div className="sidemenu__addItem--header">
              <div>{t("invoice.sidemenu.text9")}</div>
              <div>{t("invoice.sidemenu.text10")}</div>
              <div>{t("invoice.sidemenu.text11")}</div>
              <div>{t("invoice.sidemenu.text12")}</div>
            </div>
            {inputs.map((item, index) => {
              return (
                <div key={index} className="sidemenu__addItem--items">
                  <div>
                    <input
                      name="item"
                      type="text"
                      value={item.item}
                      onChange={(event) => handleChange(event, index)}
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <input
                      name="hours"
                      type="number"
                      value={item.hours}
                      onChange={(event) => handleChange(event, index)}
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <input
                      name="rate"
                      type="number"
                      value={item.rate}
                      onChange={(event) => handleChange(event, index)}
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <input
                      name="total"
                      type="number"
                      value={item.total}
                      required
                      disabled
                      autoComplete="off"
                    />
                  </div>
                </div>
              );
            })}
            <div className="addItemButton">
              <button onClick={handleAddInput}>
                + {t("invoice.sidemenu.text13")}
              </button>
            </div>
          </div>
          <div className="sidemenu__sendInvoice">
            <button>{t("invoice.sidemenu.text14")}</button>
            <button>{t("invoice.sidemenu.text15")}</button>
          </div>
        </form>
        {successAlert !== "" && (
          <div className="invoice__alert--success">{successAlert}</div>
        )}
        {errorAlert !== "" && (
          <div className="invoice__alert--error">{errorAlert}</div>
        )}
      </div>
    </>
  );
};

export default Sidemenu;

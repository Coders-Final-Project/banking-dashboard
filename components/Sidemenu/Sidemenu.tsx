"use client";

import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import "@/sass/components/_sidemenu.scss";
import Image from "next/image";

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
    setInputs(onChangeValue);

    console.log(onChangeValue);
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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newObj = inputs.reduce((a, b) => Object.assign(a, b), {});

    console.log({ ...inputValues, ...newObj });

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
          <div>Create Invoices</div>
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
            <p> Copy Payment Code</p>
          </div>
        </div>

        <form action="" onSubmit={onSubmit}>
          <div className="sidemenu__form">
            <div className="email">
              <div>Recipient Email</div>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={inputValues.email}
                onChange={(e) => getEmail(e)}
                required
              />
            </div>

            <div className="pname">
              <div>Project Name</div>
              <input
                type="text"
                id="project"
                placeholder="Enter project name"
                value={inputValues.pname}
                onChange={(e) => getPname(e)}
                required
              />
            </div>

            <div className="sidemenu__form--date">
              <div>
                <div className="dateTitle">Issued on</div>
                <input
                  type="date"
                  id="date"
                  value={inputValues.date}
                  onChange={(e) => getDate(e)}
                  required
                />
              </div>
              <div>
                <div className="dateTitle">Due on</div>
                <input
                  type="text"
                  id="dueon"
                  value={inputValues.dueon}
                  onChange={(e) => getDueon(e)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="sidemenu__addItem">
            <div className="sidemenu__addItem--header">
              <div>Item</div>
              <div>Hours</div>
              <div>Rate/hr</div>
              <div>Total</div>
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
                    />
                  </div>
                  <div>
                    <input
                      name="hours"
                      type="number"
                      value={item.hours}
                      onChange={(event) => handleChange(event, index)}
                      required
                    />
                  </div>
                  <div>
                    <input
                      name="rate"
                      type="number"
                      value={item.rate}
                      onChange={(event) => handleChange(event, index)}
                      required
                    />
                  </div>
                  <div>
                    <input
                      name="total"
                      type="number"
                      value={item.total}
                      onChange={(event) => handleChange(event, index)}
                      required
                    />
                  </div>
                </div>
              );
            })}

            <div className="addItemButton">
              <button onClick={handleAddInput}>+ Add item</button>
            </div>
          </div>

          <div className="sidemenu__sendInvoice">
            <button>Save Draft</button>
            <button>Send Invoice</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Sidemenu;

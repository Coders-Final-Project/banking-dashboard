"use client";

import "@/sass/components/_addCardModal.scss";

interface IProps {
  handleCardModal: () => void;
}

const AddCardModal = ({ handleCardModal }: IProps) => {
  return (
    <div className="add__card__modal">
      <div className="cards__detail__addModal">
        <div className="cards__detail__addModal__item">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            placeholder="1234 5678 9012 1234"
          />
        </div>
        <div className="cards__detail__addModal__item">
          <label htmlFor="date">End Date</label>
          <input type="text" id="date" placeholder="10/23" />
        </div>
        <div className="cards__detail__addModal__item">
          <label htmlFor="security">Security Code</label>
          <input type="text" id="security" placeholder="000" />
        </div>
        <button className="cards__detail__addModal__btn">Send</button>
      </div>
      <button className="add__card__modal__closeBtn" onClick={handleCardModal}>
        x
      </button>
    </div>
  );
};

export default AddCardModal;

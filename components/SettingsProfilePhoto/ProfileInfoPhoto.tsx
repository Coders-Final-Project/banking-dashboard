import Image from "next/image";

import "@/sass/components/_profileInfoPhoto.scss";

const ProfileInfoPhoto = () => {
  return (
    <div className="profile__info__photo">
      <div className="profile__info__photo__title">Personal Details</div>
      <div className="profile__info__photo__content">
        <Image
          src="/assets/settings/user.png"
          alt="person"
          width={90}
          height={90}
          className="profile__info__photo__content__person"
        />
        <div className="profile__info__photo__content__btns">
          <button className="profile__info__photo__content__btns__upload">
            <Image
              src="/assets/settings/upload.png"
              alt="person"
              width={24}
              height={24}
              className="profile__info__photo__content__btns__upload__btn"
            />
            Upload New Photo
          </button>
          <button className="profile__info__photo__content__btns__remove">
            <Image
              src="/assets/settings/remove.png"
              alt="person"
              width={24}
              height={24}
              className="profile__info__photo__content__btns__remove__btn"
            />
            Remove Photo
          </button>
        </div>
      </div>
      <div className="profile__info__photo__provider">
        <div className="profile__info__photo__provider__text">
          Photos help your clients recognize you in Payrole
        </div>
        <button className="profile__info__photo__provider__btn">
          Learn More
        </button>
      </div>
      <div className="profile__info__photo__membership">
        <div className="profile__info__photo__membership__title">
          How can I upgrade my account membership?
        </div>
        <button className="profile__info__photo__membership__btn">
          See Pricing
          <Image
            src="/assets/settings/price.png"
            alt="person"
            width={24}
            height={24}
            className="profile__info__photo__content__btns__remove__btn"
          />
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoPhoto;

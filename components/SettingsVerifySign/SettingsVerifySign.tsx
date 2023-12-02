import Image from "next/image";

import "@/sass/components/_settingsVerifySign.scss";

const SettingsVerifySign = () => {
  return (
    <div className="verification__account">
      <div className="verification__account__title">Verification</div>
      <div className="verification__account__content">
        <div className="verification__account__content__sign">
          <Image
            src="/assets/settings/sign.png"
            alt="sign"
            width={28}
            height={28}
            className="verification__account__content__sign__icon"
          />
          <div className="verification__account__content__sign__text">
            Sign up
          </div>
          <button className="verification__account__content__sign__btn">
            <Image
              src="/assets/settings/connect.png"
              alt="connect"
              width={20}
              height={20}
              className="verification__account__content__sign__btn__icon"
            />
            Done
          </button>
        </div>
        <div className="verification__account__content__identity">
          <Image
            src="/assets/settings/sign.png"
            alt="sign"
            width={28}
            height={28}
            className="verification__account__content__identity__icon"
          />
          <div className="verification__account__content__identity__info">
            <div className="verification__account__content__identity__info__title">
              Your Identity
            </div>
            <div className="verification__account__content__identity__info__desc">
              Instantly verify your identity with Veriff by uploading your
              personal documents.
            </div>
          </div>
          <button className="verification__account__content__identity__btn">
            Verify Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsVerifySign;

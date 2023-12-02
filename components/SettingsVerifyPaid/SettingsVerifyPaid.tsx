import Image from "next/image";

import "@/sass/components/_settingsVerifyPaid.scss";

const SettingsVerifyPaid = () => {
  return (
    <div className="verification__paid">
      <div className="verification__paid__title">Getting Paid</div>
      <div className="verification__paid__content">
        <div className="verification__paid__content__item">
          <div className="verification__paid__content__item__text">
            Getting Paid
          </div>
          <div className="verification__paid__content__item__case enabled">
            <Image
              src="/assets/settings/enabled.png"
              alt="enabled"
              width={16}
              height={16}
            />
            Enabled
          </div>
        </div>
        <div className="verification__paid__content__item">
          <div className="verification__paid__content__item__text">
            Signing A Contract
          </div>
          <div className="verification__paid__content__item__case enabled">
            <Image
              src="/assets/settings/enabled.png"
              alt="enabled"
              width={16}
              height={16}
            />
            Enabled
          </div>
        </div>
        <div className="verification__paid__content__item">
          <div className="verification__paid__content__item__text">
            Withdrawing from Balance
          </div>
          <div className="verification__paid__content__item__case waiting">
            <Image
              src="/assets/settings/waiting.png"
              alt="enabled"
              width={16}
              height={16}
            />
            Request
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsVerifyPaid;

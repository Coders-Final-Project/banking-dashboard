import "@/sass/scenes/_verification.scss";

import SettingsVerifySign from "@/components/SettingsVerifySign/SettingsVerifySign";
import SettingsVerifyPaid from "@/components/SettingsVerifyPaid/SettingsVerifyPaid";

const Verification = () => {
  return (
    <div className="verification">
      <SettingsVerifySign />
      <SettingsVerifyPaid />
    </div>
  );
};

export default Verification;

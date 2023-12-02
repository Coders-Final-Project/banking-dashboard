import "@/sass/scenes/_profileInfo.scss";

import ProfileInfoPhoto from "@/components/SettingsProfilePhoto/ProfileInfoPhoto";
import ProfileDetails from "@/components/SettingsProfileDetails/ProfileDetails";

const ProfileInfo = () => {
  return (
    <div className="profile__info">
      <ProfileInfoPhoto />
      <div className="profile__info__divider" />
      <ProfileDetails />
    </div>
  );
};

export default ProfileInfo;

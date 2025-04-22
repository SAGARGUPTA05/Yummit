import {
  Loader2,
  LocateIcon,
  Mail,
  MapPin,
  MapPinnedIcon,
  Plus,
} from "lucide-react";
import React, { useRef, useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import { useThemeStore } from "../../store/useThemeStore";
import { motion } from "framer-motion";

function Profile() {
  const { theme } = useThemeStore();
  const { user, updateProfile } = useUserStore();
  const imageRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [selectedprofle, setSelectedProfile] = useState(
    user?.profilepicture || ""
  );

  const [profileData, setProfileData] = useState({
    fullname: user.fullname || "",
    email: user.email || "",
    address: user.address || "",
    city: user.city || "",
    country: user.country || "",
    profileImg: user?.profilepicture || "",
  });

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setSelectedProfile(result);
        setProfileData((prevData) => ({
          ...prevData,
          profileImg: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("fullname", profileData.fullname);
      formData.append("email", profileData.email);
      formData.append("address", profileData.address);
      formData.append("city", profileData.city);
      formData.append("country", profileData.country);

      if (imageRef.current?.files?.[0]) {
        formData.append("profileImg", imageRef.current.files[0]);
      }

      await updateProfile(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative"
        >
    <form
      onSubmit={updateProfileHandler}
      className={`max-w-7xl mx-auto my-9 ${
        theme === "dark" ? "bg-[#121212] text-[#E0E0E0]" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative md:w-28 md:h-28  w-20 h-20">
            <div className="w-full h-full rounded-full flex items-center justify-center bg-gray-200 dark:bg-[#444444]">
              {selectedprofle ? (
                <img
                  src={selectedprofle}
                  alt="profile"
                  className="md:w-24 md:h-24 w-16 h-16 bg-white rounded-full"
                />
              ) : (
                <div className="md:w-24 md:h-24 w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  CN
                </div>
              )}
            </div>
            <input
              ref={imageRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={fileChangeHandler}
            />
            <div
              onClick={() => imageRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40 rounded-full cursor-pointer"
            >
              <Plus className="text-white w-8 h-8" />
            </div>
          </div>
          <input
            onChange={changeHandler}
            type="text"
            name="fullname"
            value={profileData.fullname}
            className="font-bold text-2xl outline-none border-none bg-transparent focus-visible:ring-transparent"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10">
        {[
          { icon: <Mail />, label: "Email", name: "email", disabled: true },
          { icon: <LocateIcon />, label: "Address", name: "address" },
          { icon: <MapPin />, label: "City", name: "city" },
          { icon: <MapPinnedIcon />, label: "Country", name: "country" },
        ].map(({ icon, label, name, disabled }) => (
          <div
            key={name}
            className={`flex items-center gap-4 rounded-sm p-2 ${
              theme === "dark" ? "bg-[#444444]" : "bg-gray-200"
            }`}
          >
            <div className="text-gray-500">{icon}</div>
            <div className="w-full">
              <label>
                {label}
                <input
                  disabled={disabled}
                  onChange={changeHandler}
                  name={name}
                  value={profileData[name]}
                  type="text"
                  className={`w-full bg-transparent ${
                    theme === "dark"
                      ? "text-[#E0E0E0]"
                      : "text-gray-600"
                  } focus-visible:ring-0 focus-visible:border-transparent outline-none border-none`}
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          disabled={loading}
          className={`btn-orange flex items-center justify-center mx-auto ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading && (
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          )}
          {loading ? "Please wait" : "Update"}
        </button>
      </div>
    </form>
    </motion.div>
  );
}

export default Profile;

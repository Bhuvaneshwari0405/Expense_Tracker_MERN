import React from "react";
import { SIDE_MENU_DATA } from "../../utils/data.js";
import { useContext } from "react";
import { UserContext } from "../../context/userContext.jsx";
import { useNavigate } from "react-router-dom";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);

  const navigate = useNavigate();
  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-10">
      <div className="flex flex-col gap-2">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        )}
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${
              activeMenu === item.label ? "bg-gray-200" : ""
            }`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="" />
            {item.label}
          </button>
        ))}
      </div>
      <div
        className="flex items-center gap-2 p-2 rounded-md cursor-pointer mt-5"
        onClick={() => handleLogout()}
      >
        <span>Logout</span>
      </div>
    </div>
  );
};
export default SideMenu;

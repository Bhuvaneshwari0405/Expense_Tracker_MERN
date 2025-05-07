import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext.jsx";
import Navbar from "./Navbar.jsx";
import SideMenu from "./SideMenu.jsx";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex">
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>

          <div className="grow mx-5 min-h-[calc(100vh-61px)] pt-5">
  {children}
</div>

        </div>
      )}
    </div>
  );
};

export default DashboardLayout;

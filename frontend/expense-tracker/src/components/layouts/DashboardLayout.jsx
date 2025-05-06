import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext.jsx";
import Navbar from "./Navbar.jsx";
import SideMenu from "./SideMenu.jsx";

const DashboardLayout = ({children, activeMenu}) => {
    const { user } = useContext(UserContext);

    return(
        <div className="">
            <Navbar activeMenu={activeMenu} />
            {user && (
                <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                    <div className="">
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                    <div className="grow mx-5">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}
export default DashboardLayout;

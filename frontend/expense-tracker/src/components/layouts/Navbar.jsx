import React from "react";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div className="flex gap-5 items-center justify-between bg-white p-5 shadow-md">
      <button
        className="block lg:hidden text-black"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl text-black" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>
      <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
      {openSideMenu && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-10 flex justify-center items-center">
          <div className="bg-white w-1/2 h-full p-5 rounded-lg shadow-lg">
            <SideMenu activeMenu={activeMenu} />
            <button onClick={() => setOpenSideMenu(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Navbar;

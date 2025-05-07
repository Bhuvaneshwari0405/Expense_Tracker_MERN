import React from "react";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div className="w-full fixed top-0 left-0 z-[350] flex items-center gap-7 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7">
  <button
    className="block lg:hidden text-black"
    onClick={() => setOpenSideMenu(!openSideMenu)}
  >
    {openSideMenu ? (
      <HiOutlineX className="text-2xl" />
    ) : (
      <HiOutlineMenu className="text-2xl" />
    )}
  </button>
  <h2 className="text-lg font-medium text-black">Expense Tracker</h2>

  {openSideMenu && (
    <div className="fixed top-[61px] left-0 z-[300] h-[calc(100vh-61px)] w-64 bg-white shadow-lg overflow-y-auto">
      <SideMenu activeMenu={activeMenu} />
    </div>
  )}
</div>

  );
};
export default Navbar;

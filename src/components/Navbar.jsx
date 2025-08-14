import React from 'react'
import { FaHome } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

const Navbar = () => {

  return (
    <nav className="flex justify-between items-center bg-[#22877f] py-4 px-6 shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div className="logo font-bold font-serif flex items-center gap-1">
        <span className="text-2xl text-white">my</span>
        <span className="text-2xl text-[#e4c31c]">Task</span>
      </div>
    </nav>
  );
};

export default Navbar

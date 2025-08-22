import { IconUserCircle } from "@tabler/icons-react";
import { Menu } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="hidden  bg-white shadow-sm px-4 py-3 lg:flex items-center justify-between w-full">
        <Link className="flex items-center gap-3" to="/">
          <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
            <img src="/logo.png" alt="examrojgar-logo" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-800">ExamRojgar</h1>
            <p className="text-xs text-gray-600">TEST SERIES</p>
          </div>
        </Link>
        {/* <button className="p-2">
          <IconUserCircle className="w-6 h-6 text-gray-600" />
        </button> */}
      </header>
    </>
  );
};

export default Header;

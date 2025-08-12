import { Menu } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <>
      <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">AGS</span>
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-800">Exam Rojgar</h1>
            <p className="text-xs text-gray-600">TEST SERIES</p>
          </div>
        </div>
        <button className="p-2">
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
      </header>
    </>
  );
};

export default Header;

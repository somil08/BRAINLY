import { useState } from "react";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { MenuIcon } from "../icons/MenuIcon"; // Add a menu icon for toggle
import Logo from "../icons/Logo";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`h-screen bg-white border-r border-gray-200 transition-all duration-300 ${
        isOpen ? "w-64 pl-6" : "w-20"
      } fixed left-0 top-0 flex flex-col`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between text-2xl pt-6 px-4">
        {isOpen && (
          <div className="flex items-center text-purple-600">
            <Logo />
            <span className="ml-2 font-bold text-gray-800">Brainly</span>
          </div>
        )}
        {/* Toggle Button */}
        <button onClick={() => setIsOpen(isOpen)} className="p-2 focus:outline-none">
          <MenuIcon />
        </button>
      </div>

      {/* Sidebar Items */}
      <div className={`pt-8 ${isOpen ? "pl-4" : "pl-2"} transition-all`}>
        <SidebarItem text="Twitter" icon={<TwitterIcon />} />
        <SidebarItem text="YouTube" icon={<YoutubeIcon />} />
   

      </div>
    </div>
  );
}

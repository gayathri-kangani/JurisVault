import React, { useState } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { FcBullish } from 'react-icons/fc';
import { HiOutlineLogout } from 'react-icons/hi';
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from './navigation';

import control from "../../assets/control.png";
import logo from "../../assets/logo.svg";

import { useStateContext } from '../../contexts/ContextProvider';

const linkClass = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-light-white hover:no-underline active:bg-light-white rounded-md text-base';

export default function Sidebar() {
  
  const [open, setOpen] = useState(true);
  const { pathname } = useLocation();

  return (
    <div className={`${open ? "w-64" : "w-20 "} bg-indigo-950 p-5 pt-8 flex flex-col relative duration-300`}>

      <img
        src={control}
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-indigo-950 border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />

      <div className="flex gap-x-4 items-center w-12">
        <img src={logo} className={`cursor-pointer w-8 duration-500  border-indigo-950 rounded ${open && "rotate-[360deg]"}`} />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>
          JurisVault
        </h1>
      </div>

      <div className="py-8 flex flex-1 flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <Link
            key={link.key}
            to={link.path}
            className={classNames(pathname === link.path ? 'bg-light-white rounded-lg text-white' : 'text-gray-300', linkClass)}
          >
            <span className="text-xl">{link.icon}</span>
            <span className={`${!open && "hidden"} origin-left duration-200`}>{link.label}</span>
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-0.5 pt-2 border-t border-light-white">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
          <Link
            key={link.key}
            to={link.path}
            className={classNames(pathname === link.path ? 'bg-light-white text-white' : 'text-gray-300', linkClass)}
          >
            <span className="text-xl">{link.icon}</span>
            <span className={`${!open && "hidden"} origin-left duration-200`}>{link.label}</span>
          </Link>
        ))}
        <div className={classNames(linkClass, 'cursor-pointer text-red-500')}>
          <span className="text-xl">
            <HiOutlineLogout />
          </span >
          <span className={`${!open && "hidden"} origin-left duration-200`}>Logout</span>
        </div>
      </div>
    </div>
  )
}

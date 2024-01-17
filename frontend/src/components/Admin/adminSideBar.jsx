import React, { useState, useEffect, useMemo } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";


import { FaRegUser } from "react-icons/fa"; 
import { GrUserWorker } from "react-icons/gr"; 
import { MdDashboardCustomize } from "react-icons/md";
import logo from "../../assets/images/logo.png";
 


const AdminSideBar = () => {
  const location = useLocation();

  const sideBarItems = useMemo(
    () => [  
      { text: "DASHBOARD", letterIcons: MdDashboardCustomize, path: "/adminHome" },
      {
        text: "CLIENTS",
        letterIcons: FaRegUser, 
        path: "/adminListClient",
      },
      {
        text: "ELECTRICIANS",
        letterIcons: GrUserWorker,
        path: "/adminListElectrician",
      },
      
    ],
    []
  );

  const [selectedLetter, setSelectedLetter] = useState(0);

  useEffect(() => {
    const index = sideBarItems.findIndex(
      (letter) => location.pathname === letter.path
    );
    if (index !== -1) {
      setSelectedLetter(index);
    }
  }, [location.pathname, sideBarItems]);

  return (
    <>
  <div className="hidden  lg:block md:w-1/2 lg:w-1/4 relative overflow-hidden md:shadow-md bg-blue-50 text-center  ">
    <div className=" flex  flex-col items-center pt-5 md:shadow-inner">
      <img className="w-52" src={logo} alt="logo" />
      {sideBarItems.map(({ text, letterIcons, path }, index) => (
        <NavLink
          key={index}
          to={path}
          activeClassName="border-blue-700 shadow-md m-5"
          className={`cursor-pointer min-w-[300px] min-h-[30px] border-l-4 ${
            selectedLetter === index ? "border-blue-700" : "border-transparent"
          }`}
          onClick={() => setSelectedLetter(index)}
        >
          <h1 className="flex items-center justify-center m-8 font-bold text-xl">
            {React.createElement(letterIcons, { className: "mr-4" })}
            {text}
          </h1>
        </NavLink>
      ))}
    </div>
  </div>
</>

  );
};

export default AdminSideBar;

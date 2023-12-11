import logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { useEffect, useRef ,useState} from "react";
import {BsChevronDown} from "react-icons/bs"


const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const navLinks = [
    {
      path: "/",
      display: "Home",
    },
    {
      path: "/register",
      display: "Register",
    },
    {
      path: "/login",
    display: (
      <div className="relative inline-block text-center">
        <NavLink
          to={"/login"}
          className="text-white text-[16px] leading-7 font-[600] flex items-center gap-2"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setShowDropdown((prevShowDropdown) => !prevShowDropdown);
          }}
        >
          Login <BsChevronDown className="w-4 h-4" />
        </NavLink>
        <div
          className={`origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-in-out duration-150 ${
            showDropdown ? "" : "hidden"
          }`}
        >
          <div className="py-1">
            <NavLink
              to="/client_login"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Client
            </NavLink>
            <NavLink
              to="/electrician_login"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Electrician
            </NavLink>
            <NavLink
              to="/shop_login"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Shop
            </NavLink>
          </div>
        </div>
      </div>
      ),
    },
    {
      path: "/",
      display: (
        <img style={{ width: "70px", height: "50px" }} src={logo} alt="logo" />
      ),
    },
  ];

  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header className="header  flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* ==========logo==========*/}
          <div>
            <NavLink
              to={"/"}
              className="text-white text-[16px] leading-7 font-[600]"
            >
              <h1 style={{ fontFamily: "Joti One", fontSize: "20px" }}>
                ElectroMingle
              </h1>
            </NavLink>
          </div>

          {/* ==========menu==========*/}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-white text-[16px] leading-7 font-[600] border-b-4 border-buttonColor"
                        : "text-white text-[16px] leading-7 font-[600]"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* ==========toggle==========*/}
          <span className="md:hidden" onClick={toggleMenu}>
            <BiMenu className="w-6 h-6 cursor-pointer" />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
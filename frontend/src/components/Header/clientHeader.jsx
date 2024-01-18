import logo from "../../assets/images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUserLogoutMutation } from "../../slices/authApiSlice";
import { userLogout } from "../../slices/authSlice";
import { toast } from "react-toastify";
import io from "socket.io-client";
const socket = io("https://electromingle.senjith.shop");

const ClientHeader = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userLogoutApiCall] = useUserLogoutMutation();

  const userName = JSON.parse(localStorage.getItem("userInfo"));

  const clientNavLinks = [
    {
      path: "/userHome",
      display: `Welcome, ${userName?.name}`,
    },
    {
      path: "/userElectricianList",
      display: "Electricians",
    },

    {
      path: "/clientScheduledWorks",
      display: "Scheduled",
    },

    {
      path: "/completedWorks",
      display: "Completed",
    },

    {
      path: "/clientElectricianChat",
      display: "ElectricianChats",
    },

    {
      path: "/userLogout",
      display: "Logout",
    },
    {
      path: "/userHome",
      display: (
        <img style={{ width: "70px", height: "50px" }} src={logo} alt="logo" />
      ),
    },
  ];

  const logoutHandler = async () => {
    try {
      if (userInfo) {
        await userLogoutApiCall().unwrap();
        dispatch(userLogout());
        toast.success("Logout Successful");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.data.message);
      console.log(error);
    }
  };

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

  useEffect(() => {
    socket.on("notify-user", (notificationData) => {
      toast.success("Booking Status Changed by electrician");
    });

    return () => {
      socket.off("notify-user");
    };
  }, []);

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
              {clientNavLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-white text-[16px] leading-7 font-[600] border-b-4 border-buttonColor"
                        : "text-white text-[16px] leading-7 font-[600]"
                    }
                    onClick={() => {
                      if (link.display === "Logout") {
                        logoutHandler();
                      }
                    }}
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

export default ClientHeader;

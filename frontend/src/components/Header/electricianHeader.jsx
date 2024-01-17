import logo from "../../assets/images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useElectricianLogoutMutation } from "../../slices/authApiSlice";
import { electricianLogout } from "../../slices/authSlice";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const ElectricianHeader = ({ electicianDetails }) => {
  console.log(electicianDetails, "electicianDetails");
  const { electricianInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [electricianLogoutApiCall] = useElectricianLogoutMutation();

  const electricianName = JSON.parse(localStorage.getItem("electricianInfo"));

  const electricianNavlinks = [
    {
      path: "/electricianHome",
      display: `Welcome, ${electricianName?.name}`,
    },
    {
      path: "/electricianSideScheduledWorks",
      display: "mySchedules",
    },
    {
      path: "/electricianSideCompletedWorks",
      display: "myWorks",
    },
    {
      path: "/clientElectricianChat",
      display: "clientChat",
    },
    {
      path: "/electricianLogout",
      display: "Logout",
    },
    {
      path: "/electricianProfile",
      display: (
        <>
          {electicianDetails.data?.electricianProfileImage ? (
            <img
              className="rounded-full w-12 h-12"
              src={electicianDetails.data?.electricianProfileImage}  
              alt="logo"
            />
          ) : (
            <img
              className="rounded-full w-12 h-12"
              src={logo}
              alt="logo"
            />
          )}
        </>
      )
    }

  ];

  const logoutHandler = async () => {
    try {
      if (electricianInfo) {
        await electricianLogoutApiCall().unwrap();
        dispatch(electricianLogout());
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
              {electricianNavlinks.map((link, index) => (
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
ElectricianHeader.propTypes = {
  electicianDetails: PropTypes.shape({
    data: PropTypes.shape({
      electricianProfileImage: PropTypes.string,
      electricianIsVerified: PropTypes.bool,
      electricianName: PropTypes.string,
      electricianMobileNumber: PropTypes.string,
      electricianLocation: PropTypes.shape({
        electricianState: PropTypes.string,
        electricianLocality: PropTypes.string,
      }),
      electricianDescription: PropTypes.string,
    }),
  }),
};
export default ElectricianHeader;

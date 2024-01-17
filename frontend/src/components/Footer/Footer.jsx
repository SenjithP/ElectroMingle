import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineWhatsApp,
} from "react-icons/ai";

const socialLinks = [
  {
    path: "https://www.facebook.com",
    icon: <AiOutlineFacebook className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://www.instagram.com",
    icon: <AiOutlineInstagram className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://rb.gy/75akix",
    icon: <AiOutlineTwitter className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://rb.gy/bxhlgw",
    icon: <AiOutlineWhatsApp className="group-hover:text-white w-4 h-5" />,
  },
];

const Footer = () => {
  return (
    <footer className="bg-darkGrayColor">
      <div className="container mx-auto py-5 ">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12">
          <div className="flex  items-center md:w-0.75/3">
            <img className="w-[220px]" src={logo} alt="logo" />
          </div>

          <div className="flex flex-col justify-center items-center text-center md:text-left md:w-1.5/3">
            <p className="lg:pl-[100px] lg:pr-[100px] mt-4 md:mt-0 text-[18px] leading-7 text-center font-semibold text-white">
              We're excited to have you be a part of our community. Join
              ElectroMingle today and be a part of the electrical revolution.
              Let's electrify the future, together.
            </p>
            <h2 className="mt-8 text-[24px] leading-[30px] font-bold mb-2 text-white">
              Connect With Us
            </h2>
            <div className="flex items-center gap-3">
              {socialLinks.map((link, index) => (
                <Link
                  to={link.path}
                  key={index}
                  className="w-9 h-9 border border-solid  border-[#fff] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  {link.icon}
                </Link>
              ))}
            </div>

            <p className="text-[12px] leading-7 font-normal text-white mt-2 md:mt-4">
              ©2023 Copyright, All rights reserved.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center md:items-end md:w-0.75/3">
            <h2 className="text-[14px] text-center md:text-right leading-[30px] font-bold text-white">
              ElectroMingle <br />
              <a href="mailto:electromingle@gmail.com" className="text-white">
                electromingle@gmail.com
              </a>{" "}
              <br />
              <a href="tel:9776884438" className="text-white">
                9776884438
              </a>{" "}
              <br />
              Velur, Thrissur <br />
              Kerala - 680601 India
            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

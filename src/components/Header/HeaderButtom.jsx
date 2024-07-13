import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SideNavContent from "./SideNavContent";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const sideNavContent = [
  {
    title: "Digital Content & Devices",
    one: "Amazon Music",
    two: "Kindle E-readers & Books",
    three: "Amazon Appstore",
  },
  {
    title: "Shop By Department",
    one: "Electronics",
    two: "Computers",
    three: "Smart Home",
  },
  {
    title: "Programs & Features",
    one: "Gift Cards",
    two: "Amazon live",
    three: "International Shopping",
  },
  {
    title: "Help & Settings",
    one: "Your Account",
  },
];

const HeaderButtom = () => {
  const ref = useRef();
  const [showSidenav, setShowSidenav] = useState(false);
  const userInfo = useSelector((state) => state.amazon.userInfo);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        setShowSidenav(false);
      }
    });
  }, [ref]);
  return (
    <div className="w-full px-4  h-[36px] bg-amazon_light text-white flex items-center">
      <ul className="flex items-center gap-3 text-sm tracking-wide">
        <li
          onClick={() => setShowSidenav(!showSidenav)}
          className="headerHover capitalize flex gap-2"
        >
          <MenuIcon />
          all
        </li>
        <li className="headerHover hidden md:inline-flex  capitalize">
          today's deals
        </li>
        <li className="headerHover  hidden md:inline-flex capitalize">
          customer service
        </li>
        <li className="headerHover  hidden md:inline-flex capitalize">
          gift card
        </li>
        <li className="headerHover  hidden md:inline-flex capitalize">
          registry
        </li>
        <li className="headerHover  hidden md:inline-flex capitalize">sellS</li>
      </ul>
      {showSidenav && (
        <div className="w-full h-screen text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-50 z-20">
          <div className="w-full h-full relative">
            <motion.div
              ref={ref}
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="w-[80%] md:w-[350px] h-full bg-white border border-black"
            >
              <div className="w-full bg-amazon_light text-white py-2 px-6 flex items-center gap-4">
                {userInfo ? (
                  <>
                    <img
                      src={userInfo.photo}
                      alt=""
                      className="w-8 rounded-full"
                    />
                    <h3 className="font-titleFont font-bold text-lg tracking-wide capitalize">
                      helo, {userInfo.userName}
                    </h3>
                  </>
                ) : (
                  <>
                    <AccountCircleIcon />
                    <h3 className="font-titleFont font-bold text-lg tracking-wide capitalize">
                      helo, sign in
                    </h3>
                  </>
                )}
              </div>
              {sideNavContent.map(({ title, one, two, three }) => {
                return (
                  <SideNavContent
                    key={title}
                    title={title}
                    one={one}
                    two={two}
                    three={three}
                  />
                );
              })}
              <span
                onClick={() => setShowSidenav(false)}
                className="absolute cursor-pointer top-0 left-[82%] md:left-[360px] w-10 h-10 text-black flex items-center justify-center border bg-gray-200 hover:bg-red-500 hover:text-white duration-300"
              >
                <CloseIcon />
              </span>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderButtom;

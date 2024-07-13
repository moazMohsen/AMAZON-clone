import React, { useState } from "react";
import { logo } from "../../assets/index";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LogOutIcom from "@mui/icons-material/LoginOutlined";
import { allItems } from "../../constants";
import HeaderButtom from "./HeaderButtom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { signOutUser } from "../../redux/amazonSlice";

const Header = () => {
  const [showAll, setShowAll] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.amazon.products);
  const userInfo = useSelector((state) => state.amazon.userInfo);
  const auth = getAuth();

  const handelLogOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(signOutUser());
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className="w-full sticky top-0 z-50">
      <div className="w-full bg-amazon_blue text-white px-4 py-3 flex items-center gap-4">
        <Link to="/" className="headerHover">
          <img src={logo} alt="logo" className="w-24 mt-2" />
        </Link>
        <div className="headerHover hidden mdl:inline-flex">
          <LocationOnIcon />
          <p className="text-sm text-lightText font-light flex flex-col capitalize">
            deliver to
            <span className="text-sm font-semibold  text-whiteText">ksa</span>
          </p>
        </div>
        <div className="h-10 rounded-md  hidden mdl:flex flex-grow relative ">
          <span
            onClick={() => setShowAll(!showAll)}
            className="w-14 h-full  bg-gray-200 hover:bg-gray-300 border-2 cursor-pointer duration-300 text-sm text-amazon_blue font-titleFont flex items-center justify-center rounded-tl-md rounded-bl-md "
          >
            All <span></span>
            <ArrowDropDownIcon />
          </span>
          {showAll && (
            <div>
              <ul className="absolute w-56 h-80 top-10 left-0 overflow-y-scroll  bg-white border-[1px] border-amazon_blue text-black p-2 flex flex-col gap-1 z-50">
                {allItems.map(({ id, title }) => {
                  return (
                    <li className="dropDownHover" key={id}>
                      {title}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <input
            type="text"
            className="h-full text-base text-amazon_blue flex-grow outline-none border-none px-2"
          />
          <span className="w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md">
            <SearchIcon />
          </span>
        </div>
        <Link to="/signin">
          <div className="flex flex-col items-start justify-center headerHover capitalize">
            {userInfo ? (
              <p className="text-xs mdl:text-lg text-white mdl:text-lightText font-medium">
                {userInfo.userName}
              </p>
            ) : (
              <>
                <p className="text-sm mdl:text-xs text-white mdl:text-lightText font-light">
                  hello, sign in
                </p>
                <p className="text-sm font-semibold  text-whiteText hidden mdl:inline-flex">
                  accounts & list
                  <span>
                    <ArrowDropDownIcon />
                  </span>
                </p>
              </>
            )}
          </div>
        </Link>

        <div className="hidden lgl:flex flex-col items-center justify-center headerHover capitalize">
          <p className="text-xs text-lightText font-titleFont">retuens</p>
          <p className="text-sm font-semibold text-whiteText"> &order</p>
        </div>
        <div className="flex  items-center justify-center headerHover capitalize relative">
          <ShoppingBagIcon />
          <Link
            to="/card"
            className="text-xs font-semibold mt-3 text-whiteText"
          >
            cart
            <span className="absolute text-xs top-0 left-6 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center">
              {products.length === 0 ? "0" : products.length}
            </span>
          </Link>
        </div>
        {userInfo && (
          <div
            onClick={handelLogOut}
            className="flex flex-col justify-center items-center headerHover relative"
          >
            <LogOutIcom />
            <p className="hidden mdl:inline-flex text-xs font-semibold text-whiteText capitalize">
              log out
            </p>
          </div>
        )}
      </div>
      <HeaderButtom />
    </div>
  );
};

export default Header;

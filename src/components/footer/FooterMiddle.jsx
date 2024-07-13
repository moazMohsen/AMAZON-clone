import React from "react";
import FooterMiddelList from "./FooterMiddelList";
import { middelList } from "../../constants/index";
import { logo } from "../../assets/index";

const FooterMiddle = () => {
  return (
    <div className="w-full bg-amazon_light text-white">
      <div className="w-full border-b-[1px] border-gray-500 p-10">
        <div className="max-w-5xl mx-auto text-gray-300 ">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 md:place-items-center md:items-start">
            {middelList.map((item) => {
              return (
                <FooterMiddelList
                  key={item.id}
                  title={item.title}
                  listItem={item.listItem}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className=" w-full flex gap-6 items-center justify-center py-6">
        <div>
          <img src={logo} alt="logo" className="w-20 pt-3" />
        </div>
        <div className="flex gap-2">
          <p className="capitalize flex gap-1 items-center justify-center border border-gray-500 hover:border-amazon_yellow cursor-pointer duration-200 px-2 py-1">
            english
          </p>
          <p className="capitalize flex gap-1 items-center justify-center border border-gray-500 hover:border-amazon_yellow cursor-pointer duration-200 px-2 py-1">
            arabic
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterMiddle;

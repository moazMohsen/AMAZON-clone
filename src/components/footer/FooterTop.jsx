import React from "react";

const FooterTop = () => {
  return (
    <div className="w-full bg-white py-6 capitalize">
      <div className="w-full border-t-[1px] border-b-[1px] py-8">
        <div className="w-64 mx-auto text-center">
          <p className="text-sm">see personalised recommendations </p>
          <button className="w-full bg-yellow-500 active:bg-yellow-700 rounded-md cursor-pointer py-1 font-semibold my-3">
            sing in
          </button>
          <p className="text-xs mt-1">
            new customer?
            <span className="text-blue-600 ml-1 cursor-pointer">
              start here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;

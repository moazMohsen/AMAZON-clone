import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const SideNavContent = ({ title, one, two, three }) => {

  return (
    <div className="py-3 border-b-[1px] border-b-gray-300 capitalize ">
      <h3 className="text-lg font-titleFont font-semibold mb-1 px-6 ">
        {title}
      </h3>
      <ul className="text-sm flex flex-col gap-4">
        {one && (
          <li className="flex items-center justify-between hover:bg-zinc-200 px-6 cursor-pointer">
            {one}
            <span>
              <KeyboardArrowRightIcon />
            </span>
          </li>
        )}
        {two && (
          <li className="flex items-center justify-between hover:bg-zinc-200 px-6 cursor-pointer">
            {two}
            <span>
              <KeyboardArrowRightIcon />
            </span>
          </li>
        )}
        {three && (
          <li className="flex items-center justify-between hover:bg-zinc-200 px-6 cursor-pointer">
            {three}
            <span>
              <KeyboardArrowRightIcon />
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SideNavContent;

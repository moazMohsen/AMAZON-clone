import React from "react";
import { useLoaderData } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import ApiIcon from "@mui/icons-material/Api";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/amazonSlice";

const Product = () => {
  const dispatch = useDispatch();

  const data = useLoaderData();
  const productData = data.data;
  return (
    <div className="max-w-screen-2x1 mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6  xl:gap-10 px-4">
      {productData.map((item) => {
        return (
          <div
            key={item.id}
            className="bg-white h-auto border-[1px] border-gray-200 py-8 z-30 hover:border-transparent shadow-none hover:shadow-testShadow duration-200 relative flex flex-col gap-4"
          >
            <span className="absolute top-2 right-2 text-xs capitalize italic text-gray-500">
              {item.category}
            </span>
            <div className="w-full h-auto flex items-center justify-center relative group">
              <img
                className="w-52 h-64 object-contain"
                src={item.image}
                alt="product"
              />
              <ul className="w-full h-0 bg-gray-100 absolute bottom-[-180px] overflow-hidden flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r group-hover:bottom-0 group-hover:h-36 duration-300">
                <li className="productLi capitalize">
                  compare
                  <span>
                    <ApiIcon />
                  </span>
                </li>
                <li className="productLi capitalize">
                  add to cart
                  <span>
                    <ShoppingCartIcon />
                  </span>
                </li>
                <li className="productLi capitalize">
                  view details
                  <span>
                    <ArrowCircleRightIcon />
                  </span>
                </li>
                <li className="productLi capitalize">
                  add to wish list
                  <span>
                    <FavoriteIcon />
                  </span>
                </li>
              </ul>
            </div>
            <div className="px-4 z-10 bg-white">
              <div className=" flex items-center justify-between  ">
                <h2 className="font-titleFont tracking-wide text-lg text-amazon_blue font-medium">
                  {item.title.substring(0, 20) + "..."}
                </h2>
                <p className="text-sm text-gray-600 font-semibold">
                  ${item.price}
                </p>
              </div>
              <div>
                <p className="text-sm">
                  {item.description.substring(0, 80)}...
                </p>
                <div className="text-yellow-500">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
              </div>
              <button
                onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))}
                className="w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-500 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-200 py-1.5 rounded-md mt-3 "
              >
                add to cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Product;

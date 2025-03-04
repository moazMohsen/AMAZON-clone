import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { emptyCart } from "../assets/index";
import { motion } from "framer-motion";
import {
  decrisingQuantity,
  deleteProduct,
  incrementQuantity,
  resetProduct,
} from "../redux/amazonSlice";
import { Link } from "react-router-dom";
const Card = () => {
  const products = useSelector((state) => state.amazon.products);
  const dispatch = useDispatch();
  let [totalPrice, setTotalprice] = useState();

  useEffect(() => {
    let total = 0;
    products.map(({ price, quantity }) => {
      total += price * quantity;
      setTotalprice(total.toFixed(2));
    });
  }, [products]);

  return (
    <div className="w-full bg-gray-100 p-4">
      {products.length > 0 ? (
        <div className="container mx-auto h-auto grid grid-cols-5 gap-8">
          <div className="w-full h-full bg-white px-4 col-span-4">
            <div className="font-titleFont flex items-center justify-between border-b-[1px] border-b-gray-400 py-3 capitalize">
              <h2 className=" font-semibold text-amazon_blue">shoping cart</h2>
              <h4 className=" font-semibold text-amazon_light">subTitle</h4>
            </div>
            <div>
              {products.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="w-full border-b-[1px] border-b-gray-300 p-4 flex items-center"
                  >
                    <div className="w-full flex items-center gap-6">
                      <div className="w-1/5">
                        <img
                          src={item.image}
                          alt="product"
                          className="w-full h-44 object-contain"
                        />
                      </div>
                      <div className="capitalize w-3/5">
                        <h2 className="font-semibold text-lg">{item.title}</h2>
                        <p className=" text-sm">{item.description}</p>
                        <p className="text-base text-gray-400">
                          unit price
                          <span className="font-semibold text-amazon_blue ml-2">
                            {item.price}
                          </span>
                        </p>
                        <div className="bg-[#f0f2f2] flex justify-center items-center gap-1 w-24 py-1 text-center drop-shadow-lg rounded-md mt-2">
                          <p>qty:</p>
                          <p
                            onClick={() => dispatch(decrisingQuantity(item))}
                            className="cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300"
                          >
                            -
                          </p>
                          <p className="">{item.quantity}</p>
                          <p
                            onClick={() => dispatch(incrementQuantity(item))}
                            className="cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300"
                          >
                            +
                          </p>
                        </div>
                        <button
                          onClick={() => dispatch(deleteProduct(item))}
                          className="bg-red-500 w-36 py-1 rounded-lg text-white mt-2 hover:bg-red-700 active:bg-red-900 duration-300"
                        >
                          delete
                        </button>
                      </div>
                      <div>
                        <p className="text-lg font-titleFont font-semibold">
                          $ {item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full my-2">
              <button
                onClick={() => dispatch(resetProduct())}
                className="px-10 py-2 bg-red-500 hover:bg-red-600 active:bg-red-500 text-white rounded-lg font-titleFont capitalize text-lg"
              >
                clear cart
              </button>
            </div>
          </div>
          <div className="w-full h-52 bg-white  col-span-1 flex flex-col items-center justify-center p-4">
            <div>
              <p className="flex gap-2 items-start text-sm">
                <span>
                  <CheckCircleIcon className="bg-white text-green-500 rounded-full" />
                </span>
                Your order qualifies for FREE Shipping Choose this option at
                checkout. See details....
              </p>
            </div>
            <div>
              <p className="font-semibold px-10 py-1 flex items-center justify-between">
                total: <span className="text-ld font-bold">${totalPrice}</span>
              </p>
            </div>
            <button className="w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-500 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-200 py-1.5 rounded-md mt-3">
              proceed to pay
            </button>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: -500, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-center items-center gap-4 py-10"
        >
          <div>
            <img
              src={emptyCart}
              alt="emptyCart"
              className="w-80 rounded-lg p-4 mx-auto"
            />
          </div>
          <div className="w-96 p-4 bg-white flex flex-col items-center rounded-md capitalize">
            <h1 className="font-titleFont text-xl font-bold">
              your cart feels lonely.
            </h1>
            <p className="text-sm text-center">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>

            <Link to="/" className="w-full">
              <button className="w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-500 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-200 py-1.5 rounded-md mt-3">
                continue shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Card;

import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { darkLogo } from "../assets/index";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { motion } from "framer-motion";

const Resgistration = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errCPassword, setErrCPassword] = useState("");
  const [firebaseErr, setFirebaseErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [succsesMsgs, setSuccsesMsgs] = useState("");

  //   email valdition
  const emailValidation = (email) => {
    return String(email)
      .toLocaleLowerCase()
      .match(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/);
  };
  const handelRegstration = (e) => {
    e.preventDefault();
    if (!clientName) {
      setErrClientName("enter your name");
    }
    if (!email) {
      setErrEmail("enter your email");
    } else if (!emailValidation(email)) {
      setErrEmail("enter corect email");
    }
    if (!password) {
      setErrPassword("enter your password");
    } else if (password.length < 6) {
      setErrPassword(" password must be at least 6 characters");
    }
    if (!cPassword) {
      setErrCPassword("confirm your password");
    } else if (cPassword !== password) {
      setErrCPassword("password not matched");
    }
    if (
      clientName &&
      email &&
      emailValidation(email) &&
      password &&
      password.length >= 6 &&
      cPassword
    ) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: clientName,
            photoURL:
              "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
          });
          // Signed in
          const user = userCredential.user;
          setLoading(false);
          setSuccsesMsgs("account created successfully");
          setTimeout(() => {
            navigate("/signin");
          }, 3000);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/email-already-in-use")) {
            setFirebaseErr("Email already in use, try another email");
          }
          // ..
        });

      setClientName("");
      setEmail("");
      setPassword("");
      setCPassword("");
      setFirebaseErr("");
    }
  };
  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 pb-10">
        <form className=" w-[350px] mx-auto flex flex-col items-center">
          <img src={darkLogo} alt="logo" className="w-32" />
          <div className="w-full border border-zinc-200 p-6">
            <h2 className="font-titleFont text-3xl font-medium mb-4 capitalize">
              Create Account
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium capitalize ">Your name</p>
                <input
                  value={clientName}
                  onChange={(e) => {
                    setClientName(e.target.value);
                    setErrClientName("");
                  }}
                  type="text "
                  className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-yellow-400  focus-within:shadow-amazonInput duration-100"
                />
                {errClientName && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5 capitalize">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errClientName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium capitalize ">
                  email or mobile phone number
                </p>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrEmail("");
                    setFirebaseErr("");
                  }}
                  type="email "
                  className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-yellow-400  focus-within:shadow-amazonInput duration-100"
                />
                {errEmail && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5 capitalize">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errEmail}
                  </p>
                )}
                {firebaseErr && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5 capitalize">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {firebaseErr}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium capitalize ">password</p>
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrPassword("");
                  }}
                  type="password"
                  className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-yellow-400 focus-within:shadow-amazonInput duration-100"
                />
                {errPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5 capitalize">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errPassword}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium capitalize ">
                  Re-enter Password
                </p>
                <input
                  value={cPassword}
                  onChange={(e) => {
                    setCPassword(e.target.value);
                    setErrCPassword("");
                  }}
                  type="password"
                  className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-yellow-400 focus-within:shadow-amazonInput duration-100"
                />
                {errCPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5 capitalize">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errCPassword}
                  </p>
                )}
                <p className="text-xs text-gray-600">
                  Passwords must be at least 6 characters.
                </p>
              </div>
              <button
                onClick={handelRegstration}
                className="w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-500 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-200 py-1.5 rounded-md mt-3 "
              >
                continue
              </button>
              {loading && (
                <div className="flex justify-center items-center">
                  <RotatingLines
                    strokeColor="#febd69"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="50"
                    visible={true}
                  />
                </div>
              )}
              {succsesMsgs && (
                <div>
                  <motion.p
                    className="text-base font-titleFont font-semibold text-green-500 border-[1px] border-green-500 px-2 text-center"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {succsesMsgs}
                  </motion.p>
                </div>
              )}
            </div>
            <p className="text-xs text-black leading-4 mt-4">
              By Continuing, you agree to Amazon's
              <span className="text-blue-600">Conditions of Use</span> and
              <span className="text-blue-600">Privace Notice.</span>
            </p>
            <div>
              <p className="text-xs txt-gray-600 mt-4 cursor-pointer group flex items-center gap-1">
                Already have an account?
                <Link
                  to="/signin"
                  className="text-blue-600 group-hover:text-orange-700"
                >
                  Sign in
                  <ArrowRightIcon className="ml-[-5px]" />
                </Link>
              </p>
              <p className="text-xs txt-gray-600  cursor-pointer group flex items-center gap-1">
                Buying for work?
                <span className="ml-1 text-blue-600 group-hover:text-orange-700">
                  Create a free business account
                </span>
              </p>
            </div>
          </div>
          <p className="w-full text-xs text-gray-600 mt-4 flex items-center">
            <span className="w-1/3  h-[1px] bg-zinc-400 inline-flex"></span>
            <span className="w-1/3 text-center capitalize">new to amazon?</span>
            <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex "></span>
          </p>
        </form>
      </div>
      <div className="w-full flex flex-col items-center bg-gradient-to-t gap-4 from-white via-white to-zinc-200 py-10">
        <div className="w-full  flex  gap-4 justify-center items-center capitalize ">
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            conditions of use
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            conditions of use
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            conditions of use
          </p>
        </div>
        <p className="text-xs text-gray-600">
          © 1995-2023, moaz_dev.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
};

export default Resgistration;

import React, { useState } from "react";
import { darkLogo } from "../assets/index";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/amazonSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [passwerd, setPasswerd] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPasswerd] = useState("");

  const [userEmailErr, setUserEmailErr] = useState("");
  const [userPassErr, setUserPassErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const emailValidation = (email) => {
    return String(email)
      .toLocaleLowerCase()
      .match(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/);
  };
  const handelRegstration = (e) => {
    e.preventDefault();
    if (!email) {
      setErrEmail("enter your email");
    } else if (!emailValidation(email)) {
      setErrEmail("enter corect email");
    }
    if (!passwerd) {
      setErrPasswerd("enter your password");
    } else if (passwerd.length < 6) {
      setErrPasswerd(" password must be at least 6 characters");
    }
    if (email && passwerd) {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, passwerd)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch(
            setUserInfo({
              userName: user.displayName,
              email: user.email,
              id: user.uid,
              photo: user.photoURL,
            })
          );
          // ...
          setLoading(false);
          setSuccessMsg("logged in successfully! welcome  back!");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          if (errorCode.includes("auth/user-not-found")) {
            setUserEmailErr("invalid email");
          }
          if (errorCode.includes("auth/wrong-password")) {
            setUserPassErr("invalid password");
          } else {
            console.log("somthing worng ");
          }
        });
      setEmail("");
      setPasswerd("");
    }
  };

  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 pb-10">
        {successMsg ? (
          <div className="w-full flex justify-center items-center py-32">
            <p className="border-[1px] border-green-600 text-green-500 font-titleFont text-lg font-semibold px-6 py-2">
              {successMsg}
            </p>
          </div>
        ) : (
          <form className=" w-[350px] mx-auto flex flex-col items-center">
            <img src={darkLogo} alt="logo" className="w-32" />
            <div className="w-full border border-zinc-200 p-6">
              <h2 className="font-titleFont text-3xl font-medium mb-4 capitalize">
                sign in
              </h2>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium capitalize ">
                    email or mobile phone number
                  </p>
                  <input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrEmail("");
                      setUserEmailErr("");
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
                  {userEmailErr && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5 capitalize">
                      <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>
                      {userEmailErr}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium capitalize ">password</p>
                  <input
                    value={passwerd}
                    onChange={(e) => {
                      setPasswerd(e.target.value);
                      setErrPasswerd("");
                      setUserPassErr("");
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
                  {userPassErr && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5 capitalize">
                      <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>
                      {userPassErr}
                    </p>
                  )}
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
              </div>
              <p className="text-xs text-black leading-4 mt-4">
                By Continuing, you agree to Amazon's
                <span className="text-blue-600">
                  Conditions of Use
                </span> and{" "}
                <span className="text-blue-600">Privace Notice.</span>
              </p>
              <p className="text-xs txt-gray-600 mt-4 cursor-pointer group">
                <ArrowRightIcon />{" "}
                <span className="text-blue-600 group-hover:text-orange-700">
                  need help?
                </span>
              </p>
            </div>
            <p className="w-full text-xs text-gray-600 mt-4 flex items-center">
              <span className="w-1/3  h-[1px] bg-zinc-400 inline-flex"></span>
              <span className="w-1/3 text-center capitalize">
                new to amazon?
              </span>
              <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex "></span>
            </p>

            <Link to="/resgistration" className=" w-full">
              <button className="capitalize w-full py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t  from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput ">
                create your amazon account
              </button>
            </Link>
          </form>
        )}
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

export default SignIn;

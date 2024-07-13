import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/footer/Footer";
import Resgistration from "./pages/Resgistration";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Card from "./pages/Card";
import { productsData } from "./api/api";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";

const LayOut = () => {
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<LayOut />}>
          <Route index element={<Home />} loader={productsData}></Route>
          <Route path="/card" element={<Card />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/resgistration" element={<Resgistration />} />
      </Route>
    )
  );
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}
export default App;

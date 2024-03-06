import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {

  const location = useLocation();

  return (
    <div className="flex justify-between items-center h-20 text-white font-medium text-xl bg-blue-500">
      <h2 className="m-14 ">Task Management System</h2>
      <div className="flex justify-end gap-8 m-32 text-white">
        <Link
          to="/"
          className={`${
            location.pathname === "/"
              ? "border-b-2 pb-3 border-white hover:text-emerald-300"
              : "hover:text-emerald-300"
          }`}
        >
          Home
        </Link>
        <Link
          to="/Login"
          className={`${
            location.pathname === "/Login"
              ? "border-b-2 pb-3 border-white hover:text-emerald-300"
              : "hover:text-emerald-300"
          }`}
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

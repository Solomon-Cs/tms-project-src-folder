import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const loginUserName = localStorage.getItem("loginUserName");
  const loginUserid = localStorage.getItem("loginUserid");
  const loginUseremail = localStorage.getItem("loginUseremail");
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginUserName");
    localStorage.removeItem("loginUserid");
    localStorage.removeItem("loginUseremail");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center h-20 text-white font-medium text-xl bg-blue-500">
      <h2 className="text-md m-14">
        {" "}
        Welcome to Developer Page 
      </h2>
      <div className="flex justify-end gap-8 m-8  mr-20 ">
        <Link
          to="/DevTasks"
          className={`${
            location.pathname === "/DevTasks"
              ? "border-b-2 pb-3 border-white hover:text-emerald-300"
              : "hover:text-emerald-300"
          }`}
        > 
          Tasks
        </Link>
        <Link
          to="/DevTasks"
          title={"Welcome  " + loginUseremail}
          className={`${
            location.pathname === "/Profile"
              ? "border-b-2 pb-3 border-white hover:text-emerald-300"
              : "hover:text-emerald-300"
          }`}
        >
          Profile
        </Link>
          <LogoutIcon onClick={() => logout()} />
      </div>
    </div>
  );
};

export default Navbar;

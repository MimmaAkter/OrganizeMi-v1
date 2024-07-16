import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogoutBtn } from "../index.js";
import { useSelector } from "react-redux";

const Nav = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/Login",
      active: !authStatus,
    },
    {
      name: "Create Account",
      slug: "/password",
      active: !authStatus,
    },
    {
      name: "User List",
      slug: "/ReadUser",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/upload",
      active: authStatus,
    },
  ];
  let [open, setOpen] = useState(false);
  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
          <span className="text-3xl text-indigo-600 mr-1 pt-2">
            <ion-icon name="logo-ionic"></ion-icon>
          </span>
          OrganizeMI
        </div>

        <div onClick={() => setOpen(!open)} className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden">
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>

        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in 
          ${open ? "top-20 " : "top-[-490px]"}`}>
            {
              //dynamic menu
              navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )
            }
            {authStatus && <LogoutBtn />}
        </ul>
      </div>
    </div>
  );
};

export default Nav;

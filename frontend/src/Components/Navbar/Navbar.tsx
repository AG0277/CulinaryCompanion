import React, { memo, useState } from "react";
import { config } from "../../Data/NavbarDropdownItems";
import DropdownMenu from "./Dropdown/Dropdown";
import SearchBar from "./Search/SearchBar";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";

type Props = {};

const Navbar = memo(({}: Props) => {
  const { isLoggedIn, logout, user } = useAuth();
  return (
    <div className=" bg-greenIsh w-full z-50 sticky top-0 pb-5">
      <div className=" flex justify-center">
        <div className="max-w-full h-28 flex flex-row items-center justify-between ">
          <Link to={"/"} className=" w-1/3  ">
            <h1 className="">Culinary Companion</h1>
          </Link>
          <div className="w-2/3">
            <SearchBar />
          </div>
          <div className="flex">
            {isLoggedIn() ? (
              <div className="flex text-2xl items-center justify-center gap-x-4 w-max ">
                <p className="flex items-center justify-center">
                  Welcome
                  <p className=" ml-2  ">{user?.username}</p>
                </p>
                <a
                  className="flex w-max items-center justify-center text-lg hover:border p-2 hover:rounded-2xl hover:border-gray-500 hover:cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </a>
              </div>
            ) : (
              <>
                <Link to={"/login"}>
                  <p className="text-lg hover:border p-2 hover:rounded-2xl hover:border-gray-500 mx-2 hover:cursor-pointer">
                    Login
                  </p>
                </Link>
                <Link to={"/register"}>
                  <p className="text-lg hover:border p-2 hover:rounded-2xl hover:border-gray-500 hover:cursor-pointer">
                    Register
                  </p>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="h-14 flex flex-row items-center justify-center">
        <DropdownMenu parent="" config={config} />
      </div>
    </div>
  );
});

export default Navbar;

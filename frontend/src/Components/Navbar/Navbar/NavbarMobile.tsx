import React, { memo, useState } from "react";
import { config } from "../../../Data/NavbarDropdownItems";
import SearchBar from "../Search/SearchBar";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Hooks/useAuth";
import DropdownMobile from "../Dropdown/DropdownMobile";
import Hamburger from "hamburger-react";

type Props = {};

const NavbarMobile = ({}: Props) => {
  const { isLoggedIn, logout } = useAuth();
  const [dropdownMobile, setDropdownMobile] = useState<boolean>(false);
  const [isOpen, setOpen] = useState(false);

  const toggleDropdownMobile = () => {
    setDropdownMobile(!dropdownMobile);
    document.body.style.overflow = dropdownMobile ? "auto" : "hidden";
  };
  return (
    <div className={dropdownMobile ? "h-screen" : ""}>
      <div
        className={
          "bg-greenIsh z-50 sticky top-0 flex flex-col  text-white  overflow-y-auto "
        }
      >
        <div className=" relative flex justify-center items-center">
          <div className="absolute left-0">
            <Hamburger
              toggled={isOpen}
              toggle={setOpen}
              onToggle={toggleDropdownMobile}
            />
          </div>
          <Link to={"/"} className="">
            <h2 className="text-white my-10">Culinary Companion</h2>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <SearchBar />
        </div>
        {dropdownMobile && (
          <div className="">
            <div className="text-2xl ">
              <DropdownMobile parent="" config={config} />
              <br />
            </div>
            <div className="flex mb-20 items-center justify-center">
              {isLoggedIn() ? (
                <button
                  className="w-[100px] h-[40px] bg-yellow-500  text-lg hover:border rounded-2xl hover:border-gray-500 hover:cursor-pointer "
                  onClick={logout}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to={"/login"}>
                    <p className="text-lg text-white hover:border p-2 bg-yellow-500 rounded-2xl hover:border-gray-500 mx-2 hover:cursor-pointer">
                      Login
                    </p>
                  </Link>
                  <Link to={"/register"}>
                    <p className="text-lg text-white hover:border p-2 hover:rounded-2xl hover:border-gray-500 hover:cursor-pointer">
                      Register
                    </p>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarMobile;

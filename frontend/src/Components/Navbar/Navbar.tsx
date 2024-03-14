import React, { memo, useState } from "react";
import { config } from "../../Data/NavbarDropdownItems";
import DropdownMenu from "./Dropdown/Dropdown";
import SearchBar from "./Search/SearchBar";
import { Link } from "react-router-dom";

type Props = {
  //h-14 bg-greenIsh flex flex-row items-center justify-center
};

const Navbar = memo(({}: Props) => {
  return (
    <div className=" bg-greenIsh w-full z-50 sticky top-0 pb-5">
      <div className=" w-[1200px] mx-auto">
        <div className="h-28 flex flex-row items-center justify-between">
          <Link to={"/"} className=" w-1/3  ">
            <h1 className="">Culinary Companion</h1>
          </Link>
          <div className="m-56 w-2/3">
            <SearchBar />
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

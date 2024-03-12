import React, { useState } from "react";
import { config } from "../../Data/NavbarDropdownItems";
import DropdownMenu from "./Dropdown/Dropdown";
import SearchBar from "./Search/SearchBar";
import { Link } from "react-router-dom";

type Props = {};

const Navbar = ({}: Props) => {
  return (
    <div className="h-28 bg-greenIsh flex flex-row items-center justify-center sticky top-0  w-full z-50">
      <div className="flex flex-col">
        <Link to={"/"} className="mr-10">
          <h1 className="mx-auto">Culinary Companion</h1>
        </Link>
        <DropdownMenu parent="" config={config} />
      </div>
      <SearchBar />
    </div>
  );
};

export default Navbar;

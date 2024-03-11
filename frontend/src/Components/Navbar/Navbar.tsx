import React, { useState } from "react";
import { config } from "./NavbarDropdownItems";
import DropdownMenu from "./Dropdown/Dropdown";
import SearchBar from "../SearchBar/SearchBar";

type Props = {};

const Navbar = ({}: Props) => {
  return (
    <div className="h-28 bg-emerald-400 flex flex-row items-center justify-center sticky top-0  w-full z-50">
      <h2 className="mr-10">Culinary Companion</h2>
      <div className="mr-10">
        <DropdownMenu parent="" config={config} />
      </div>
      <SearchBar />
    </div>
  );
};

export default Navbar;

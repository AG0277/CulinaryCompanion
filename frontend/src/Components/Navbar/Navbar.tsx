import React, { useState } from "react";
import { config } from "./NavbarDropdownItems";
import DropdownMenu from "./Dropdown";
import SearchBarResult from "../SearchBar/SearchBarResult";
import SearchBar from "../SearchBar/SearchBar";

type Props = {};

const Navbar = ({}: Props) => {
  return (
    <div className="h-28 bg-emerald-400 flex flex-row items-center justify-center sticky top-0  w-full">
      <h2 className="mr-10">Culinary Companion</h2>
      <div className="mr-10">
        <DropdownMenu config={config} />
      </div>
      <SearchBar />
    </div>
  );
};

export default Navbar;

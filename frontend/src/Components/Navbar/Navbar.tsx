import React, { useState } from "react";
import { NavbarDropdownItems } from "../../Helpers/NavbarDropdownItems";
import DropdownMenu from "./Dropdown";

type Props = {};

const Navbar = ({}: Props) => {
  return (
    <div className="h-28 bg-emerald-400 flex flex-row">
      <h2>Culinary Companion</h2>
      <div>
        <DropdownMenu
          config={[
            {
              title: "recipes",
              subMenu: [
                {
                  title: "cuisine",
                  subMenu: [
                    {
                      title: "italian",
                      subMenu: [],
                    },
                    {
                      title: "asian",
                      subMenu: [],
                    },
                    {
                      title: "thai",
                      subMenu: [],
                    },
                    {
                      title: "greek",
                      subMenu: [],
                    },
                  ],
                },
                {
                  title: "Meat recipes",
                  subMenu: [
                    {
                      title: "pork",
                      subMenu: [],
                    },
                    {
                      title: "lamb",
                      subMenu: [],
                    },
                    {
                      title: "beef",
                      subMenu: [],
                    },
                  ],
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Navbar;

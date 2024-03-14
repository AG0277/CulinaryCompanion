import React, { useRef, useState } from "react";
import "./Dropdown.css";
import { Link } from "react-router-dom";

interface MenuItem {
  title: string;
  subMenu: MenuItem[];
}

interface Props {
  config: MenuItem[];
  subMenu?: boolean;
  parent: string;
}

const DropdownMenu: React.FC<Props> = ({ config, subMenu, parent }: Props) => {
  var lastIndex = false;
  var firstElementAndHasChildren = false;
  var hasNoParent = false;
  const options = config.map((item, i, index) => {
    if (config.length - 1 === i) {
      lastIndex = true;
    }
    if (parent === "" && item.subMenu.length === 0) {
      firstElementAndHasChildren = true;
    }
    if (parent === "") {
      hasNoParent = true;
    }
    if (item.subMenu.length > 0) {
      return (
        <li
          key={item.title}
          className={`bg-greenIsh has-submenu ${
            hasNoParent ? " rounded-t-2xl " : ""
          }${firstElementAndHasChildren ? "rounded-2xl " : ""}${
            lastIndex ? "rounded-b-2xl " : ""
          }`}
        >
          {item.title}
          <DropdownMenu parent={item.title} config={item.subMenu} />
        </li>
      );
    } else {
      return (
        <Link
          to={parent ? `/${item.title}` : `/${item.title}`}
          className="decoration-neutral-50 "
        >
          <li
            key={item.title}
            className={`bg-greenIsh has-submenu ${
              hasNoParent ? " rounded-t-2xl " : ""
            }${firstElementAndHasChildren ? "rounded-2xl " : ""}${
              lastIndex ? "rounded-b-2xl " : ""
            }`}
          >
            {item.title}
          </li>
        </Link>
      );
    }
  });

  return <ul className={subMenu ? "" : " dropdown-menu"}>{options}</ul>;
};

export default DropdownMenu;

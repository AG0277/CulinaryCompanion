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
  const options = config.map((item, index) => {
    if (item.subMenu.length > 0) {
      return (
        <li key={index} className="bg-greenIsh has-submenu">
          {item.title}
          <DropdownMenu parent={item.title} config={item.subMenu} />
        </li>
      );
    } else {
      return (
        <Link to={`/${parent}/${item.title}`} className="decoration-neutral-50">
          <li key={index} className="bg-greenIsh">
            {item.title}
          </li>
        </Link>
      );
    }
  });

  return <ul className={subMenu ? "" : "dropdown-menu "}>{options}</ul>;
};

export default DropdownMenu;

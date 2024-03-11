import React, { useState } from "react";
import "./Dropdown.css";

interface MenuItem {
  title: string;
  subMenu: MenuItem[];
}

interface Props {
  config: MenuItem[];
  subMenu?: boolean;
}

const DropdownMenu: React.FC<Props> = ({ config, subMenu }: Props) => {
  const options = config.map((item, index) => {
    if (item.subMenu.length > 0) {
      return (
        <li key={index} className="bg-emerald-400 has-submenu">
          {item.title}
          <DropdownMenu config={item.subMenu} />
        </li>
      );
    } else {
      return (
        <li key={index} className="bg-emerald-400">
          {item.title}
        </li>
      );
    }
  });

  return <ul className={subMenu ? "" : "dropdown-menu"}>{options}</ul>;
};

export default DropdownMenu;

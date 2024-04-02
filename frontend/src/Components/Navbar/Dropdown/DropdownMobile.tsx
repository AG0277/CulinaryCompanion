import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";

interface MenuItem {
  title: string;
  subMenu: MenuItem[];
  additionalQuery: string;
}

interface Props {
  config: MenuItem[];
  subMenu?: boolean;
  parent: string;
}

const DropdownMobile: React.FC<Props> = ({
  config,
  subMenu,
  parent,
}: Props) => {
  const [pressedStates, setPressedStates] = useState<boolean[]>(
    new Array(config.length).fill(false)
  );
  const togglePressed = (index: number) => {
    const updatedPressedStates = [...pressedStates];
    updatedPressedStates[index] = !updatedPressedStates[index];
    setPressedStates(updatedPressedStates);
  };

  const options = config.map((item, index) => {
    if (item.subMenu.length > 0) {
      return (
        <>
          {parent === "" && <hr className="my-5" />}
          <div className={parent ? "text-sm" : ""}>
            <div className="flex flex-col">
              <div className="flex justify-between" key={item.title}>
                <li className={`bg-greenIsh has-submenu text-white`}>
                  {item.title}
                </li>
                {!pressedStates[index] ? (
                  <FaPlus
                    onClick={() => togglePressed(index)}
                    className="text-lg mr-5"
                  />
                ) : (
                  <FaMinus
                    onClick={() => togglePressed(index)}
                    className="text-lg mr-5"
                  />
                )}
              </div>
              {pressedStates[index] && (
                <div
                  className="transition-opacity duration-300 ease-in-out opacity-300"
                  style={{ transitionProperty: "opacity" }}
                >
                  <DropdownMobile parent={item.title} config={item.subMenu} />
                </div>
              )}
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          {parent === "" && <hr className="my-5" />}
          <div className={parent ? "text-sm" : ""}>
            <Link
              key={item.title}
              to={`/${item.title}${
                item.additionalQuery ? "?" + item.additionalQuery : ""
              }`}
              className="decoration-neutral-50 text-white"
            >
              <li className={`bg-greenIsh has-submenu`}>{item.title}</li>
            </Link>
          </div>
        </>
      );
    }
  });

  return <ul className={subMenu ? "" : " dropdown-menu my-5"}>{options}</ul>;
};

export default DropdownMobile;

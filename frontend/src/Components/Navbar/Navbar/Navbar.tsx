import React, { useEffect, useState } from "react";

import NavbarMobile from "./NavbarMobile";
import NavbarDesktop from "./NavbarDesktop";

type Props = {};

const Navbar = (props: Props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);
  return <> {windowWidth < 1000 ? <NavbarMobile /> : <NavbarDesktop />}</>;
};

export default Navbar;

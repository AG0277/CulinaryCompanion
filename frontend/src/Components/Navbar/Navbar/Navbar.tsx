import React, { useEffect, useState } from "react";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

type Props = {};

const Navbar = (props: Props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Function to update window width on resize
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  //   useEffect(() => {
  //     window.addEventListener("resize", updateWindowWidth);
  //     return () => {
  //       window.removeEventListener("resize", updateWindowWidth);
  //     };
  //   }, []);
  return <> {600 < 1000 ? <NavbarMobile /> : <NavbarDesktop />}</>;
};

export default Navbar;

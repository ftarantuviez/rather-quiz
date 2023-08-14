import React, { ReactNode } from "react";
import { NavBar } from "./Navbar";

type LayoutProps = {
  children?: ReactNode;
};
const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;

import {ILayoutProps} from "@/types/common";

import React from 'react';
import Header from "@/components/modules/Header/Header";
import Footer from "@/components/modules/Footer/Footer";

const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;

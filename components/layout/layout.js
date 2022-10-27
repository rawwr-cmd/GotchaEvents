import { Fragment } from "react";
import MainHeader from "./main-header";

const Layout = (props) => {
  return (
    <Fragment>
      {/* {header goes here} */}
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;

import { Outlet } from "react-router-dom";
import HeaderContainer from "../header/HeaderContainer";

const AnonContainer = () => {
  return (
    <>
      <HeaderContainer />
      <Outlet />
    </>
  );
};

export default AnonContainer;

import { Link, Outlet } from "react-router-dom";

import { ReactComponent as NullLogo } from "../../assets/skull-solid.svg";

import "./navigation.styles.scss";

const Navigation = () => {
  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <NullLogo
            className="logo"
            style={{ width: "30px", height: "30px" }}
          />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          <Link className="nav-link" to="/sign-in">
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
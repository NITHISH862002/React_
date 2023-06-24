import React, { Fragment } from "react";
import mealsImage from "../../asserts/foodmain.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Pasikudhu</h1>
        <HeaderCartButton onClick={props.onShowcart} />
      </header>

      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="a table of foods" />
      </div>
    </Fragment>
  );
};

export default Header;

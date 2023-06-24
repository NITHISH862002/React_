import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/cartIcon";
import classess from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
const HeaderCartButton = (props) => {
  const [btnIshighleted, setbtnIsHighleted] = useState(false);
  const cartCtx = useContext(CartContext);
  const numberofItemsinCart = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);
  const buttonClasses = `${classess.button} ${
    btnIshighleted ? classess.bump : ""
  }`;
  const { items } = cartCtx;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setbtnIsHighleted(true);
    const timer = setTimeout(() => {
      setbtnIsHighleted(false);
    }, 400);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classess.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classess.badge}>{numberofItemsinCart}</span>
    </button>
  );
};
export default HeaderCartButton;

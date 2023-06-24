import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import Classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };
  const submitOrderHandler = async (userData) => {
    setIsSubmiting(true);
    await fetch(
      "https://react-backend-c1835-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
      }
    );
    setIsSubmiting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const modalActions = (
    <div className={Classes.actions}>
      <button className={Classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={Classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartitems = (
    <ul className={Classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <li>
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        </li>
      ))}
    </ul>
  );
  console.log(cartitems);
  const cartModelContent = (
    <React.Fragment>
      {cartitems}
      <div className={Classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );
  const isSubmitingModalContant = <p>Sending Order data.......</p>;
  const didSubmitModalContant = (
    <>
      <p>Successfully sent the order</p>
      <div className={Classes.actions}>
        <button className={Classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isSubmiting && !didSubmit && cartModelContent}
      {isSubmiting && isSubmitingModalContant}
      {!isSubmiting && didSubmit && didSubmitModalContant}
    </Modal>
  );
};
export default Cart;

import Classes from "./MealItem.module.css";
import MealitemForm from "./MealitemForm";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";
const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id, 
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className={Classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={Classes.description}>{props.description}</div>
        <div className={Classes.price}>{price}</div>
      </div>
      <div>
        <MealitemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};
export default MealItem;

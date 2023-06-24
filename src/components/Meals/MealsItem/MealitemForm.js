import Classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";
const MealitemForm = (props) => {
  const [amountISvalid, setAmount] = useState(true);
  const amountInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    console.log(enteredAmount);
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmount(false);
      return; 
    }
    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={Classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+</button>
      {!amountISvalid && <p>Please enter amount(1-5).</p>}
    </form>
  );
};
export default MealitemForm;

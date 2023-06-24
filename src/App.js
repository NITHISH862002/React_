import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";
function App() {
  const [cartIsShown, setcartIsShown] = useState(false);

  const showcart = () => {
    setcartIsShown(true);
  };
  const hidecart = () => {
    setcartIsShown(false);
  };
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hidecart} />}
      <Header onShowcart={showcart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;

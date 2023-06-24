import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealsItem from "./MealsItem/MealsItem";
import { ThreeDots } from "react-loader-spinner";
import { useState,useEffect } from "react";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => { 
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-backend-c1835-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!!!");
      }
      const responsedata = await response.json();
      const loadedMeals = [];
      for (const key in responsedata) {
        loadedMeals.push({
          id: key,
          name: responsedata[key].name,
          description: responsedata[key].description,
          price: responsedata[key].price,
        });
      }
      console.log(responsedata);
      console.log(loadedMeals);

      setMeals(loadedMeals);
      setLoading(false);
    };

    fetchMeals().catch((error) => {
      setLoading(false);
      setHttpError(error.message);
    });
  }, []);

    if (isLoading) {
    // return (
    //   <section className={classes.mealsLoading}>
    //     <p>Loading....</p>
    //   </section>
    // );

    return (
      <ThreeDots
        height="90"
        width="80"
        radius="9"
        color="White"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ paddingLeft: "45em" }}
        wrapperClassName=""
        visible={true}
      />
    );
  }

  if (httpError) {
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <li>
      <MealsItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    </li>
  ));
  return (
    <section className={classes.meals}>
      <Card>
        {" "}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;

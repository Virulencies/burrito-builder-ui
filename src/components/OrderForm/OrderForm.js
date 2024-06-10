import { useState } from "react";
import { postOrder } from "../../apiCalls";

function OrderForm({ addNewOrder }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    if (name && ingredients.length) {
      postOrder({ name, ingredients })
        .then((newOrder) => {
          addNewOrder(newOrder);
          clearInputs();
        })
        .catch((err) => console.error("Error posting:", err));
    }
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  }

  function handleIngredientClick(e, ingredient) {
    e.preventDefault();
    console.log("Ingredient clicked:", ingredient);
    setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];
  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        onClick={(e) => handleIngredientClick(e, ingredient)}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={handleNameChange}
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button onClick={(e) => handleSubmit(e)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;

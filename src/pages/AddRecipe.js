import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe } from "../store/User/actions";

export default function AddRecipe() {
  const [title, setTitle] = useState();
  const [imageURL, setImageURL] = useState();
  const [description, setDescription] = useState();
  const [ingredients, setIngredients] = useState();
  const [method, setMethod] = useState();
  const [cookingTime, setCookingTime] = useState();
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  function submitForm(e) {
    e.preventDefault();
    setSubmitted(true);
    dispatch(
      addRecipe(title, imageURL, description, ingredients, method, cookingTime)
    );
    console.log(
      "new recipe",
      title,
      imageURL,
      description,
      ingredients,
      method,
      cookingTime
    );
  }

  return (
    <div>
      <h1>Add your recipe</h1>
      <form>
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
        Image URL
        <input
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        ></input>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        Ingredients
        <input
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        ></input>
        Method
        <textarea
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        ></textarea>
        Cooking time
        <input
          value={cookingTime}
          onChange={(e) => setCookingTime(e.target.value)}
        ></input>
      </form>
      <button onClick={submitForm}>Post recipe</button>
    </div>
  );
}

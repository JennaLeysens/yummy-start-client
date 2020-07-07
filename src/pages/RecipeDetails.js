import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOneRecipe, addLike } from "../store/RecipeDetails/actions";
import { selectRecipe } from "../store/RecipeDetails/selectors";

export default function RecipeDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector(selectRecipe);
  console.log("one recipe", recipe);

  useEffect(() => {
    dispatch(fetchOneRecipe(id));
  }, [dispatch, id]);

  return (
    <div>
      <h2>{recipe.title}</h2>
      {recipe.tags
        ? recipe.tags.map((tag) => {
            return <button>{tag.title}</button>;
          })
        : null}
      <p>{recipe.description}</p>
      <img alt="recipe" height="500px" src={recipe.imageURL} />
      <p>
        <strong>Whipped up by:</strong> {recipe.user ? recipe.user.name : null}{" "}
        <button onClick={() => dispatch(addLike())}>
          <span role="img" aria-label="heart">
            🤍
          </span>
          {recipe.likes}
        </button>
      </p>
      <p>
        <span role="img" aria-label="clock">
          🕐
        </span>
        <span class="icon icon-clock"></span>
        {recipe.cookingTime} minutes
      </p>
      <p>
        <strong>Servings: </strong>
        {recipe.servings}
      </p>
      <p>
        <strong>Ingredients</strong>
      </p>
      {recipe.ingredients
        ? recipe.ingredients.map((ingredient) => {
            return <li>{ingredient}</li>;
          })
        : null}
      <p>
        <strong>Method</strong>
      </p>
      {recipe.method
        ? recipe.method.split(".").map((method) => {
            return <li>{method}</li>; ///,|\./
          })
        : null}
    </div>
  );
}

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../store/recipes/actions";
import { selectRecipes } from "../store/recipes/selectors";

export default function Recipes() {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  console.log("all recipes", recipes);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map((recipe, i) => {
        return (
          <div>
            {recipe.title}{" "}
            <img key={i} alt="recipe" height="300px" src={recipe.imageURL} />
          </div>
        );
      })}
    </div>
  );
}

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../store/recipes/actions";
import { selectRecipes } from "../store/recipes/selectors";
import "./Recipes.css";

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
      <div className="container">
        {recipes.map((recipe, i) => {
          return (
            <div className="recipe">
              <img key={i} alt="recipe" height="250px" src={recipe.imageURL} />{" "}
              <div className="overlay">
                <strong>{recipe.title}</strong>
              </div>
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOneRecipe } from "../store/RecipeDetails/actions";
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
      <p>{recipe.description}</p>
      <img alt="recipe" height="500px" src={recipe.imageURL} />
      <p>
        Whipped up by: {recipe.user ? recipe.user.name : null}
        <span role="img" aria-label="heart">
          🤍
        </span>
        {recipe.likes}
      </p>

      <p>{recipe.ingredients}</p>
      <p>{recipe.method}</p>
    </div>
  );
}

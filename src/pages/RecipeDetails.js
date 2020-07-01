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

  return <div>{recipe.title}</div>;
}

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRecipes } from "../store/Recipes/actions";
import { selectRecipes } from "../store/Recipes/selectors";
import { fetchTags } from "../store/Tags/actions";
import { selectTags } from "../store/Tags/selectors";
import "./Recipes.css";

export default function Recipes() {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  console.log("all recipes", recipes);
  const tags = useSelector(selectTags);

  const allTags = recipes
    ? recipes.map((rec) => {
        return rec.tags;
      })
    : null;

  console.log(allTags.flat());
  // const recTags = newArray.map((tag) => {
  //   return tag.title;
  // });
  // console.log("grdfdfd", recTags);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <div>
      <h1>Recipes</h1>
      {tags
        ? tags.map((tag) => {
            return <button>{tag.title}</button>;
          })
        : null}
      <div className="container">
        {recipes.map((recipe, i) => {
          return (
            <div className="recipe">
              <Link to={`/recipes/${recipe.id}`}>
                <img
                  key={i}
                  alt="recipe"
                  height="250px"
                  src={recipe.imageURL}
                />
              </Link>
              <div>
                <strong>{recipe.title}</strong>
                {recipe.tags.map((tag) => {
                  return <button>{tag.title}</button>;
                })}
                <p>Whipped up by: {recipe.user.name}</p>
                <span role="img" aria-label="heart">
                  🤍
                </span>
                {recipe.likes}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

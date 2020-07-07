import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/User/selectors";
import { selectRecipes } from "../store/Recipes/selectors";
import { fetchRecipes } from "../store/Recipes/actions";
import { Link } from "react-router-dom";
import { Heading } from "@chakra-ui/core";

export default function UserProfile() {
  const user = useSelector(selectUser);
  console.log(user);

  const userFavs = user.userFavourites
    ? user.userFavourites.map((recipe) => {
        return recipe.recipeId;
      })
    : null;
  console.log("favs", userFavs);

  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  console.log("recipes", recipes);

  const filteredRecipes = userFavs
    ? recipes.filter((recipe) => userFavs.includes(recipe.id))
    : null;

  console.log("recipes?????", filteredRecipes);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <div>
      <h1>{user.name}'s Kitchen</h1>
      <Heading>My favourite recipes</Heading>
      <div className="container">
        {filteredRecipes
          ? filteredRecipes.map((recipe, i) => {
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
                    <p>
                      <strong>Whipped up by:</strong> {recipe.user.name}
                    </p>
                    <span role="img" aria-label="heart">
                      🤍
                    </span>
                    {recipe.likes}
                    <p>
                      <strong>Cooking time:</strong> {recipe.cookingTime}
                    </p>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

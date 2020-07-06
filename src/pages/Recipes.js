import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRecipes } from "../store/Recipes/actions";
import { selectRecipes } from "../store/Recipes/selectors";
import { fetchTags } from "../store/Tags/actions";
import { selectTags } from "../store/Tags/selectors";
import "./Recipes.css";
import { selectToken } from "../store/User/selectors";
import { selectUser } from "../store/User/selectors";
import { addToFavourites, deleteFavourite } from "../store/User/actions";

export default function Recipes() {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  console.log("all recipes", recipes);
  const tags = useSelector(selectTags);
  const [sortLikes, setSortLikes] = useState();
  const [selectedTag, setSelectedTag] = useState();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const [search, setSearch] = useState();

  const compareLikes = (recipeA, recipeB) => {
    return recipeB.likes - recipeA.likes;
  };

  // // const sortedProducts = recipes.sort(compareLikes);
  // console.log("LLLL", sortedProducts);

  const allTags = recipes
    ? recipes.map((rec) => {
        return rec.tags;
      })
    : null;

  const filteredRecipes = selectedTag
    ? recipes.filter((recipe) =>
        recipe.tags.some((tag) => tag.id === selectedTag.id)
      )
    : recipes;

  const ingredients = recipes
    ? recipes.map((recipe) => {
        return recipe.ingredients;
      })
    : null;

  const allIngredients = ingredients.flat();
  const joined = allIngredients.join();

  const filterIngredient = joined.includes(search);

  const searched = filterIngredient
    ? filteredRecipes.filter((recipe) =>
        recipe.ingredients.some((ingredient) => ingredient.includes(search))
      )
    : filteredRecipes;

  console.log("FAAAAVS", user.favourites);
  const userFavs = user.favourites
    ? user.favourites.map((recipe) => {
        return recipe.recipeId;
      })
    : [];

  const checkFav = (recipe) => {
    if (userFavs.includes(recipe.id)) {
      return "🍩";
    } else {
      return "🥦";
    }
  };

  const favsIds = user.favourites
    ? user.favourites.map((favourite) => {
        return favourite.id;
      })
    : [];
  console.log("FAV ids", favsIds);

  function favClicked(recipeId, fav) {
    console.log(recipeId);
    if (fav) {
      dispatch(deleteFavourite(fav.id));
    } else {
      dispatch(addToFavourites(recipeId));
    }
  }

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <div>
      <h1>Recipes</h1>
      <button onClick={() => setSelectedTag(null)}>All recipes</button>
      {tags
        ? tags.map((tag) => {
            return (
              <button onClick={() => setSelectedTag(tag)}>{tag.title}</button>
            );
          })
        : null}
      <select
        onChange={(event) =>
          setSortLikes(filteredRecipes.sort(compareLikes), console.log(event))
        }
      >
        <option>Sort by</option>
        <option value={sortLikes}>Most popular</option>
      </select>
      <input
        type="text"
        placeholder="Search by ingredient"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <div className="container">
        {searched.map((recipe, i) => {
          return (
            <div className="recipe">
              <div>
                {token ? (
                  <button
                    className="button"
                    onClick={() =>
                      favClicked(
                        recipe.id,
                        user.favourites.find(
                          (favourite) => favourite.recipeId === recipe.id
                        )
                      )
                    }
                  >
                    {checkFav(recipe)}
                  </button>
                ) : null}
              </div>
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
        })}
      </div>
    </div>
  );
}

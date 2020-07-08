import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/User/selectors";
import { selectRecipes } from "../store/Recipes/selectors";
import { fetchRecipes } from "../store/Recipes/actions";
import { Link } from "react-router-dom";
import { Heading } from "@chakra-ui/core";
import { Stack, Tag, Image, Box } from "@chakra-ui/core";
import moment from "moment";
import "./UserProfile.css";

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
    <Box>
      <Heading className="heading" as="h1" size="2xl">
        {user.name}'s Kitchen
      </Heading>
      <Heading as="h2" size="xl">
        About
      </Heading>
      <Image
        src={user.imageurl}
        rounded="full"
        size="150px"
        objectFit="cover"
        fallbackSrc="https://cdn.pixabay.com/photo/2014/04/03/00/42/chef-hat-309146_1280.png"
        border="1px"
      ></Image>
      <Heading>
        My favourite recipes ({filteredRecipes ? filteredRecipes.length : 0})
      </Heading>
      <Box className="container">
        {filteredRecipes
          ? filteredRecipes.map((recipe, i) => {
              return (
                <Box className="recipe">
                  <Link to={`/recipes/${recipe.id}`}>
                    <Image
                      key={i}
                      alt="recipe"
                      height="250px"
                      src={recipe.imageURL}
                    ></Image>
                  </Link>
                  <Box>
                    <strong>{recipe.title}</strong>
                    <Stack spacing={1} isInline>
                      {recipe.tags.map((tag) => {
                        return <Tag size="sm">{tag.title}</Tag>;
                      })}
                    </Stack>
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
                    <strong>Added: </strong>
                    {moment(recipe.createdAt).format("D MMMM YYYY")}
                  </Box>
                </Box>
              );
            })
          : null}
      </Box>
    </Box>
  );
}

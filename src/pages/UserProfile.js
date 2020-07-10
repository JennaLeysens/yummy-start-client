import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../store/User/selectors";
import { selectUser } from "../store/User/selectors";
import { selectRecipes } from "../store/Recipes/selectors";
import { fetchRecipes } from "../store/Recipes/actions";
import { addToFavourites, deleteFavourite } from "../store/User/actions";
import { Link } from "react-router-dom";
import { Heading } from "@chakra-ui/core";
import { Stack, Tag, Image, Box, Button } from "@chakra-ui/core";
import "./UserProfile.css";

export default function UserProfile() {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const userFavs = user.userFavourites
    ? user.userFavourites.map((recipe) => {
        return recipe.recipeId;
      })
    : null;
  console.log("favs", userFavs);

  const checkFav = (recipe) => {
    if (userFavs.includes(recipe.id)) {
      return "🍩";
    } else {
      return "🥦";
    }
  };

  function favClicked(recipeId, fav) {
    console.log(recipeId);
    if (fav) {
      dispatch(deleteFavourite(fav.id));
    } else {
      dispatch(addToFavourites(recipeId));
    }
  }

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
      <Box className="profile">
        <Heading fontWeight="thin" as="h2" size="xl" padding={2}>
          {user.name}'s Kitchen
        </Heading>
        <Box>
          <Heading fontWeight="thin" as="h3" size="lg" p={4}>
            About
          </Heading>
          <Image
            src={user.imageurl}
            rounded="full"
            size="150px"
            objectFit="cover"
            fallbackSrc="https://cdn.pixabay.com/photo/2014/04/03/00/42/chef-hat-309146_1280.png"
            display="inline-block"
            border="1px"
            borderColor="lightgray"
          ></Image>
          <Heading fontWeight="thin" as="h4" size="md" p={5}>
            Name: {user.name}{" "}
          </Heading>
        </Box>
      </Box>
      <Heading
        className="heading"
        fontWeight="thin"
        as="h2"
        size="xl"
        padding={2}
      >
        My favourite recipes ({filteredRecipes ? filteredRecipes.length : 0})
      </Heading>
      <Box className="container">
        {filteredRecipes
          ? filteredRecipes.map((recipe, i) => {
              return (
                <Link to={`/recipes/${recipe.id}`}>
                  <Box className="recipeCard">
                    <Box>
                      {" "}
                      <Heading
                        padding="8px"
                        fontWeight="thin"
                        as="h2"
                        size="md"
                      >
                        {recipe.title}{" "}
                      </Heading>{" "}
                    </Box>
                    <center>
                      <Image
                        key={i}
                        alt="recipe"
                        height="350px"
                        objectFit="cover"
                        src={recipe.imageURL}
                      />
                    </center>
                    {token ? (
                      <Box padding="5px">
                        <Button
                          className="favButton"
                          variantColor="gray"
                          rounded="140%"
                          variant="outline"
                          onClick={() =>
                            favClicked(
                              recipe.id,
                              user.userFavourites.find(
                                (favourite) => favourite.recipeId === recipe.id
                              )
                            )
                          }
                        >
                          {checkFav(recipe)}
                        </Button>{" "}
                        <span role="img" aria-label="heart">
                          🤍
                        </span>
                        {recipe.likes}
                      </Box>
                    ) : null}{" "}
                    <Box>
                      <Stack
                        padding="4px"
                        fontFamily="playright script"
                        spacing={1}
                        isInline
                      >
                        {recipe.tags.map((tag) => {
                          return <Tag fontSize="12px">{tag.title}</Tag>;
                        })}{" "}
                      </Stack>
                    </Box>{" "}
                    <Box>
                      <Heading
                        fontWeight="thin"
                        as="h5"
                        size="s"
                        paddingTop="5px"
                      >
                        Whipped up by: {recipe.user.name}
                      </Heading>
                      <Heading
                        fontWeight="thin"
                        as="h5"
                        size="s"
                        paddingTop="5px"
                      >
                        <span role="img" aria-label="clock">
                          🕐
                        </span>{" "}
                        {recipe.cookingTime} minutes{" "}
                      </Heading>
                      <Heading
                        fontWeight="thin"
                        as="h5"
                        size="s"
                        paddingTop="5px"
                      >
                        Servings:
                        {recipe.servings}
                      </Heading>
                    </Box>
                  </Box>
                </Link>
              );
            })
          : null}
      </Box>
    </Box>
  );
}

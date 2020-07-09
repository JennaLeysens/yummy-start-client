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
import {
  Stack,
  Tag,
  Heading,
  Select,
  Input,
  InputGroup,
  InputLeftAddon,
  Icon,
  Button,
  Box,
  Image,
  Text,
} from "@chakra-ui/core";

export default function Recipes() {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  console.log("all recipes", recipes);
  const tags = useSelector(selectTags);
  const [sortLikes, setSortLikes] = useState();
  const [sortCookingTime, setSortCookingTime] = useState();
  const [selectedTag, setSelectedTag] = useState();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const [search, setSearch] = useState();

  const compareLikes = (recipeA, recipeB) => {
    return recipeB.likes - recipeA.likes;
  };
  const compareCookingTime = (recipeA, recipeB) => {
    return recipeA.cookingTime - recipeB.cookingTime;
  };

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

  console.log("FAAAAVS", user.userFavourites);
  const userFavs = user.userFavourites
    ? user.userFavourites.map((recipe) => {
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

  const favsIds = user.userFavourites
    ? user.userFavourites.map((favourite) => {
        return favourite.id;
      })
    : [];

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
    <Box>
      <Heading fontWeight="thin" className="recipesheading" as="h1" size="2xl">
        Recipes
      </Heading>
      <Stack fontFamily="playright script" fontSize="md" spacing={2} isInline>
        <Tag className="tags" size="md" onClick={() => setSelectedTag(null)}>
          All recipes
        </Tag>
        {tags
          ? tags.map((tag) => {
              return (
                <Tag
                  className="tags"
                  size="md"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag.title}
                </Tag>
              );
            })
          : null}
        <Stack className="select">
          <Select
            focusBorderColor="darkgray"
            placeholder="Sort by"
            width="80%"
            fontFamily="playright script"
            onChange={(event) =>
              event.target.value === "Most popular"
                ? setSortLikes(
                    filteredRecipes.sort(compareLikes),
                    console.log(event.target)
                  )
                : setSortCookingTime(filteredRecipes.sort(compareCookingTime))
            }
          >
            <option value={sortLikes}>Most popular</option>
            <option value={sortCookingTime}>Cooking Time (short - long</option>
          </Select>
        </Stack>
        <Stack>
          <InputGroup>
            <InputLeftAddon bg="white" children={<Icon name="search"></Icon>} />
            <Input
              focusBorderColor="darkgray"
              type="text"
              variant="outline"
              width="160%"
              placeholder="Search by ingredient"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></Input>
          </InputGroup>
        </Stack>
      </Stack>
      <Box className="container">
        {searched.map((recipe, i) => {
          return (
            <Link to={`/recipes/${recipe.id}`}>
              <Box className="recipeCard">
                <Box>
                  {" "}
                  <Heading padding="8px" fontWeight="thin" as="h2" size="md">
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
                  <Heading fontWeight="thin" as="h5" size="s" paddingTop="5px">
                    Whipped up by: {recipe.user.name}
                  </Heading>
                  <Heading fontWeight="thin" as="h5" size="s" paddingTop="5px">
                    <span role="img" aria-label="clock">
                      🕐
                    </span>{" "}
                    {recipe.cookingTime} minutes{" "}
                  </Heading>
                  <Heading fontWeight="thin" as="h5" size="s" paddingTop="5px">
                    Servings:
                    {recipe.servings}
                  </Heading>
                </Box>
              </Box>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
}

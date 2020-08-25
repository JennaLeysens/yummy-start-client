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
  Avatar,
  Image,
} from "@chakra-ui/core";
import { fetchPhotos } from "../config/CloudinaryService";
import { CloudinaryContext } from "cloudinary-react";

export default function Recipes() {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const tags = useSelector(selectTags);
  const [sortLikes, setSortLikes] = useState();
  const [sortCookingTime, setSortCookingTime] = useState();
  const [selectedTag, setSelectedTag] = useState();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const [search, setSearch] = useState([]);
  const [, setImages] = useState([]);

  useEffect(() => {
    fetchPhotos("image", setImages);
  }, []);

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
        recipe.ingredients.some((ingredient) =>
          ingredient ? ingredient.includes(search) : null
        )
      )
    : filteredRecipes;
  console.log("s", searched);

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

  function favClicked(recipeId, fav) {
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
      <CloudinaryContext cloudName="yummystart">
        <div className="App"></div>
      </CloudinaryContext>
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
                ? setSortLikes(filteredRecipes.sort(compareLikes))
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
        {search && filterIngredient ? (
          searched.map((recipe, i) => {
            return (
              <Box className="recipeCard">
                <Link to={`/recipes/${recipe.id}`}>
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
                      h={360}
                      w={300}
                      objectFit="cover"
                      src={recipe.imageURL}
                    />
                  </center>
                </Link>
                <Box p={2}>
                  {token ? (
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
                    </Button>
                  ) : null}{" "}
                  <span role="img" aria-label="heart">
                    🤍
                  </span>{" "}
                  {recipe.likes}
                </Box>
                <Link to={`/recipes/${recipe.id}`}>
                  <Box>
                    <Stack
                      padding="3px"
                      fontFamily="playright script"
                      s={1}
                      isInline
                      display="inline-flex"
                    >
                      {recipe.tags.map((tag) => {
                        return <Tag fontSize="10px">{tag.title}</Tag>;
                      })}{" "}
                    </Stack>
                  </Box>{" "}
                  <Box>
                    <Heading
                      fontWeight="thin"
                      as="h5"
                      size="s"
                      paddingTop="5px"
                      paddingBottom="5px"
                    >
                      Whipped up by: {recipe.user.name}{" "}
                      <Avatar src={recipe.user.imageurl} size="2xs"></Avatar>
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
                      Servings: {recipe.servings}
                    </Heading>
                  </Box>
                </Link>
              </Box>
            );
          })
        ) : (
          <Heading>No recipes found</Heading>
        )}
      </Box>
    </Box>
  );
}

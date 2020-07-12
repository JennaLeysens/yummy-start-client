import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOneRecipe, addLike } from "../store/RecipeDetails/actions";
import { selectRecipe } from "../store/RecipeDetails/selectors";
import { selectToken, selectUser } from "../store/User/selectors";
import {
  addToFavourites,
  deleteFavourite,
  deleteRecipe,
} from "../store/User/actions";
import {
  Stack,
  Tag,
  Heading,
  Box,
  Image,
  Text,
  Button,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Link,
} from "@chakra-ui/core";
import "./RecipeDetails.css";

export default function RecipeDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector(selectRecipe);
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const [recipeDeleted, setRecipeDeleted] = useState();

  useEffect(() => {
    dispatch(fetchOneRecipe(id));
  }, [dispatch, id]);

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
    console.log(recipeId);
    if (fav) {
      dispatch(deleteFavourite(fav.id));
    } else {
      dispatch(addToFavourites(recipeId));
    }
  }

  function deleteARecipe(e) {
    e.preventDefault();
    setRecipeDeleted(true);
    dispatch(deleteRecipe(recipe.id));
  }

  return (
    <Box>
      {recipeDeleted ? (
        <Box>
          <Alert
            paddingTop={45}
            paddingBottom={5}
            fontFamily="Cormorant Garamond"
            backgroundColor="white"
            status="success"
            variant="subtle"
            flexDirection="column"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon size="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Recipe deleted
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              We're sorry to see your recipe leave the kitchen.
            </AlertDescription>
          </Alert>
          <Box className="linkbox">
            <Text p={4}>
              <Link href="/myprofile">
                <Heading as="h3" size="lg">
                  Go back to profile
                </Heading>
              </Link>
            </Text>
          </Box>
        </Box>
      ) : (
        <Flex className="recipeDetailsCard">
          <Box w="40%" className="imageBox">
            <Stack
              padding="8px"
              fontFamily="playright script"
              fontSize="md"
              spacing={2}
              isInline
            >
              {recipe.tags
                ? recipe.tags.map((tag) => {
                    return <Tag size="md">{tag.title}</Tag>;
                  })
                : null}{" "}
              <Button
                className="likeButton"
                bg="white"
                onClick={() => dispatch(addLike())}
              >
                <span role="img" aria-label="heart">
                  🤍
                </span>{" "}
                {recipe.likes}
              </Button>
            </Stack>

            <Box className="imageContainer">
              <Image
                alt="recipe"
                width="90%"
                src={recipe.imageURL}
                align="center"
              />
            </Box>

            <Text className="text"></Text>
          </Box>
          <Box className="recipeText" mt="45px">
            <Heading fontWeight="thin" as="h2" size="xl">
              {recipe.title}{" "}
              {token ? (
                <Button
                  className="favButton"
                  variantColor="gray"
                  rounded="120%"
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
              ) : null}
            </Heading>{" "}
            <Text className="text">
              <Heading as="h4" size="md">
                Whipped up by: {recipe.user ? recipe.user.name : null}
              </Heading>
            </Text>
            <Text className="text">{recipe.description}</Text>{" "}
            <Text className="text">
              <Heading as="h4" size="md">
                <span role="img" aria-label="clock">
                  🕐
                </span>{" "}
                {recipe.cookingTime} minutes
              </Heading>
              <Heading className="text" as="h4" size="md">
                Servings: {recipe.servings}
              </Heading>
            </Text>
            <Text className="text">
              <Heading as="h4" size="md">
                Ingredients
              </Heading>
              {recipe.ingredients
                ? recipe.ingredients.map((ingredient) => {
                    if (ingredient) {
                      return <li>{ingredient}</li>;
                    }
                  })
                : null}
            </Text>
            <Box>
              <Text className="text">
                <Heading as="h4" size="md">
                  Method
                </Heading>
                {recipe.method
                  ? recipe.method.split(".").map((method) => {
                      if (method) {
                        return <li>{method}</li>;
                      }
                    })
                  : null}
              </Text>
              {user.id === recipe.userId ? (
                <Button marginTop={5} onClick={deleteARecipe}>
                  Delete recipe
                </Button>
              ) : null}
            </Box>
          </Box>
        </Flex>
      )}
    </Box>
  );
}

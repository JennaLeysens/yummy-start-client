import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe } from "../store/User/actions";
import { selectToken } from "../store/User/selectors";
import { selectTags } from "../store/Tags/selectors";
import { fetchTags } from "../store/Tags/actions";
import { useHistory } from "react-router-dom";
import {
  Input,
  Button,
  FormLabel,
  FormControl,
  Heading,
  Box,
  Textarea,
  Select,
  Checkbox,
  Image,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Link,
  Text,
  useToast,
} from "@chakra-ui/core";
import "./AddRecipe.css";

export default function AddRecipe() {
  const [title, setTitle] = useState();
  const [imageURL, setImageURL] = useState();
  const [description, setDescription] = useState();
  const [ingredient1, setIngredient1] = useState();
  const [ingredient2, setIngredient2] = useState();
  const [ingredient3, setIngredient3] = useState();
  const [ingredient4, setIngredient4] = useState();
  const [ingredient5, setIngredient5] = useState();
  const [recipeTags, setRecipeTags] = useState([]);
  const [method, setMethod] = useState();
  const [cookingTime, setCookingTime] = useState();
  const [servings, setServings] = useState();
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();
  const tags = useSelector(selectTags);
  const toast = useToast();

  if (!token) {
    history.push("/login");
  }

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  function editTags(tagId) {
    if (recipeTags.includes(tagId)) {
      const newTags = recipeTags.filter((id) => {
        console.log(id, tagId);
        return !(id === tagId);
      });
      setRecipeTags(newTags);
    } else {
      const newTags = [...recipeTags, tagId];
      setRecipeTags(newTags);
    }
  }

  const ingredients = [
    ingredient1,
    ingredient2,
    ingredient3,
    ingredient4,
    ingredient5,
  ];
  console.log(recipeTags);
  const tagIds = recipeTags;
  function submitForm(e) {
    e.preventDefault();
    setSubmitted(true);
    dispatch(
      addRecipe(
        title,
        imageURL,
        description,
        ingredients,
        method,
        cookingTime,
        tagIds,
        servings
      )
    );
    console.log(
      "new recipe",
      title,
      imageURL,
      description,
      ingredients,
      method,
      cookingTime,
      servings,
      tagIds,
      servings
    );
  }

  function showToast() {
    return toast({
      title: "Oops! Something is burning!",
      description: "Please complete all the fields to post a recipe",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }

  return (
    <Box>
      {submitted ? (
        <Box>
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon size="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Recipe added!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Thank you for submitting your yummy recipe! See your recipe ready
              to be made on the recipes page
            </AlertDescription>
          </Alert>
          <Box className="linkbox">
            <Text>
              <Link href="/">
                <Heading as="h3" size="lg">
                  Go to recipes
                </Heading>
              </Link>
            </Text>
          </Box>
        </Box>
      ) : (
        <Box className="box">
          <Heading>Add your recipe</Heading>
          <FormControl className="form" isRequired>
            <FormLabel> Title </FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Input>
            <FormLabel> Image URL </FormLabel>
            <Input
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            ></Input>
            <Image src={imageURL} thumbnail width="50%" />
            <FormLabel> Description </FormLabel>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Input>
            <FormLabel>Ingredients</FormLabel>
            <Input
              placeholder="Ingredient 1"
              value={ingredient1}
              onChange={(e) => setIngredient1(e.target.value)}
            ></Input>
            <Input
              placeholder="Ingredient 2"
              value={ingredient2}
              onChange={(e) => setIngredient2(e.target.value)}
            ></Input>
            <Input
              placeholder="Ingredient 3"
              value={ingredient3}
              onChange={(e) => setIngredient3(e.target.value)}
            ></Input>
            <Input
              placeholder="Ingredient 4"
              value={ingredient4}
              onChange={(e) => setIngredient4(e.target.value)}
            ></Input>
            <Input
              placeholder="Ingredient 5"
              value={ingredient5}
              onChange={(e) => setIngredient5(e.target.value)}
            ></Input>
            <FormLabel>Method</FormLabel>
            <Textarea
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            ></Textarea>
            <FormLabel>Cooking time (minutes)</FormLabel>
            <Select
              placeholder="Select"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
            >
              <option>15 </option>
              <option>30 </option>
              <option>45 </option>
              <option>60 </option>
              <option>90 </option>
              <option>120 </option>
            </Select>
            <FormLabel>Servings</FormLabel>
            <Input
              value={servings}
              onChange={(e) => setServings(e.target.value)}
            ></Input>
            <FormLabel>Recipe tags</FormLabel>
            {tags
              ? tags.map((tag) => {
                  return (
                    <div>
                      <Checkbox
                        variantColor="gray"
                        type="checkbox"
                        value={recipeTags}
                        onChange={() => editTags(tag.id)}
                      >
                        {tag.title}
                      </Checkbox>
                    </div>
                  );
                })
              : null}
          </FormControl>
          <Button
            onClick={
              title &&
              imageURL &&
              description &&
              ingredients &&
              method &&
              cookingTime &&
              servings &&
              tagIds &&
              servings
                ? submitForm
                : showToast
            }
          >
            Post recipe
          </Button>
        </Box>
      )}
    </Box>
  );
}

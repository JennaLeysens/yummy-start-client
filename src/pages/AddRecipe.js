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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Link,
  Text,
  useToast,
  FormHelperText,
  Image,
} from "@chakra-ui/core";
import "./AddRecipe.css";
import addRecipeBackground from "../addRecipeBackground.png";
import { openUploadWidget } from "../config/CloudinaryService";

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
  const [images, setImages] = useState([]);

  const beginUpload = (tag) => {
    const uploadOptions = {
      cloudName: "yummystart",
      tags: [tag],
      uploadPreset: "upload",
    };

    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        if (photos.event === "success") {
          setImages([...images, photos.info.public_id]);
          setImageURL(photos.info.url);
        }
      } else {
        console.log(error);
      }
    });
  };

  if (!token) {
    history.push("/login");
  }

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  function editTags(tagId) {
    if (recipeTags.includes(tagId)) {
      const newTags = recipeTags.filter((id) => {
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
              Recipe added!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Thank you for submitting your yummy recipe! See your recipe ready
              to be made on the recipes page.
            </AlertDescription>
          </Alert>
          <Box className="linkbox">
            <Text p={4}>
              <Link href="/">
                <Heading as="h3" size="lg">
                  Go to recipes
                </Heading>
              </Link>
            </Text>
          </Box>
        </Box>
      ) : (
        <Box>
          <Heading
            position="relative"
            fontWeight="thin"
            as="h2"
            size="xl"
            padding="10px"
          >
            Add a recipe
          </Heading>
          <Image
            position="absolute"
            className="bg"
            src={addRecipeBackground}
          ></Image>
          <Box className="box" position="relative">
            <FormControl className="form" isRequired>
              <FormLabel p={3}> Title </FormLabel>
              <Input
                placeholder="e.g Seasoned roast vegetables"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Input>
              <FormLabel p={3}> Recipe photograph </FormLabel>
              <center>
                <Image
                  marginTop="5px"
                  src={imageURL}
                  fallbackSrc="https://icon-library.com/images/photo-placeholder-icon/photo-placeholder-icon-7.jpg"
                  width="180px"
                  marginBottom="15px"
                />
              </center>
              <div>
                <Button value={imageURL} onClick={() => beginUpload("image")}>
                  Upload Image
                </Button>
              </div>
              <FormLabel p={3}> Description </FormLabel>
              <Input
                placeholder="e.g. A healthy side dish"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Input>
              <FormLabel paddingTop={3}>Ingredients</FormLabel>
              <FormHelperText>
                Please include the measurement along with the ingredient (e.g 2
                x sweet potatoes/½ cup of flour)
              </FormHelperText>
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
              <FormLabel p={3}>Method</FormLabel>
              <Textarea
                placeholder="e.g. Blend the ingredients together. Pour into a 15x15 dish and bake for 20 minutes"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              ></Textarea>
              <FormLabel p={3}>Cooking time (minutes)</FormLabel>
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
              <FormLabel p={3}>Servings</FormLabel>
              <Input
                placeholder="e.g. 4"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
              ></Input>
              <FormLabel p={3}>Recipe tags</FormLabel>
              {tags
                ? tags.map((tag) => {
                    return (
                      <Box textAlign="left">
                        <Checkbox
                          textAlign="left"
                          variantColor="gray"
                          type="checkbox"
                          value={recipeTags}
                          onChange={() => editTags(tag.id)}
                        >
                          {tag.title}
                        </Checkbox>
                      </Box>
                    );
                  })
                : null}
            </FormControl>
            <Button
              marginTop={4}
              p={2}
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
        </Box>
      )}
    </Box>
  );
}

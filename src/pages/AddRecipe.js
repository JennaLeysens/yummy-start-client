import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe } from "../store/User/actions";
import { selectToken } from "../store/User/selectors";
import { selectTags } from "../store/Tags/selectors";
import { fetchTags } from "../store/Tags/actions";
import { useHistory } from "react-router-dom";

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
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();
  const tags = useSelector(selectTags);

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

  function submitForm(e) {
    const tagIds = recipeTags;
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
        tagIds
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
      tagIds
    );
  }

  return (
    <div>
      <h1>Add your recipe</h1>
      <form className="form">
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
        Image URL
        <input
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        ></input>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        Ingredients
        <input
          placeholder="Ingredient 1"
          value={ingredient1}
          onChange={(e) => setIngredient1(e.target.value)}
        ></input>
        <input
          placeholder="Ingredient 2"
          value={ingredient2}
          onChange={(e) => setIngredient2(e.target.value)}
        ></input>
        <input
          placeholder="Ingredient 3"
          value={ingredient3}
          onChange={(e) => setIngredient3(e.target.value)}
        ></input>
        <input
          placeholder="Ingredient 4"
          value={ingredient4}
          onChange={(e) => setIngredient4(e.target.value)}
        ></input>
        <input
          placeholder="Ingredient 5"
          value={ingredient5}
          onChange={(e) => setIngredient5(e.target.value)}
        ></input>
        Method
        <textarea
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        ></textarea>
        Cooking time (minutes)
        <select
          value={cookingTime}
          onChange={(e) => setCookingTime(e.target.value)}
        >
          <option>Select</option>
          <option>15</option>
          <option>30</option>
          <option>45</option>
          <option>60</option>
          <option>90</option>
          <option>120</option>
        </select>
        {tags
          ? tags.map((tag) => {
              return (
                <div>
                  <input
                    type="checkbox"
                    value={recipeTags}
                    onChange={() => editTags(tag.id)}
                  ></input>
                  <label>{tag.title}</label>
                </div>
              );
            })
          : null}
      </form>
      <button onClick={submitForm}>Post recipe</button>
    </div>
  );
}

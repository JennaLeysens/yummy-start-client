import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import fetchOneRecipe from "../store/RecipeDetails/actions";

export default function RecipeDetails() {
  const id = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOneRecipe(id));
  }, [dispatch, id]);

  return <div></div>;
}

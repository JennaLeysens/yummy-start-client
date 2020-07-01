import axios from "axios";
import { apiUrl } from "../../config/constants";

export function storeOneRecipe(data) {
  return { type: "FETCH_ONE_RECIPE", payload: data };
}

export function fetchOneRecipe(id) {
  return async (dispatch, getState) => {
    const oneResponse = await axios.get(`${apiUrl}/recipes/${id}`);
    console.log("one response", oneResponse.data);
    dispatch(storeOneRecipe(oneResponse.data));
  };
}

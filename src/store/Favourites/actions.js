import axios from "axios";
import { apiUrl } from "../../config/constants";

export function storeFavourites(data) {
  return { type: "FETCH_FAVOURITES", payload: data };
}

export function fetchFavourites() {
  return async (dispatch, getState) => {
    const response = await axios.get(`${apiUrl}/favourites`);
    console.log("favs", response.data);
    dispatch(storeFavourites(response.data));
  };
}

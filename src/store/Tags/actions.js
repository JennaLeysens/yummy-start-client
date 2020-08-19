import axios from "axios";
import { apiUrl } from "../../config/constants";

export function storeTags(data) {
  return { type: "FETCH_TAGS", payload: data };
}

export function fetchTags() {
  return async (dispatch, getState) => {
    const response = await axios.get(`${apiUrl}/tags`);

    dispatch(storeTags(response.data));
  };
}

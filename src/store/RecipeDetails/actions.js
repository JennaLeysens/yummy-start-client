import axios from "axios";
import { apiUrl } from "../../config/constants";

export function fetchOnePRecipee(id) {
  return async (dispatch, getState) => {
    const Oneresponse = await axios.get(`${apiUrl}/home/${id}`);
    console.log("one response", Oneresponse.data);
    dispatch(storeOnePage(Oneresponse.data));
  };
}

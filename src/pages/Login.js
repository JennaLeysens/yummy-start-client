import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/User/actions";
import { selectToken } from "../store/User/selectors";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  });

  function submitForm(e) {
    e.preventDefault();
    dispatch(login(email, password));
    setEmail("");
    setPassword("");
  }

  return (
    <div>
      <h1>Login</h1>
      <h3>If you want to post a recipe, please login </h3>
      <form>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
        Password
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </form>
      <button onClick={submitForm}>Login</button>
    </div>
  );
}

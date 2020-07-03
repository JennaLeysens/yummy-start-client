import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../store/User/actions";

export default function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  function submitForm() {
    dispatch(signUp(name, email, password));
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <div>
      <h1>Create an account to start sharing your recipes!</h1>
      <form>
        Name
        <input value={name} onChange={(e) => setName(e.target.value)}></input>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
        Password
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </form>
      <button onClick={submitForm}>Create account</button>
    </div>
  );
}

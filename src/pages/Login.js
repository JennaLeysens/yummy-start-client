import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/User/actions";
import { Link } from "react-router-dom";
import { selectToken } from "../store/User/selectors";
import { useHistory } from "react-router-dom";
import {
  Input,
  Button,
  FormLabel,
  FormControl,
  Heading,
  Box,
} from "@chakra-ui/core";
import "./forms.css";

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
    <Box className="box">
      <Heading>Login</Heading>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input
          variant="outline"
          placeholder="Email address"
          size="lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormLabel>Password</FormLabel>
        <Input
          variant="outline"
          placeholder="Password"
          type="password"
          size="lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button variantColor="gray" variant="outline" onClick={submitForm}>
        Login
      </Button>
      <p>
        No account yet?
        <Link to="/signup">
          <Button variantColor="gray" variant="outline">
            Sign up!
          </Button>
        </Link>
      </p>
    </Box>
  );
}

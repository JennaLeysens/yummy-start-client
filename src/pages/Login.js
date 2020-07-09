import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/User/actions";
import { Link } from "react-router-dom";
import { selectToken, selectErrorMessage } from "../store/User/selectors";
import { useHistory } from "react-router-dom";
import {
  Input,
  Button,
  FormLabel,
  FormControl,
  Heading,
  Box,
  useToast,
  Image,
} from "@chakra-ui/core";
import "./forms.css";
import loginBackground from "../loginBackground.png";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();
  const toast = useToast();
  const error = useSelector(selectErrorMessage);

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Login error!",
        description: error.message,
        status: "error",
        duration: 90000,
        isClosable: true,
      });
    }
  }, [toast, error]);

  function submitForm(e) {
    e.preventDefault();
    dispatch(login(email, password));
    setEmail("");
    setPassword("");
  }

  return (
    <Box className="page">
      <Image position="absolute" className="bg" src={loginBackground}></Image>
      <Heading
        position="relative"
        fontWeight="thin"
        as="h2"
        size="xl"
        padding="10px"
      >
        Login
      </Heading>
      <Box className="box" position="relative">
        <FormControl isRequired>
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
        <Button
          variantColor="gray"
          variant="outline"
          margin="15px"
          onClick={submitForm}
        >
          Login
        </Button>
        <Box>
          No account yet?
          <Link to="/signup">
            <Button variantColor="gray" variant="outline" marginLeft="10px">
              Sign up!
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

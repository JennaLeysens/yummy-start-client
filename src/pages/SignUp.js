import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUp } from "../store/User/actions";
import {
  Input,
  Button,
  FormLabel,
  FormControl,
  Box,
  Image,
  useToast,
  Link,
} from "@chakra-ui/core";
import { Heading } from "@chakra-ui/core";
import "./forms.css";
import { selectErrorMessage } from "../store/User/selectors";
import signupBackground from "../signupBackground.png";

export default function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [imageurl, setImageUrl] = useState();
  const dispatch = useDispatch();
  const toast = useToast();
  const error = useSelector(selectErrorMessage);
  const history = useHistory();

  function submitForm() {
    dispatch(signUp(name, email, password, imageurl));
    setName("");
    setEmail("");
    setPassword("");
    setImageUrl("");
    history.push("/");
  }

  useEffect(() => {
    if (error) {
      toast({
        title: "Sign up error!",
        description: error.message,
        status: "error",
        duration: 90000,
        isClosable: true,
      });
    }
  }, [toast, error]);

  return (
    <Box>
      <Image position="absolute" className="bg" src={signupBackground}></Image>
      <Heading
        position="relative"
        fontWeight="thin"
        as="h2"
        size="xl"
        padding="10px"
      >
        Create an account to start sharing your recipes!
      </Heading>{" "}
      <Box className="box" position="relative">
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Input>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel>Profile image url</FormLabel>
          <Input
            type="text"
            value={imageurl}
            onChange={(e) => setImageUrl(e.target.value)}
          ></Input>
          <Image src={imageurl} thumbnail width="50%" />
        </FormControl>
        <Button
          variantColor="gray"
          variant="outline"
          margin="15px"
          onClick={submitForm}
        >
          Create account
        </Button>
        <Box>
          Already have an account?
          <Link to="/login">
            <Button variantColor="gray" variant="outline" marginLeft="10px">
              Login
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

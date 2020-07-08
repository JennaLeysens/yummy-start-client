import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../store/User/actions";
import {
  Input,
  Button,
  FormLabel,
  FormControl,
  Box,
  Image,
  useToast,
} from "@chakra-ui/core";
import { Heading } from "@chakra-ui/core";
import "./forms.css";
import { selectErrorMessage } from "../store/User/selectors";

export default function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [imageurl, setImageUrl] = useState();
  const dispatch = useDispatch();
  const toast = useToast();
  const error = useSelector(selectErrorMessage);

  function submitForm() {
    dispatch(signUp(name, email, password, imageurl));
    setName("");
    setEmail("");
    setPassword("");
    setImageUrl("");
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
    <Box className="box">
      <Heading>Create an account to start sharing your recipes!</Heading>
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
      <Button variantColor="gray" variant="outline" onClick={submitForm}>
        Create account
      </Button>
    </Box>
  );
}

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../store/User/actions";
import {
  Input,
  Button,
  FormLabel,
  FormControl,
  Box,
  Image,
} from "@chakra-ui/core";
import { Heading } from "@chakra-ui/core";
import "./forms.css";

export default function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [imageurl, setImageUrl] = useState();
  const dispatch = useDispatch();

  function submitForm() {
    dispatch(signUp(name, email, password, imageurl));
    setName("");
    setEmail("");
    setPassword("");
    setImageUrl("");
  }

  return (
    <Box className="box">
      <Heading>Create an account to start sharing your recipes!</Heading>
      <FormControl>
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

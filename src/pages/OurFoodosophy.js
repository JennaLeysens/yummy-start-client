import React from "react";
import { Text, Heading, Box, Image } from "@chakra-ui/core";
import leaves from "../leaves.png";

export default function OurFoodosophy() {
  return (
    <Box textAlign="center">
      <Heading fontWeight="thin" as="h2" size="xl" padding="10px">
        Our Foodosophy
      </Heading>

      <Text fontFamily="Cormorant Garamond">
        <p>
          Healthy food doesn't need to be complicated and packed with trendy
          superfoods. So all recipes on Yummy Start must have five indgredients
          or less!
        </p>
        <p>
          Healthy eating should be inexpensive, easy and most of all yummy,
          which is why Yummy Start is a place to find recipes that you actually
          want to eat.
        </p>
      </Text>

      <Image textAlign="center" src={leaves}></Image>
    </Box>
  );
}

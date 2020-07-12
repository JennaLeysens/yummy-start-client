import React from "react";
import { Heading, Box, Image } from "@chakra-ui/core";
import leaves from "../leaves.png";

export default function OurFoodosophy() {
  return (
    <Box textAlign="center">
      <Heading fontWeight="thin" as="h2" size="xl" padding="10px">
        Our Foodosophy
      </Heading>
      <Box p={8} fontFamily="Cormorant Garamond">
        Healthy food doesn't need to be complicated and packed with trendy
        superfoods. So all recipes on Yummy Start must have five indgredients or
        less!
      </Box>
      <Box paddingBottom={10} fontFamily="Cormorant Garamond">
        Healthy eating should be inexpensive, easy and most of all yummy, which
        is why Yummy Start is a place to find recipes that you actually want to
        eat.
      </Box>

      <Image textAlign="center" src={leaves}></Image>
    </Box>
  );
}

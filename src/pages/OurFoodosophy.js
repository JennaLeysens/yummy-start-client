import React from "react";
import { Text, Heading, Box } from "@chakra-ui/core";

export default function OurFoodosophy() {
  return (
    <Box>
      <Heading fontWeight="thin" as="h2" size="xl" padding="10px">
        Our Foodosophy
      </Heading>

      <Text fontFamily="Cormorant Garamond">
        <p>
          Healthy food doesn't need to be compplicated and packed with trendy
          superfoods.
        </p>
        <p>
          It should be easy and most of all yummy, which is why Yummy Start is a
          place to find five indgredient recipes that you actually want to eat.
        </p>
      </Text>
    </Box>
  );
}

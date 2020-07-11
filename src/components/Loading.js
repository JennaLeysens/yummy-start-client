import React from "react";
import { Spinner } from "@chakra-ui/core";
import "./loading.css";

export default function Loading() {
  return (
    <div className="spinner">
      <Spinner
        size="xl"
        emptyColor="gray.200"
        color="darkgray"
        thickness="3px"
      />
    </div>
  );
}

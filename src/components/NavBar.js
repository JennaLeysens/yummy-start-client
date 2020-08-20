import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./NavBar.css";
import { logOut } from "../store/User/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../store/User/selectors";
import { selectUser } from "../store/User/selectors";
import logo from "../logo-ys.png";
import { Image, Button, Box } from "@chakra-ui/core";

export default function NavBar() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const history = useHistory();

  return (
    <Box className="navbar">
      <Box className="logo">
        <NavLink exact to="/">
          <Image display="inline-block" src={logo}></Image>
        </NavLink>
      </Box>
      <Box className="grow">
        <NavLink
          exact
          to="/"
          activeStyle={{
            fontWeight: "bold",
          }}
        >
          Recipes
        </NavLink>
      </Box>
      {token ? (
        <Box className="grow">
          <NavLink
            to="/addrecipe"
            activeStyle={{
              fontWeight: "bold",
            }}
          >
            Add recipe
          </NavLink>
        </Box>
      ) : (
        <Box className="grow">
          <NavLink
            to="/login"
            activeStyle={{
              fontWeight: "bold",
            }}
          >
            Add recipe
          </NavLink>
        </Box>
      )}
      <Box className="grow">
        <NavLink
          exact
          to="/ourfoodosophy"
          activeStyle={{
            fontWeight: "bold",
          }}
        >
          Our foodosophy
        </NavLink>
      </Box>
      {token ? (
        <>
          <Box className="grow">
            <NavLink
              exact
              to="/myprofile"
              activeStyle={{
                fontWeight: "bold",
              }}
            >
              {user.name}'s Kitchen
            </NavLink>
          </Box>
          <Button
            variantColor="gray"
            variant="outline"
            size="xs"
            onClick={() => {
              dispatch(logOut());
              history.push("/");
            }}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Box className="grow">
            <NavLink
              exact
              to="/signup"
              activeStyle={{
                fontWeight: "bold",
              }}
              p={1}
              variantColor="gray"
              variant="outline"
              size="s"
              fontSize="16px"
            >
              Create an account
            </NavLink>
          </Box>
          <Box className="grow">
            <NavLink
              exact
              to="/login"
              activeStyle={{
                fontWeight: "bold",
              }}
              p={1}
              variantColor="gray"
              variant="outline"
              size="s"
              fontSize="16px"
            >
              Login
            </NavLink>
          </Box>
        </>
      )}
    </Box>
  );
}

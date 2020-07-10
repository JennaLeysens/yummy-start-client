import React from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import "./NavBar.css";
import { logOut } from "../store/User/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../store/User/selectors";
import { selectUser } from "../store/User/selectors";
import logo from "../logo-ys.png";
import { Image, Button } from "@chakra-ui/core";

export default function NavBar() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const history = useHistory();

  return (
    <div className="navbar">
      <div className="logo">
        <Image display="inline-block" src={logo}></Image>
      </div>
      <div className="grow">
        <NavLink
          exact
          to="/"
          activeStyle={{
            fontWeight: "grow",
          }}
        >
          Recipes
        </NavLink>
      </div>

      <div className="grow">
        <NavLink
          to="/addrecipe"
          activeStyle={{
            fontWeight: "bold",
          }}
        >
          Add recipe
        </NavLink>
      </div>

      <div className="grow">
        <NavLink
          exact
          to="/ourfoodosophy"
          activeStyle={{
            fontWeight: "bold",
          }}
        >
          Our foodosophy
        </NavLink>{" "}
      </div>
      {token ? (
        <div className="grow">
          <NavLink
            exact
            to="/myprofile"
            activeStyle={{
              fontWeight: "bold",
            }}
          >
            {user.name}'s Kitchen
          </NavLink>
          <Button
            className="button"
            variantColor="gray"
            variant="outline"
            size="xs"
            onClick={() => {
              dispatch(logOut());
              history.push("/");
            }}
          >
            Logout
          </Button>{" "}
        </div>
      ) : (
        <>
          <Link to="/signup">
            <Button
              className="button"
              variantColor="gray"
              variant="outline"
              size="xs"
            >
              Create an account
            </Button>
          </Link>
          <Link to="/login">
            <Button
              className="button"
              variantColor="gray"
              variant="outline"
              size="xs"
            >
              Login
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}

import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./NavBar.css";
import { logOut } from "../store/User/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../store/User/selectors";
import { selectUser } from "../store/User/selectors";

export default function NavBar() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  return (
    <div>
      <div className="NavBar">
        <NavLink
          exact
          to="/"
          activeStyle={{
            fontWeight: "bold",
          }}
        >
          Recipes
        </NavLink>
      </div>

      <div className="NavBar">
        <NavLink
          to="/addrecipe"
          activeStyle={{
            fontWeight: "bold",
          }}
        >
          Add recipe
        </NavLink>
      </div>

      <div className="NavBar">
        <NavLink
          exact
          to="/myfavourites"
          activeStyle={{
            fontWeight: "bold",
          }}
        >
          Our foodosophy
        </NavLink>{" "}
      </div>
      {token ? (
        <div className="NavBar">
          <NavLink
            exact
            to="/myprofile"
            activeStyle={{
              fontWeight: "bold",
            }}
          >
            {user.name}'s Kitchen
          </NavLink>
          <button onClick={() => dispatch(logOut())}>Logout</button>{" "}
        </div>
      ) : (
        <Link to="/login">
          <button>Login</button>
        </Link>
      )}

      <div className="NavBar"></div>
    </div>
  );
}

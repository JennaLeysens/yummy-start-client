import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import AddRecipe from "./pages/AddRecipe";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { getUserWithStoredToken } from "./store/User/actions";
import { useDispatch } from "react-redux";
import NavBar from "./components/NavBar";
import UserProfile from "./pages/UserProfile";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div>
      <NavBar></NavBar>
      <Switch>
        <Route path="/addrecipe" component={AddRecipe} />
        <Route path="/recipes/:id" component={RecipeDetails} />
        <Route exact path="/" component={Recipes} />{" "}
        <Route path="/myprofile" component={UserProfile} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;

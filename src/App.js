import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import AddRecipe from "./pages/AddRecipe";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/addrecipe" component={AddRecipe} />
        <Route path="/recipes/:id" component={RecipeDetails} />
        <Route exact path="/" component={Recipes} />{" "}
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;

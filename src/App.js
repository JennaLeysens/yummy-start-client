import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import AddRecipe from "./pages/AddRecipe";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/addrecipe" component={AddRecipe} />
        <Route path="/recipes/:id" component={RecipeDetails} />
        <Route path="/" component={Recipes} />
      </Switch>
    </div>
  );
}

export default App;

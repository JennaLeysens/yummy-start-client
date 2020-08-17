import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import AddRecipe from "./pages/AddRecipe";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { getUserWithStoredToken } from "./store/User/actions";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import UserProfile from "./pages/UserProfile";
import OurFoodosophy from "./pages/OurFoodosophy";
import Loading from "./components/Loading";
import { selectAppLoading } from "./store/Appstate/selectors";
import { CloudinaryContext } from "cloudinary-react";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <CloudinaryContext cloudName="yummystart">
      <div className="App" style={{ display: "block" }}>
        <NavBar></NavBar>
        {isLoading ? <Loading /> : null}
        <Switch>
          <Route path="/ourfoodosophy" component={OurFoodosophy} />
          <Route path="/addrecipe" component={AddRecipe} />
          <Route path="/recipes/:id" component={RecipeDetails} />
          <Route exact path="/" component={Recipes} />
          <Route path="/myprofile" component={UserProfile} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </Switch>
        <div className="footer"></div>
      </div>
    </CloudinaryContext>
  );
}

export default App;

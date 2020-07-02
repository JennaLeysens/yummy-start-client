import React from "react";

export default function AddRecipe() {
  return (
    <div>
      <h1>Add your recipe</h1>
      <form>
        Title<input></input>
        Image URL<input></input>
        Description<textarea></textarea>
        Ingredients<input></input>
        Method<textarea></textarea>
        Cooking time<input></input>
      </form>
      <button>Post recipe</button>
    </div>
  );
}

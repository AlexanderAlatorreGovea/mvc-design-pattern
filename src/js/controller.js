import { async } from "regenerator-runtime";
import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
//const recipeContainer = document.querySelector(".recipe");

//Example URL:https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886?key=2926f6ca-5c98-4277-8a8e-369020c9168a

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    //1) loading recipe
    await model.loadRecipe(id);

    //2) rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    //1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2) Load search results
    await model.loadSearchResults(query);

    //3) render results
    console.log(model.state.search.results)
  } catch (error) {
    console.log(err);
  }
};

controlSearchResults();

const init = function () {
  //this is the subscriber of our function
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();

import { async } from "regenerator-runtime";
import { API_URL } from "./config";
import { getJSON } from "./helpers";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    //resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async (id) => {
  try {
    const data = await getJSON(`${API_URL}${id}?key=${process.env.API_KEY}`);

    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};

export const loadSearchResults = async (query) => {
  try {
    state.search.query = query;
    const data = await getJSON(
      `${API_URL}?search=${query}&key=${process.env.API_KEY}`
    );
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};

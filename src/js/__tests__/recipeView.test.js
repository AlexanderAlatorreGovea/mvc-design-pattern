import "core-js/stable";
import "regenerator-runtime/runtime";
//import recipeView from "../views/recipeview";
import * as rv from "../views/recipeView1.js";
import * as recipes from "../__fixtures__/recipes";
import { async } from "regenerator-runtime";
import * as formattedRecipe from "../__fixtures__/formattedRecipe.js";

describe("Recipe View Class", () => {
  let recipeView;
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="recipe">
        <div class="message">
          <div>
            <svg>
              <use href="/icons.002645bd.svg#icon-smile"></use>
            </svg>
          </div>
          <p>Start by searching for a recipe or an ingredient. Have fun!</p>
        </div>
      </div>
      `;
      recipeView = new rv.RecipeView();
  });

  test("renders a recipe", () => {
    recipeView.renderRecipe(recipes.recipe_1);
    const recipeHtml = document.querySelector(".recipe").innerHTML;
    expect(recipeHtml).toBe(formattedRecipe.formattedRecipe_1);
  });
});


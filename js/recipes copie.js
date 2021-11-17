////// CODE SESSION MENTORAT //////

let suggestion = "";
let ingredList = "";
const searchField = document.querySelector(".search-field");

/* for (item of recipes ){

  console.log(item.ingredients[0].ingredient); */

/* function htmlRecipe() {
    
  suggestion 
} */

function displayRecipes(arr) {
  for (recipe of arr) {
    /* htmlRecipe(); */
    document.querySelector(".recipes-list").innerHTML += `
          
    <article class="recipe">
    <div class="recipe-img"></div>
    <div class="recipe-description">
      <div class="recipe-description1">
        <div class="recipe-description1-title">
          <p>${recipe.name}</p>
        </div>
        <div class="recipe-description1-time">
        <img src="../images/time.svg" alt="clock">
          <p>${recipe.time} min</p>
        </div>
      </div>
      <div class="recipe-description2">
        <div class="recipe-description2-ingred">

        </div>
        <div class="recipe-description2-instruct">
          <p>${recipe.description}</p>
        </div>
      </div>
    </div>
    </article>
  `;
    for (ingredient of recipe.ingredients) {
      console.log(ingredient.ingredient);
      console.log(ingredient.quantity);
      console.log(ingredient.unit);

      /*        ingredList += `<p>test</p>`;
       */ document.querySelector(".recipe-description2-ingred").innerHTML += `<p>test</p>`;
    }
  }

  /*   document.querySelector(".recipes-list").innerHTML = suggestion;
   */
}

/* function test(ingredients) {
  for (ingredient of ingredients) {
    console.log(ingredient.ingredient);
    console.log(ingredient.quantity);
    console.log(ingredient.unit);

    document.querySelector(".recipe-description2-ingred").innerHTML = `<p>${ingredient.ingredient}</p>`;
  }
} */

displayRecipes(recipes);

searchField.addEventListener("input", function () {
  const input = searchField.value;
  suggestion = "";
  if (input.length < 3) {
    displayRecipes(recipes);
  } else if (input.length >= 3) {
    const resultName = recipes.filter((item) => item.name.toLowerCase().includes(input.trim().toLowerCase()));
    displayRecipes(resultName);
  }
});
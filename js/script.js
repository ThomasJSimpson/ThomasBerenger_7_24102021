let suggestion = "";
const searchField = document.querySelector(".search-field");








console.log(recipes[0].ingredients[0].ingredient);

/* data.items[1].name */












function htmlRecipe() {
    
  suggestion += `
          
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
                <p>${recipe.ingredients[0].ingredient}</p>
                
                
                
              </div>
              <div class="recipe-description2-instruct">
                <p>${recipe.description}</p>
              </div>
            </div>
          </div>
          </article>
        `;
}



function displayRecipes(arr) {
  for (recipe of arr) {
    htmlRecipe();
  }
  document.querySelector(".recipes-list").innerHTML = suggestion;
}



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

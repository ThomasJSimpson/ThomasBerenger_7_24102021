const searchField = document.querySelector(".search-field");

let suggestion = "";
let ingredHtml = "";

function displayRecipes(arr) {
  for (recipe of arr) {
    ingredHtml = "";
    for (item of recipe.ingredients) {
      if (typeof item.quantity === "undefined" && typeof item.unit === "undefined") {
        ingredHtml += `
          
        <p>${item.ingredient}</p>
        
  `;
      } else if (typeof item.unit === "undefined") {
        ingredHtml += `
        
            <p>${item.ingredient} : ${item.quantity}</p>
            
      `;
      } else {
        ingredHtml += `
        
      <p>${item.ingredient} : ${item.quantity} ${item.unit}</p>
      
`;
      }
    }

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
              ${ingredHtml}
              </div>
              <div class="recipe-description2-instruct">
                <p>${recipe.description}</p>
              </div>
            </div>
          </div>
          </article>
          
        `;
  }
  document.querySelector(".recipes-list").innerHTML = suggestion;
}

//    Afficher les recettes par défaut

displayRecipes(recipes);

/* let resultUstensils = [];
recipes.forEach(element => {

 if (element.ustensils.includes(input.trim().toLowerCase())) {
  resultUstensils.push(element)
 }
} */

// Listener search bar

searchField.addEventListener("input", function () {
  const input = searchField.value;
  suggestion = "";
  if (input.length < 3) {
    displayRecipes(recipes);
  } else if (input.length >= 3) {
    // Par Nom
    const resultName = recipes.filter((item) => item.name.toLowerCase().includes(input.trim().toLowerCase()));

    console.log("Par Nom");
    console.log(resultName);
    // Par Appareil
    const resultAppliance = recipes.filter((item) => item.appliance.toLowerCase().includes(input.trim().toLowerCase()));
    console.log("Par Appareil");
    console.log(resultAppliance);

    // Par Ustensils

    const resultUstensils = [];

    recipes.forEach((element) => {
      const ustensilsList = element.ustensils.join(" ").toString().toLowerCase(); //).split();

      /* ustensilsList.forEach(element2 => {
      
      if (element2.includes(input.trim().toLowerCase())) { 
        console.log(ustensilsList);
        console.log(element2);
        resultUstensils.push(element)
      }; */

      if (ustensilsList.includes(input.trim().toLowerCase())) {
        resultUstensils.push(element);
      }
    });

    /* 
    const resultUstensils = recipes.filter((element) => 
    element.ustensils.join(" ").toString().toLowerCase().includes(input.trim().toLowerCase()));
    
    
    ; */

    console.log("Par Ustensils");
    console.log(resultUstensils);

    // Par Ingrédients

    const resultIngredients = [];
    recipes.forEach((element) => {
      element.ingredients.forEach((element2) => {
        if (element2.ingredient.toLowerCase().includes(input.trim().toLowerCase())) {
          resultIngredients.push(element);
        }
      });
    });

    console.log("Par ingrédients");
    console.log(resultIngredients);

    //          Supression des doublons après la fusion des tableaux

    const resultAll = [...new Set([...resultName, ...resultIngredients, ...resultAppliance, ...resultUstensils])];

    // Affichage du tableau de résultats final

    displayRecipes(resultAll);

    console.log("Recherche générale");
    console.log(resultAll);
  }
});

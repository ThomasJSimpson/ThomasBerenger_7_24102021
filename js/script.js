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

// Listener search bar

searchField.addEventListener("input", function () {
  const input = searchField.value.toLowerCase().trim().split(" ");
  console.log(input);
  suggestion = "";
  const resultAll = [];
  input.forEach((word) => {
    // Fonction -> Résultat pour un mot

    if (input.length < 2 && word.length < 3) {
      displayRecipes(recipes);
    } else if (word.length >= 3) {
      console.log(word);
      // Par Nom

      const resultName = recipes.filter((item) => item.name.toLowerCase().includes(word.trim().toLowerCase()));

      console.log("Par Nom");
      console.log(resultName);

      // Par Description

      const resultDescr = recipes.filter((item) => item.description.toLowerCase().includes(word.trim().toLowerCase()));

      console.log("Par Description");
      console.log(resultDescr);

      // Par Appareil

      const resultAppliance = recipes.filter((item) => item.appliance.toLowerCase().includes(word.trim().toLowerCase()));
      
      console.log("Par Appareil");
      console.log(resultAppliance);

      // Par Ustensils

      const resultUstensils = recipes.filter((element) => element.ustensils.join(" ").toLowerCase().includes(word.trim().toLowerCase()));

      console.log("Par Ustensils");
      console.log(resultUstensils);

      // Par Ingrédients

      const resultIngredients = [];
      recipes.forEach((element) => {
        element.ingredients.forEach((element2) => {
          if (element2.ingredient.toLowerCase().includes(word.trim().toLowerCase())) {
            resultIngredients.push(element);
          }
        });
      });

      console.log("Par ingrédients");
      console.log(resultIngredients);

      //          Supression des doublons après la fusion des tableaux

      const resultWord = [...new Set([...resultName, ...resultIngredients, ...resultDescr, ...resultUstensils, ...resultAppliance])];
      console.log("tableau current word");

      console.log(resultWord);
      // Affichage du tableau de résultats final
      resultAll.push(...resultWord);
      console.log("tableau accu");

      console.log(resultAll);
    }
  });
  const resultAllWords = [...new Set([...resultAll])];
  displayRecipes(resultAllWords);
  console.log("Recherche générale");
  console.log(resultAllWords);
});

// Par Ustensils

/*const resultUstensils = [];
  
        recipes.forEach((element) => {
          const ustensilsList = element.ustensils.join(" ").toLowerCase();

           console.log(ustensilsList);
  
           ustensilsList.forEach((element2) => {
            if (element2.includes(word.trim().toLowerCase())) {             
              resultUstensils.push(element);
            }
          });
        }); */

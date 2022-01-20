const searchMain = document.querySelector(".search-field");
const searchIngred = document.querySelector(".ingredients");
const searchAppli = document.querySelector(".appliance");
const searchUstens = document.querySelector(".ustensils");
const arrowUstens = document.getElementById("arrowUstens");
const arrowAppli = document.getElementById("arrowAppli");
const arrowIngred = document.getElementById("arrowIngred");

let inputMain = searchMain.value.toLowerCase().trim().split(" ");
let inputUst = searchUstens.value.toLowerCase().trim();
let inputApp = searchAppli.value.toLowerCase().trim();
let inputIngred = searchIngred.value.toLowerCase().trim();

let mainResult = recipes;
let resultIngredients = [];
let resultUstensils = [];
let resultAppliance = [];
let arrayTags = [];
let resultOk = [true];

window.addEventListener("resize", function () {
  if (
    document.documentElement.clientWidth < 849 &&
    (document.querySelector(".filter-ustensils").classList.contains("filter-box-med") ||
      document.querySelector(".filter-ustensils").classList.contains("filter-box-larg") ||
      document.querySelector(".filter-appliance").classList.contains("filter-box-med") ||
      document.querySelector(".filter-appliance").classList.contains("filter-box-larg") ||
      document.querySelector(".filter-ingredients").classList.contains("filter-box-med") ||
      document.querySelector(".filter-ingredients").classList.contains("filter-box-larg"))
  ) {
    document.querySelector(".filter").setAttribute("style", "position : inherit");
    document.querySelector(".recipes-list").setAttribute("style", "margin-top: 25px;");
  }

  if (
    document.documentElement.clientWidth > 849 &&
    (document.querySelector(".filter-ustensils").classList.contains("filter-box-med") ||
      document.querySelector(".filter-ustensils").classList.contains("filter-box-larg") ||
      document.querySelector(".filter-appliance").classList.contains("filter-box-med") ||
      document.querySelector(".filter-appliance").classList.contains("filter-box-larg") ||
      document.querySelector(".filter-ingredients").classList.contains("filter-box-med") ||
      document.querySelector(".filter-ingredients").classList.contains("filter-box-larg"))
  ) {
    document.querySelector(".filter").setAttribute("style", "position : absolute");
    document.querySelector(".recipes-list").setAttribute("style", "margin-top: 160px;");
  }
});

// Correction ponctuation recipes

recipes.forEach((recipe) => {
  if (recipe.description.slice(-1) != "." && recipe.description.slice(-1) != "!") {
    recipe.description = recipe.description.concat("", ".");
  }
});

displayRecipes(mainResult);
/* displayUstensils(mainResult);
displayAppliance(mainResult);
displayIngredients(mainResult); */

// Ajouter un tag
function addTag() {
  const itemTag = document.querySelectorAll(".itemTag");

  itemTag.forEach((element) => {
    element.addEventListener("click", function () {
      if (arrayTags.some((e) => e.name.toLowerCase() === element.innerText.toLowerCase())) {
      } else {
        if (element.parentElement.classList.contains("advListUst")) {
          arrayTags.push({ name: element.innerText, type: "ustensil" });

          if (document.querySelector(".filter-ustensils").classList.contains("filter-box-med")) {
            document.querySelector(".filter-ustensils").className = "filter-ustensils color-ustensils filter-box-min";
            if (document.documentElement.clientWidth > 849) {
              document.querySelector(".filter").setAttribute("style", "position : inherit");
              document.querySelector(".recipes-list").setAttribute("style", "margin-top: 25px;");
            }
            searchUstens.value = "";
            inputUst = "";
            searchUstens.placeholder = "Ustensiles";
          } else if (document.querySelector(".filter-ustensils").classList.contains("filter-box-larg")) {
            searchUstens.value = "";
            inputUst = "";
            searchUstens.placeholder = "Recherche un ustensile";
            document.querySelector(".ustensils").className = "ustensils filter-title-input2 color-ustensils";
          }
        } else if (element.parentElement.classList.contains("advListApp")) {
          arrayTags.push({ name: element.innerText, type: "appliance" });

          if (document.querySelector(".filter-appliance").classList.contains("filter-box-med")) {
            document.querySelector(".filter-appliance").className = "filter-appliance color-appliance filter-box-min";
            if (document.documentElement.clientWidth > 849) {
              document.querySelector(".filter").setAttribute("style", "position : inherit");
              document.querySelector(".recipes-list").setAttribute("style", "margin-top: 25px;");
            }
            searchAppli.value = "";
            inputApp = "";
            searchAppli.placeholder = "Appareil";
            document.querySelector(".appliance").className = "appliance filter-title-input color-appliance";
          } else if (document.querySelector(".filter-appliance").classList.contains("filter-box-larg")) {
            searchAppli.value = "";
            inputApp = "";
            searchAppli.placeholder = "Recherche un appareil";
            document.querySelector(".appliance").className = "appliance filter-title-input2 color-appliance";
          }
        } else if (element.parentElement.classList.contains("advListIngred")) {
          arrayTags.push({ name: element.innerText, type: "ingredient" });

          if (document.querySelector(".filter-ingredients").classList.contains("filter-box-med")) {
            document.querySelector(".filter-ingredients").className = "filter-ingredients color-ingredients filter-box-min";
            if (document.documentElement.clientWidth > 849) {
              document.querySelector(".filter").setAttribute("style", "position : inherit");
              document.querySelector(".recipes-list").setAttribute("style", "margin-top: 25px;");
            }
            searchIngred.value = "";
            inputIngred = "";
            searchIngred.placeholder = "Ingrédients";
            document.querySelector(".ingredients").className = "ingredients filter-title-input color-ingredients";
          } else if (document.querySelector(".filter-ingredients").classList.contains("filter-box-larg")) {
            searchIngred.value = "";
            inputIngred = "";
            searchIngred.placeholder = "Recherche un ingrédient";
            document.querySelector(".ingredients").className = "ingredients filter-title-input2 color-ingredients";
          }
        }
      }

      mainResult = mainResult.filter((recipe) => {
        let recipeIngred = [];

        recipe.ingredients.forEach((ingred) => {
          recipeIngred.push(ingred.ingredient.toLowerCase());
        });
        //search = [recipe.appliance.toLowerCase(), ...recipeIngred].concat(recipe.ustensils);

        return arrayTags.every((tag) => [recipe.appliance.toLowerCase(), ...recipeIngred].concat(recipe.ustensils).includes(tag.name.toLowerCase()));
      });

      mainResult = [...new Set([...mainResult])];

      displayRecipes(mainResult);
      displayAppliance(mainResult);
      displayIngredients(mainResult);
      displayUstensils(mainResult);

      addTag();
      displayTags();
      rmvTag();
    });
  });
}

// retirer un tags

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

function displayTags() {
  let tagsHtml = "";

  arrayTags.forEach((tag) => {
    if (tag.type === "ustensil") {
      tagsHtml += `      
  
      <div class= "tags-item color-ustensils">
  <p>${tag.name}</p>
  <img src="./assets/images/cross.svg" alt="cross" class="cross" /> 
</div>

      `;
    } else if (tag.type === "appliance") {
      tagsHtml += ` 
  
      <div class= "tags-item color-appliance">
  <p>${tag.name}</p>
  <img src="./assets/images/cross.svg" alt="cross" class="cross" /> 
</div>

      `;
    } else if (tag.type === "ingredient") {
      tagsHtml += ` 
  
      <div class= "tags-item color-ingredients">
  <p>${tag.name}</p>
  <img src="./assets/images/cross.svg" alt="cross" class="cross" /> 
</div>

      `;
    }
  });

  document.querySelector(".tags").innerHTML = tagsHtml;
}

function rmvTag() {
  const crossTag = document.querySelectorAll(".cross");

  crossTag.forEach((element) => {
    element.addEventListener("click", function () {
      ////////////////////////////////////////////////////////////////////////////////
      // Retrait objet/tag du tableau de référence
      arrayTags.forEach((f) => {
        if (f.name === element.previousElementSibling.innerText) {
          arrayTags = arrayRemove(arrayTags, f);
        }
      });

      ////////////////////////////////////////////////////////////////////////////////

      //////////////////////////////////////// Mise a jour affichage des TAGS

      let tagsHtml = "";

      arrayTags.forEach((tag) => {
        if (tag.type === "ustensil") {
          tagsHtml += `      
    
        <div class= "tags-item color-ustensils">
    <p>${tag.name}</p>
    <img src="./assets/images/cross.svg" alt="cross" class="cross" /> 
  </div>
  
        `;
        } else if (tag.type === "appliance") {
          tagsHtml += ` 
    
        <div class= "tags-item color-appliance">
    <p>${tag.name}</p>
    <img src="./assets/images/cross.svg" alt="cross" class="cross" /> 
  </div>
  
        `;
        } else if (tag.type === "ingredient") {
          tagsHtml += ` 
    
        <div class= "tags-item color-ingredients">
    <p>${tag.name}</p>
    <img src="./assets/images/cross.svg" alt="cross" class="cross" /> 
  </div>
  
        `;
        }
      });
      document.querySelector(".tags").innerHTML = tagsHtml;

      /////////////////////////////////////////////////////

      // mainResult généré a partir des tags/objets restants dans arrayTags
      /* mainResult = recipes;
      if (inputMain.length === 0 && arrayTags.length === 0) {
        mainResult = recipes;
      } else if(inputMain.length != 0){

        if (inputMain[0].length >= 3 && arrayTags.length === 0) {
          mainResult = recipes;
          mainResult = mainResult.filter((recipe) => {
            let recipeIngred = [];
  
            recipe.ingredients.forEach((ingred) => {
              recipeIngred.push(ingred.ingredient.toLowerCase());
            });
  
            search = recipe.name.toLowerCase() + " " + recipeIngred + " " + recipe.description.toLowerCase();
  
            return inputMain.every((word) => search.includes(word));
          });
        }
      }  */
      mainResult = recipes;
      if (inputMain.length != 0) {
        if (inputMain[0].length >= 3) {
          mainResult = mainResult.filter((recipe) => {
            let recipeIngred = [];

            recipe.ingredients.forEach((ingred) => {
              recipeIngred.push(ingred.ingredient.toLowerCase());
            });

            search = recipe.name.toLowerCase() + " " + recipeIngred + " " + recipe.description.toLowerCase();

            return inputMain.every((word) => search.includes(word));
          });
        }
      }

      if (mainResult != recipes) {
        resultOk.push(true);
      }

      mainResult = mainResult.filter((recipe) => {
        let recipeIngred = [];

        recipe.ingredients.forEach((ingred) => {
          recipeIngred.push(ingred.ingredient.toLowerCase());
        });
        //search = [recipe.appliance.toLowerCase(), ...recipeIngred].concat(recipe.ustensils);

        return arrayTags.every((tag) => [recipe.appliance.toLowerCase(), ...recipeIngred].concat(recipe.ustensils).includes(tag.name.toLowerCase()));
      });

      mainResult = [...new Set([...mainResult])];
      displayRecipes(mainResult);
      displayAppliance(mainResult);
      displayIngredients(mainResult);
      displayUstensils(mainResult);

      ///////////////////////////////////////////////////
      addTag();

      rmvTag();
    });
  });
}

//    Afficher les recettes par défaut

function displayRecipes(arr) {
  let suggestion = "";
  arr.forEach((recipe) => {
    let ingredRecipHtml = "";
    recipe.ingredients.forEach((item) => {
      if (typeof item.quantity === "undefined" && typeof item.unit === "undefined") {
        ingredRecipHtml += `
          
        <p><span class="bold">${item.ingredient}</span></p>
        
  `;
      } else if (typeof item.unit === "undefined") {
        ingredRecipHtml += `
        
            <p><span class="bold">${item.ingredient}</span> : ${item.quantity}</p>
            
      `;
      } else {
        if (item.unit.length > 2) {
          ingredRecipHtml += `
        
  <p><span class="bold">${item.ingredient}</span> : ${item.quantity} ${item.unit}</p>
  
`;
        } else {
          ingredRecipHtml += `
        
      <p><span class="bold">${item.ingredient}</span> : ${item.quantity}${item.unit}</p>
      
`;
        }
      }
    });

    suggestion += `
          
          <article class="recipe">
          <div class="recipe-img"></div>
          <div class="recipe-description">
            <div class="recipe-description1">
              <div class="recipe-description1-title">
                <p>${recipe.name}</p>
              </div>
              <div class="recipe-description1-time">
              <img src="./assets/images/time.svg" alt="clock">
                <p>${recipe.time} min</p>
              </div>
            </div>
            <div class="recipe-description2">
              <div class="recipe-description2-ingred">
              ${ingredRecipHtml}
              </div>
              <div class="recipe-description2-instruct">
                <p>${recipe.description}</p>
              </div>
            </div>
          </div>
          </article>
          
        `;
  });

  if (resultOk.includes(true)) {
    document.querySelector(".recipes-list").innerHTML = suggestion;
  } else {
    suggestion = `<p> Aucune recette ne correspond à votre critère… vous pouvez
    chercher « tarte aux pommes », « poisson », etc...</p>`;
    document.querySelector(".recipes-list").innerHTML = suggestion;
  }
  console.log(arr);
}

function displayUstensils(arr) {
  let listItem = [];
  let listItem2 = [];

  arr.forEach((recipe) => {
    recipe.ustensils.forEach((item) => {
      listItem.push(item);
    });
  });

  //Conversion Capitale

  listItem.forEach((ustens) => {
    let capUstens = "";
    capUstens = ustens.charAt(0).toUpperCase() + ustens.slice(1);
    listItem2.push(capUstens);
  });

  // Suppression doubles ustensils
  listItem2 = [...new Set([...listItem2])];

  //Ajout ingrédients HTML
  let ustensilsHTML = "";
  listItem2.forEach((ustens) => {
    if (arrayTags.some((e) => e.name.toLowerCase() === ustens.toLowerCase())) {
    } else {
      ustensilsHTML += `

      <li class="itemTag"> ${ustens} </li>
      
      `;
    }
  });

  document.querySelector(".advListUst").innerHTML = ustensilsHTML;
}

function displayAppliance(arr) {
  let listItem = [];
  let listItem2 = [];

  arr.forEach((element) => {
    listItem.push(element.appliance);
  });

  //Conversion Capitale

  listItem.forEach((appl) => {
    let capApp = "";
    capApp = appl.charAt(0).toUpperCase() + appl.slice(1);
    listItem2.push(capApp);
  });

  // Suppression doubles ustensils
  listItem2 = [...new Set([...listItem2])];

  //Ajout ingrédients HTML
  let applianceHTML = "";
  listItem2.forEach((appl) => {
    if (arrayTags.some((e) => e.name.toLowerCase() === appl.toLowerCase())) {
    } else {
      applianceHTML += `
      <li class="itemTag">${appl}</li>
      `;
    }
  });
  document.querySelector(".advListApp").innerHTML = applianceHTML;
}

function displayIngredients(arr) {
  let listItem = [];
  let listItem2 = [];

  arr.forEach((element) => {
    element.ingredients.forEach((element2) => {
      listItem.push(element2.ingredient);
    });
  });

  //Conversion Capitale

  listItem.forEach((ingred) => {
    ingred = ingred.toLowerCase();
    let capIngred = "";
    capIngred = ingred.charAt(0).toUpperCase() + ingred.slice(1);
    listItem2.push(capIngred);
  });

  // Suppression doubles ustensils
  listItem2 = [...new Set([...listItem2])];

  //Ajout ingrédients HTML
  let ingredHtml = "";

  listItem2.forEach((ingred) => {
    if (arrayTags.some((e) => e.name.toLowerCase() === ingred.toLowerCase())) {
    } else {
      ingredHtml += `

<li class="itemTag">${ingred}</li>

`;
    }
  });
  document.querySelector(".advListIngred").innerHTML = ingredHtml;
}

// Listener search bar
searchMain.onclick = function () {
  document.querySelector(".filter-ustensils").className = "filter-ustensils color-ustensils filter-box-min";
  document.querySelector(".filter-ingredients").className = "filter-ingredients color-ingredients filter-box-min";
  document.querySelector(".filter-appliance").className = "filter-appliance color-appliance filter-box-min";
  if (document.documentElement.clientWidth > 849) {
    document.querySelector(".filter").setAttribute("style", "position : inherit");
    document.querySelector(".recipes-list").setAttribute("style", "margin-top: 25px;");
  }
  searchUstens.value = "";
  inputUst = "";
  searchUstens.placeholder = "Ustensiles";
  document.querySelector(".ustensils").className = "ustensils filter-title-input color-ustensils";

  searchIngred.value = "";
  inputIngred = "";
  searchIngred.placeholder = "Ingrédients";
  document.querySelector(".ingredients").className = "ingredients filter-title-input color-ingredients";

  searchAppli.value = "";
  inputApp = "";
  searchAppli.placeholder = "Appareil";
  document.querySelector(".appliance").className = "appliance filter-title-input color-appliance";

  /* resultAppliance = mainResult;
  resultIngredients = mainResult;
  resultUstensils = mainResult; */
  displayRecipes(mainResult);
};

searchMain.addEventListener("input", function () {
  inputMain = searchMain.value.toLowerCase().trim().split(" ");
  inputMain = inputMain.filter((el) => el != "");

  resultOk = [];
  inputMain = [...new Set([...inputMain])];

  if (arrayTags.length < 1) {
    mainResult = recipes;
  }
  if (arrayTags.length >= 1 && inputMain.length === 0) {
    mainResult = recipes;

    mainResult = mainResult.filter((recipe) => {
      let recipeIngred = [];

      recipe.ingredients.forEach((ingred) => {
        recipeIngred.push(ingred.ingredient.toLowerCase());
      });
      //search = [recipe.appliance.toLowerCase(), ...recipeIngred].concat(recipe.ustensils);

      return arrayTags.every((tag) => [recipe.appliance.toLowerCase(), ...recipeIngred].concat(recipe.ustensils).includes(tag.name.toLowerCase()));
    });
    mainResult = [...new Set([...mainResult])];
    /* addTag();
      displayTags();
      rmvTag(); */
  }

  if (arrayTags.length >= 1) {
    mainResult = mainResult.filter((recipe) => {
      let recipeIngred = [];

      recipe.ingredients.forEach((ingred) => {
        recipeIngred.push(ingred.ingredient.toLowerCase());
      });

      return arrayTags.every((tag) => [recipe.appliance.toLowerCase(), ...recipeIngred].concat(recipe.ustensils).includes(tag.name.toLowerCase()));
    });
  }

  if (inputMain.length === 0) {
    resultOk = [true];
  } else {
    if (inputMain[0].length < 3 && inputMain.length < 2) {
      resultOk = [true];
    }
    if (inputMain[0].length >= 3) {
      mainResult = mainResult.filter((recipe) => {
        let recipeIngred = [];

        recipe.ingredients.forEach((ingred) => {
          recipeIngred.push(ingred.ingredient.toLowerCase());
        });

        let search = recipe.name.toLowerCase() + " " + recipeIngred + " " + recipe.description.toLowerCase();

        return inputMain.every((word) => search.includes(word));
      });

      if (mainResult != recipes && mainResult.length != 0) {
        resultOk.push(true);
      }
    }
  }

  displayRecipes(mainResult);
  /* displayUstensils(mainResult);
  displayAppliance(mainResult);
  displayIngredients(mainResult); */
});

// Listener Ustensils
searchUstens.onclick = function () {
  if (document.querySelector(".filter-ingredients").className != "filter-ingredients color-ingredients filter-box-min" || document.querySelector(".filter-appliance").className != "filter-appliance color-appliance filter-box-min") {
    if (document.documentElement.clientWidth > 849) {
      document.querySelector(".filter").setAttribute("style", "position : inherit");
      document.querySelector(".recipes-list").setAttribute("style", "margin-top: 25px;");
    }
  }
  document.querySelector(".filter-ingredients").className = "filter-ingredients color-ingredients filter-box-min";
  document.querySelector(".filter-appliance").className = "filter-appliance color-appliance filter-box-min";
  searchIngred.value = "";
  inputIngred = "";
  searchIngred.placeholder = "Ingrédients";
  document.querySelector(".ingredients").className = "ingredients filter-title-input color-ingredients";

  searchAppli.value = "";
  inputApp = "";
  searchAppli.placeholder = "Appareil";
  document.querySelector(".appliance").className = "appliance filter-title-input color-appliance";

  /* resultAppliance = mainResult;
  resultIngredients = mainResult; */

  if (inputUst.length < 3) {
    displayRecipes(mainResult);
  } else if (inputUst.length > 2) {
    displayRecipes(resultUstensils);
  }

  /* displayAppliance(mainResult);
  displayIngredients(mainResult); */
};

arrowUstens.onclick = function () {
  document.querySelector(".filter-ingredients").className = "filter-ingredients color-ingredients filter-box-min";
  document.querySelector(".filter-appliance").className = "filter-appliance color-appliance filter-box-min";
  searchIngred.value = "";
  inputIngred = "";
  searchIngred.placeholder = "Ingrédients";
  document.querySelector(".ingredients").className = "ingredients filter-title-input color-ingredients";

  searchAppli.value = "";
  inputApp = "";
  searchAppli.placeholder = "Appareil";
  document.querySelector(".appliance").className = "appliance filter-title-input color-appliance";

  searchUstens.value = "";
  inputUst = "";
  searchUstens.placeholder = "Ustensiles";

  /* resultAppliance = mainResult;
  resultIngredients = mainResult;
  resultUstensils = mainResult; */
  /*   displayRecipes(mainResult);
   */ /* displayAppliance(mainResult);
  displayIngredients(mainResult); */
  displayUstensils(mainResult);

  if (document.querySelector(".filter-ustensils").classList.contains("filter-box-min") || document.querySelector(".filter-ustensils").classList.contains("filter-box-med")) {
    if (document.documentElement.clientWidth > 849) {
      document.querySelector(".filter").setAttribute("style", "position : absolute");
      document.querySelector(".recipes-list").setAttribute("style", "margin-top: 160px;");
    }
    document.querySelector(".filter-ustensils").className = "filter-ustensils color-ustensils filter-box-larg";
    searchUstens.placeholder = "Recherche un ustensile";
    document.querySelector(".ustensils").className = "ustensils filter-title-input2 color-ustensils";
  } else if (document.querySelector(".filter-ustensils").classList.contains("filter-box-larg")) {
    if (document.documentElement.clientWidth > 849) {
      document.querySelector(".filter").setAttribute("style", "position : inherit");
      document.querySelector(".recipes-list").setAttribute("style", "margin-top: 25px;");
    }
    document.querySelector(".filter-ustensils").className = "filter-ustensils color-ustensils filter-box-min";
    searchUstens.placeholder = "Ustensiles";
    document.querySelector(".ustensils").className = "ustensils filter-title-input color-ustensils";
  }
  addTag();

  rmvTag();
};

searchUstens.addEventListener("input", function () {
  inputUst = searchUstens.value.toLowerCase().trim();
  resultUstensils = [];

  /* resultAppliance = mainResult;
  resultIngredients = mainResult; */
  let itemList = [];
  let itemList2 = [];

  if (inputUst.length < 3) {
    if (document.querySelector(".filter-ustensils").classList.contains("filter-box-med")) {
      document.querySelector(".filter-ustensils").className = "filter-ustensils color-ustensils filter-box-min";
      if (document.documentElement.clientWidth > 849) {
        document.querySelector(".filter").setAttribute("style", "position : inherit");
        document.querySelector(".recipes-list").setAttribute("style", "margin-top: 25px;");
      }
    }

    displayUstensils(mainResult);
    displayRecipes(mainResult);
    displayAppliance(mainResult);
    displayIngredients(mainResult);
  } else if (inputUst.length >= 3) {
    // Par Ustensils

    if (document.querySelector(".filter-ustensils").classList.contains("filter-box-min")) {
      document.querySelector(".filter-ustensils").className = "filter-ustensils color-ustensils filter-box-med";
      if (document.documentElement.clientWidth > 849) {
        document.querySelector(".filter").setAttribute("style", "position : absolute");
        document.querySelector(".recipes-list").setAttribute("style", "margin-top: 160px;");
      }
    }

    resultUstensils = mainResult.filter((element) => element.ustensils.join(" ").toLowerCase().includes(inputUst.trim().toLowerCase()));

    resultUstensils.forEach((recipe) => {
      recipe.ustensils.forEach((item) => {
        itemList.push(item);
      });
    });

    //Conversion Capitale

    itemList.forEach((ustens) => {
      let capUstens = "";
      capUstens = ustens.charAt(0).toUpperCase() + ustens.slice(1);
      itemList2.push(capUstens);
    });

    // Suppression doubles ustensils
    itemList2 = [...new Set([...itemList2])];

    //Ajout ingrédients HTML
    let ustensilsHTML = "";
    itemList2.forEach((ustens) => {
      if (ustens.toLowerCase().includes(inputUst)) {
        arrayTags;
        if (arrayTags.some((e) => e.name.toLowerCase() === ustens.toLowerCase())) {
        } else {
          ustensilsHTML += `
  
  <li class="itemTag">${ustens}</li>
  
  `;
        }
      }
    });

    if (resultUstensils.length < 1) {
      ustensilsHTML = `<li> Aucun résultat</li>`;
    }

    document.querySelector(".advListUst").innerHTML = ustensilsHTML;

    displayRecipes(resultUstensils);
  }
  addTag();
});

// Appareils

searchAppli.onclick = function () {
  if (document.querySelector(".filter-ingredients").className != "filter-ingredients color-ingredients filter-box-min" || document.querySelector(".filter-ustensils").className != "filter-ustensils color-ustensils filter-box-min") {
    if (document.documentElement.clientWidth > 849) {
      document.querySelector(".filter").setAttribute("style", "position : inherit");
      document.querySelector(".recipes-list").setAttribute("style", "margin-top: 25px;");
    }
  }

  document.querySelector(".filter-ustensils").className = "filter-ustensils color-ustensils filter-box-min";
  document.querySelector(".filter-ingredients").className = "filter-ingredients color-ingredients filter-box-min";
  searchUstens.value = "";
  inputUst = "";
  searchUstens.placeholder = "Ustensiles";
  document.querySelector(".ustensils").className = "ustensils filter-title-input color-ustensils";

  searchIngred.value = "";
  inputIngred = "";
  searchIngred.placeholder = "Ingrédients";
  document.querySelector(".ingredients").className = "ingredients filter-title-input color-ingredients";

  /* resultUstensils = mainResult;
  resultIngredients = mainResult; */

  if (inputApp.length < 3) {
    displayRecipes(mainResult);
  } else if (inputApp.length > 2) {
    displayRecipes(resultAppliance);
  }

  /* displayUstensils(mainResult);
  displayIngredients(mainResult); */

  // rmvTag();
};

arrowAppli.onclick = function () {
  document.querySelector(".filter-ustensils").className = "filter-ustensils color-ustensils filter-box-min";
  document.querySelector(".filter-ingredients").className = "filter-ingredients color-ingredients filter-box-min";
  searchUstens.value = "";
  inputUst = "";
  searchUstens.placeholder = "Ustensiles";
  document.querySelector(".ustensils").className = "ustensils filter-title-input color-ustensils";

  searchAppli.value = "";
  inputApp = "";
  searchAppli.placeholder = "Appareil";
  document.querySelector(".appliance").className = "appliance filter-title-input color-appliance";

  searchIngred.value = "";
  inputIngred = "";
  searchIngred.placeholder = "Ingrédients";
  document.querySelector(".ingredients").className = "ingredients filter-title-input color-ingredients";

  /* resultAppliance = mainResult;
  resultIngredients = mainResult;
  resultUstensils = mainResult; */

  displayRecipes(mainResult);
  displayAppliance(mainResult);
  displayIngredients(mainResult);
  displayUstensils(mainResult);

  if (document.querySelector(".filter-appliance").classList.contains("filter-box-min") || document.querySelector(".filter-appliance").classList.contains("filter-box-med")) {
    if (document.documentElement.clientWidth > 849) {
      document.querySelector(".filter").setAttribute("style", "position : absolute");
      document.querySelector(".recipes-list").setAttribute("style", "margin-top: 160px;");
    }
    document.querySelector(".filter-appliance").className = "filter-appliance color-appliance filter-box-larg";
    searchAppli.placeholder = "Recherche un appareil";
    document.querySelector(".appliance").className = "appliance filter-title-input2 color-appliance";
  } else if (document.querySelector(".filter-appliance").classList.contains("filter-box-larg")) {
    if (document.documentElement.clientWidth > 849) {
      document.querySelector(".filter").setAttribute("style", "position : inherit");
      document.querySelector(".recipes-list").setAttribute("style", "margin-top: 25px;");
    }
    document.querySelector(".filter-appliance").className = "filter-appliance color-appliance filter-box-min";
    searchAppli.placeholder = "Appareil";
    document.querySelector(".appliance").className = "appliance filter-title-input color-appliance";
  }
  addTag();
};

searchAppli.addEventListener("input", function () {
  inputApp = searchAppli.value.toLowerCase().trim();

  /* resultUstensils = mainResult;
  resultIngredients = mainResult; */

  resultAppliance = [];
  let itemList = [];
  let itemList2 = [];
  if (inputApp.length < 3) {
    if (document.querySelector(".filter-appliance").classList.contains("filter-box-med")) {
      document.querySelector(".filter-appliance").className = "filter-appliance color-appliance filter-box-min";
      if (document.documentElement.clientWidth > 849) {
        document.querySelector(".filter").setAttribute("style", "position : inherit");
        document.querySelector(".recipes-list").setAttribute("style", "margin-top: 25px;");
      }
    }
    displayUstensils(mainResult);
    displayRecipes(mainResult);
    displayAppliance(mainResult);
    displayIngredients(mainResult);
  } else if (inputApp.length >= 3) {
    // Par Ustensils
    if (document.querySelector(".filter-appliance").classList.contains("filter-box-min")) {
      document.querySelector(".filter-appliance").className = "filter-appliance color-appliance filter-box-med";
      if (document.documentElement.clientWidth > 849) {
        document.querySelector(".filter").setAttribute("style", "position : absolute");
        document.querySelector(".recipes-list").setAttribute("style", "margin-top: 160px;");
      }
    }

    resultAppliance = mainResult.filter((item) => item.appliance.toLowerCase().includes(inputApp.trim().toLowerCase()));

    resultAppliance.forEach((element) => {
      itemList.push(element.appliance);
    });

    //Conversion Capitale
    itemList.forEach((appl) => {
      let capApp = "";

      capApp = appl.charAt(0).toUpperCase() + appl.slice(1);

      itemList2.push(capApp);
    });

    // Suppression doubles ustensils
    itemList2 = [...new Set([...itemList2])];

    //Ajout ingrédients HTML
    let applianceHTML = "";
    itemList2.forEach((appl) => {
      if (appl.toLowerCase().includes(inputApp)) {
        if (arrayTags.some((e) => e.name.toLowerCase() === appl.toLowerCase())) {
        } else {
          applianceHTML += `
  
        <li class = "itemTag" >${appl}</li>
        
        `;
        }
      }
    });

    if (resultAppliance.length < 1) {
      applianceHTML = `<li> Aucun résultat</li>`;
    }
    document.querySelector(".advListApp").innerHTML = applianceHTML;

    displayRecipes(resultAppliance);
  }
  addTag();
});

// Ingrédients

searchIngred.onclick = function () {
  if (document.querySelector(".filter-appliance").className != "filter-appliance color-appliance filter-box-min" || document.querySelector(".filter-ustensils").className != "filter-ustensils color-ustensils filter-box-min") {
    if (document.documentElement.clientWidth > 849) {
      document.querySelector(".filter").setAttribute("style", "position : inherit");
      document.querySelector(".recipes-list").setAttribute("style", "margin-top: 25px;");
    }
  }
  document.querySelector(".filter-ustensils").className = "filter-ustensils color-ustensils filter-box-min";
  document.querySelector(".filter-appliance").className = "filter-appliance color-appliance filter-box-min";

  searchUstens.value = "";
  inputUst = "";
  searchUstens.placeholder = "Ustensiles";
  searchAppli.value = "";
  inputApp = "";
  searchAppli.placeholder = "Appareil";
  document.querySelector(".appliance").className = "appliance filter-title-input color-appliance";

  /* resultAppliance = mainResult;
  resultUstensils = mainResult; */

  if (inputIngred.length < 3) {
    displayRecipes(mainResult);
  } else if (inputIngred.length > 2) {
    displayRecipes(resultIngredients);
  }
  /* displayAppliance(mainResult);
  displayUstensils(mainResult); */
};

arrowIngred.onclick = function () {
  document.querySelector(".filter-ustensils").className = "filter-ustensils color-ustensils filter-box-min";
  document.querySelector(".filter-appliance").className = "filter-appliance color-appliance filter-box-min";
  searchIngred.value = "";
  inputIngred = "";
  searchIngred.placeholder = "Ingrédients";
  document.querySelector(".ingredients").className = "ingredients filter-title-input color-ingredients";

  searchUstens.value = "";
  searchUstens.placeholder = "Ustensiles";
  document.querySelector(".ustensils").className = "ustensils filter-title-input color-ustensils";

  searchAppli.value = "";
  inputApp = "";
  searchAppli.placeholder = "Appareil";
  document.querySelector(".appliance").className = "appliance filter-title-input color-appliance";

  /* resultAppliance = mainResult;
  resultIngredients = mainResult;
  resultUstensils = mainResult; */
  /* displayRecipes(mainResult);
  displayAppliance(mainResult); */
  displayIngredients(mainResult);
  /* displayUstensils(mainResult); */

  if (document.querySelector(".filter-ingredients").classList.contains("filter-box-min") || document.querySelector(".filter-ingredients").classList.contains("filter-box-med")) {
    if (document.documentElement.clientWidth > 849) {
      document.querySelector(".filter").setAttribute("style", "position : absolute");
      document.querySelector(".recipes-list").setAttribute("style", "margin-top: 160px;");
    }
    document.querySelector(".filter-ingredients").className = "filter-ingredients color-ingredients filter-box-larg";
    searchIngred.placeholder = "Recherche un ingrédient";
    document.querySelector(".ingredients").className = "ingredients filter-title-input2 color-ingredients";
  } else if (document.querySelector(".filter-ingredients").classList.contains("filter-box-larg")) {
    document.querySelector(".filter-ingredients").className = "filter-ingredients color-ingredients filter-box-min";
    if (document.documentElement.clientWidth > 849) {
      document.querySelector(".filter").setAttribute("style", "position : inherit");
      document.querySelector(".recipes-list").setAttribute("style", "margin-top: 25px;");
    }
    searchIngred.placeholder = "Ingrédients";
    document.querySelector(".ingredients").className = "ingredients filter-title-input color-ingredients";
  }
  addTag();
};

searchIngred.addEventListener("input", function () {
  inputIngred = searchIngred.value.toLowerCase().trim();
  /* resultAppliance = mainResult;
  resultUstensils = mainResult; */

  let itemList = [];
  let itemList2 = [];

  if (inputIngred.length < 3) {
    if (document.querySelector(".filter-ingredients").classList.contains("filter-box-med")) {
      document.querySelector(".filter-ingredients").className = "filter-ingredients color-ingredients filter-box-min";
      if (document.documentElement.clientWidth > 849) {
        document.querySelector(".filter").setAttribute("style", "position : inherit");
        document.querySelector(".recipes-list").setAttribute("style", "margin-top: 25px;");
      }
    }
    displayUstensils(mainResult);
    displayRecipes(mainResult);
    displayAppliance(mainResult);
    displayIngredients(mainResult);
  } else if (inputIngred.length >= 3) {
    if (document.querySelector(".filter-ingredients").classList.contains("filter-box-min")) {
      document.querySelector(".filter-ingredients").className = "filter-ingredients color-ingredients filter-box-med";
      if (document.documentElement.clientWidth > 849) {
        document.querySelector(".filter").setAttribute("style", "position : absolute");
        document.querySelector(".recipes-list").setAttribute("style", "margin-top: 160px;");
      }
    }

    resultIngredients = [];
    mainResult.forEach((element) => {
      element.ingredients.forEach((element2) => {
        if (element2.ingredient.toLowerCase().includes(inputIngred.trim().toLowerCase())) {
          resultIngredients.push(element);
        }
      });
    });
    resultIngredients = [...new Set([...resultIngredients])];

    resultIngredients.forEach((element) => {
      element.ingredients.forEach((element2) => {
        itemList.push(element2.ingredient);
      });
    });

    //Conversion Capitale

    itemList2 = [];

    itemList.forEach((ingred) => {
      ingred = ingred.toLowerCase();
      let capIngred = "";
      capIngred = ingred.charAt(0).toUpperCase() + ingred.slice(1);
      itemList2.push(capIngred);
    });

    // Suppression doubles ingred
    itemList2 = [...new Set([...itemList2])];

    //Ajout ingrédients HTML
    let ingredHtml = "";

    itemList2.forEach((ingred) => {
      if (ingred.toLowerCase().includes(inputIngred)) {
        if (arrayTags.some((e) => e.name.toLowerCase() === ingred.toLowerCase())) {
        } else {
          ingredHtml += `
  
        <li class="itemTag">${ingred}</li>
        
        `;
        }
      }
    });
    if (resultIngredients.length < 1) {
      ingredHtml = `<li> Aucun résultat</li>`;
    }
    document.querySelector(".advListIngred").innerHTML = ingredHtml;

    displayRecipes(resultIngredients);
  }
  addTag();
});

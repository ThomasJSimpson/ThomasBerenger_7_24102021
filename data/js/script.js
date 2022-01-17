const searchMain = document.querySelector(".search-field");
const searchIngred = document.querySelector(".ingredients");
const searchAppli = document.querySelector(".appliance");
const searchUstens = document.querySelector(".ustensils");
const arrowUstens = document.getElementById("arrowUstens");
const arrowAppli = document.getElementById("arrowAppli");
const arrowIngred = document.getElementById("arrowIngred");
let crossTag = document.querySelectorAll(".cross");
let list = document.querySelector(".advList");

/* let itemUstensil2 =  */

let suggestion = "";
/* let ingredRecipHtml = ""; */
let ingredHtml = "";
let applianceHTML = "";
let applianceHTMLAdv = "";
let ustensilsHTML = "";
let ustensilsHTMLAdv = "";
let tagsHtml = "";
let tagsHtmlAdv = "";

let mainResult = recipes;
let mainResultMemo = [];
let ustensilsList = "";
let resultIngredients = [];
let resultIngredientsAdv = [];
let resultUstensils = [];
let resultAppliance = [];
let resultAll = [];
let resultAll2 = [];
let arrayTest = [];
let arrayTestAdv = [];
let mainResult2 = [];
let resultOk = [true];

let arrayTest2 = [];
let arrayTest2Adv = [];
let arrayTestApp = [];
let arrayTest2App = [];
let arrayTestIngred = [];
let arrayTest2Ingred = [];
let arrayTestIngredAdv = [];
let arrayTest2IngredAdv = [];
let arrayTags = [];
let arrayRecipesTags0 = [];
let arrayRecipesTags = [];

let newArray = [];
let boolArr = [];
let recipeIngred1 = [];
let arr = [];

let inputMain = searchMain.value.toLowerCase().trim().split(" ");
let inputUst = searchUstens.value.toLowerCase().trim();
let inputApp = searchAppli.value.toLowerCase().trim();
let inputIngred = searchIngred.value.toLowerCase().trim();
let itemTag = [];
let itemTag2 = [];

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
displayUstensils(mainResult);
displayAppliance(mainResult);
displayIngredients(mainResult);

function resHtml() {
  ustensilsHTML = "";
  ustensilsHTMLAdv = "";
  applianceHTML = "";
  applianceHTMLAdv = "";
  ingredHtml = "";
  //ingredHtmlAdv = "";
  suggestion = "";
}

// Ajouter un tag
function addTag() {
  itemTag = document.querySelectorAll(".itemTag");

  itemTag.forEach((element) => {
    element.addEventListener("click", function () {
      resHtml();

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
        console.log("ajout");

        console.log(arrayTags);
      }

      arrayRecipesTags = mainResult.filter((recipe) => {
        let recipeIngred = [];

        recipe.ingredients.forEach((ingred) => {
          recipeIngred.push(ingred.ingredient.toLowerCase());
        });
        //search = [recipe.appliance.toLowerCase(), ...recipeIngred].concat(recipe.ustensils);

        return arrayTags.every((tag) => [recipe.appliance.toLowerCase(), ...recipeIngred].concat(recipe.ustensils).includes(tag.name.toLowerCase()));
      });

      //console.log(arrayRecipesTags);
      arrayRecipesTags = [...new Set([...arrayRecipesTags])];
      mainResult = arrayRecipesTags;
      displayRecipes(mainResult);
      console.log(mainResult);
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
  tagsHtml = "";

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
  crossTag = document.querySelectorAll(".cross");

  crossTag.forEach((element) => {
    element.addEventListener("click", function () {
      resHtml();
      console.log("avant retrait");
      console.log(arrayTags);
      ////////////////////////////////////////////////////////////////////////////////
      // Retrait objet/tag du tableau de référence
      arrayTags.forEach((f) => {
        console.log(f.name);
        console.log(element.previousElementSibling.innerText);

        if (f.name === element.previousElementSibling.innerText) {
          arrayTags = arrayRemove(arrayTags, f);
        }
      });

      console.log("après retrait");
      console.log(arrayTags);

      ////////////////////////////////////////////////////////////////////////////////

      //////////////////////////////////////// Mise a jour affichage des TAGS

      tagsHtml = "";
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

      if (inputMain.length === 0) {
        mainResult = recipes;
      } else {
        if (inputMain[0].length >= 3) {
          mainResult = mainResultMemo;
        }
        if (arrayTags.length === 0 && inputMain[0].length >= 3) {
          //mainResult = recipes;
          mainResult = mainResult.filter((recipe) => {
            let recipeIngred1 = [];

            recipe.ingredients.forEach((ingred) => {
              recipeIngred1.push(ingred.ingredient.toLowerCase());
            });

            search = recipe.name.toLowerCase() + " " + recipeIngred1 + " " + recipe.description.toLowerCase();

            return inputMain.every((word) => search.includes(word));
          });

          console.log(search);

          mainResultMemo = mainResult;

          if (mainResult != recipes) {
            resultOk.push(true);
          }
        } else {
          mainResult = recipes;
        }
      }

      arrayRecipesTags = mainResult.filter((recipe) => {
        let recipeIngred = [];

        recipe.ingredients.forEach((ingred) => {
          recipeIngred.push(ingred.ingredient.toLowerCase());
        });
        //search = [recipe.appliance.toLowerCase(), ...recipeIngred].concat(recipe.ustensils);

        return arrayTags.every((tag) => [recipe.appliance.toLowerCase(), ...recipeIngred].concat(recipe.ustensils).includes(tag.name.toLowerCase()));
      });

      console.log(arrayRecipesTags);
      arrayRecipesTags = [...new Set([...arrayRecipesTags])];
      mainResult = arrayRecipesTags;
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
}

function displayUstensils(arr) {
  arrayTest = [];
  arrayTest2 = [];

  arr.forEach((recipe) => {
    recipe.ustensils.forEach((item) => {
      arrayTest.push(item);
    });
  });

  //Conversion Capitale

  arrayTest.forEach((ustens) => {
    let capUstens = "";
    capUstens = ustens.charAt(0).toUpperCase() + ustens.slice(1);
    arrayTest2.push(capUstens);
  });

  // Suppression doubles ustensils
  arrayTest2 = [...new Set([...arrayTest2])];

  //Ajout ingrédients HTML

  arrayTest2.forEach((ustens) => {
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
  arrayTestApp = [];

  arr.forEach((element) => {
    arrayTestApp.push(element.appliance);
  });

  //Conversion Capitale
  arrayTest2App = [];

  arrayTestApp.forEach((appl) => {
    let capApp = "";
    capApp = appl.charAt(0).toUpperCase() + appl.slice(1);
    arrayTest2App.push(capApp);
  });

  // Suppression doubles ustensils
  arrayTest2App = [...new Set([...arrayTest2App])];

  //Ajout ingrédients HTML

  arrayTest2App.forEach((appl) => {
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
  arrayTestIngred = [];

  arr.forEach((element) => {
    element.ingredients.forEach((element2) => {
      arrayTestIngred.push(element2.ingredient);
    });
  });

  //Conversion Capitale
  arrayTest2Ingred = [];

  arrayTestIngred.forEach((ingred) => {
    ingred = ingred.toLowerCase();
    let capIngred = "";
    capIngred = ingred.charAt(0).toUpperCase() + ingred.slice(1);
    arrayTest2Ingred.push(capIngred);
  });

  // Suppression doubles ustensils
  arrayTest2Ingred = [...new Set([...arrayTest2Ingred])];

  //Ajout ingrédients HTML
  let ingredHtml = "";

  arrayTest2Ingred.forEach((ingred) => {
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
  searchUstens.placeholder = "Ustensiles";
  document.querySelector(".ustensils").className = "ustensils filter-title-input color-ustensils";

  searchIngred.value = "";
  searchIngred.placeholder = "Ingrédients";
  document.querySelector(".ingredients").className = "ingredients filter-title-input color-ingredients";

  searchIngred.value = "";
  searchAppli.placeholder = "Appareil";
  document.querySelector(".appliance").className = "appliance filter-title-input color-appliance";

  searchAppli.value = "";
  resHtml();
  displayRecipes(mainResult);
  //console.log(mainResult);

  resultAppliance = mainResult;
  resultIngredients = mainResult;
  resultUstensils = mainResult;
  //rmvTag();
};

searchMain.addEventListener("input", function () {
  inputMain = searchMain.value.toLowerCase().trim().split(" ");
  inputMain = inputMain.filter((el) => el != "");
  resHtml();
  mainResult2 = [];
  resultOk = [];
  inputMain = [...new Set([...inputMain])];

  if (arrayTags.length < 1) {
    mainResult = recipes;
  }
  if (arrayTags.length >= 1 && inputMain.length === 0) {
    mainResult = recipes;

    arrayRecipesTags = mainResult.filter((recipe) => {
      let recipeIngred = [];

      recipe.ingredients.forEach((ingred) => {
        recipeIngred.push(ingred.ingredient.toLowerCase());
      });
      //search = [recipe.appliance.toLowerCase(), ...recipeIngred].concat(recipe.ustensils);

      return arrayTags.every((tag) => [recipe.appliance.toLowerCase(), ...recipeIngred].concat(recipe.ustensils).includes(tag.name.toLowerCase()));
    });
    arrayRecipesTags = [...new Set([...arrayRecipesTags])];
    mainResult = arrayRecipesTags;
    /* addTag();
      displayTags();
      rmvTag(); */
  }

  if (arrayTags.length >= 1) {
    mainResult = arrayRecipesTags;
    console.log(arrayRecipesTags);
  }

  if (inputMain.length === 0) {
    resultOk = [true];
  } else {
    if (inputMain[0].length < 3 && inputMain.length < 2) {
      resultOk = [true];
    }
    if (inputMain[0].length >= 3) {
      //////////// Version Programmation fonctionnelle //////////////

      /* mainResult = mainResult.filter((recipe) => {
        let recipeIngred1 = [];

        recipe.ingredients.forEach((ingred) => {
          recipeIngred1.push(ingred.ingredient.toLowerCase());
        });

        search = recipe.name.toLowerCase() + " " + recipeIngred1 + " " + recipe.description.toLowerCase();

        return inputMain.every((word) => search.includes(word));
      });

      console.log(search);

      mainResultMemo = mainResult;
      console.log(mainResult);
      console.log(recipes);

      if (mainResult != recipes && mainResult.length != 0) {
        resultOk.push(true);
      } */
      /////////////////////////////////////////////////////////////

      //////////// Première version Boucles Natives //////////////

      for (recipe of mainResult) {
        let boolArr = [];
        let recipeIngred1 = [];
        let arr = [];

        for (let ingred of recipe.ingredients) {
          recipeIngred1.push(ingred.ingredient.toLowerCase());
        }

        let search = recipe.name.toLowerCase() + " " + recipeIngred1.join(" ") + " " + recipe.description.toLowerCase();

        ///Suppression ponctuation

        for (let el of search) {
          if (el === "." || el === "," || el === ":" || el === "(" || el === ")" || el === "!") {
          } else {
            arr.push(el);
          }
        }

        search = arr.join("");

        search = search.split(" ");

        inputLoop: for (let wordInput of inputMain) {
          for (let wordSearch of search) {
            for (let i = 0; i < wordSearch.length; i++) {
              if (wordInput[0] === wordSearch[i]) {
                let stringTest = wordSearch.slice(i, i + wordInput.length);

                if (stringTest === wordInput) {
                  boolArr.push(wordInput);
                  /* i = wordSearch.length; */
                  continue inputLoop;
                }
              }
            }
          }
        }

        /* boolArr = [...new Set([...boolArr])]; */


        if (boolArr.length === inputMain.length) {
          

          mainResult2.push(recipe);
          mainResult = mainResult2;
          mainResultMemo = mainResult;
          resultOk.push(true);
        }
      }
      ////////////////////////////////////////////
    }
  }

  displayRecipes(mainResult);
  displayUstensils(mainResult);
  displayAppliance(mainResult);
  displayIngredients(mainResult);
  console.log("Recherche générale");
  console.log(mainResult);
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
  searchIngred.placeholder = "Ingrédients";
  document.querySelector(".ingredients").className = "ingredients filter-title-input color-ingredients";

  searchAppli.value = "";
  searchAppli.placeholder = "Appareil";
  document.querySelector(".appliance").className = "appliance filter-title-input color-appliance";

  resHtml();
  resultAppliance = mainResult;
  resultIngredients = mainResult;

  if (inputUst.length < 3) {
    displayRecipes(mainResult);
  } else if (inputUst.length > 2) {
    resHtml();
    displayRecipes(resultUstensils);
  }

  displayAppliance(mainResult);
  displayIngredients(mainResult);
};

arrowUstens.onclick = function () {
  document.querySelector(".filter-ingredients").className = "filter-ingredients color-ingredients filter-box-min";
  document.querySelector(".filter-appliance").className = "filter-appliance color-appliance filter-box-min";
  searchIngred.value = "";
  searchIngred.placeholder = "Ingrédients";
  document.querySelector(".ingredients").className = "ingredients filter-title-input color-ingredients";

  searchAppli.value = "";
  searchAppli.placeholder = "Appareil";
  document.querySelector(".appliance").className = "appliance filter-title-input color-appliance";

  searchUstens.value = "";
  searchUstens.placeholder = "Ustensiles";

  resHtml();
  resultAppliance = mainResult;
  resultIngredients = mainResult;
  resultUstensils = mainResult;
  displayRecipes(mainResult);
  displayAppliance(mainResult);
  displayIngredients(mainResult);
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
  resHtml();
  resultAppliance = mainResult;
  resultIngredients = mainResult;
  arrayTestAdv = [];
  arrayTest2Adv = [];

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
        arrayTestAdv.push(item);
      });
    });

    //Conversion Capitale

    arrayTestAdv.forEach((ustens) => {
      let capUstens = "";
      capUstens = ustens.charAt(0).toUpperCase() + ustens.slice(1);
      arrayTest2Adv.push(capUstens);
    });

    // Suppression doubles ustensils
    arrayTest2Adv = [...new Set([...arrayTest2Adv])];

    //Ajout ingrédients HTML

    arrayTest2Adv.forEach((ustens) => {
      if (ustens.toLowerCase().includes(inputUst)) {
        arrayTags;
        if (arrayTags.some((e) => e.name.toLowerCase() === ustens.toLowerCase())) {
        } else {
          ustensilsHTMLAdv += `
  
  <li class="itemTag">${ustens}</li>
  
  `;
        }
      }
    });

    if (resultUstensils.length < 1) {
      ustensilsHTMLAdv = `<li> Aucun résultat</li>`;
    }

    document.querySelector(".advListUst").innerHTML = ustensilsHTMLAdv;

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
  searchUstens.placeholder = "Ustensiles";
  document.querySelector(".ustensils").className = "ustensils filter-title-input color-ustensils";

  searchIngred.value = "";
  searchIngred.placeholder = "Ingrédients";
  document.querySelector(".ingredients").className = "ingredients filter-title-input color-ingredients";

  resHtml();
  resultUstensils = mainResult;
  resultIngredients = mainResult;

  if (inputApp.length < 3) {
    displayRecipes(mainResult);
  } else if (inputApp.length > 2) {
    resHtml();
    displayRecipes(resultAppliance);
  }

  displayUstensils(mainResult);
  displayIngredients(mainResult);

  // rmvTag();
};

arrowAppli.onclick = function () {
  document.querySelector(".filter-ustensils").className = "filter-ustensils color-ustensils filter-box-min";
  document.querySelector(".filter-ingredients").className = "filter-ingredients color-ingredients filter-box-min";
  searchUstens.value = "";
  searchUstens.placeholder = "Ustensiles";
  document.querySelector(".ustensils").className = "ustensils filter-title-input color-ustensils";

  searchAppli.value = "";
  searchAppli.placeholder = "Appareil";
  document.querySelector(".appliance").className = "appliance filter-title-input color-appliance";

  searchIngred.value = "";
  searchIngred.placeholder = "Ingrédients";
  document.querySelector(".ingredients").className = "ingredients filter-title-input color-ingredients";

  resHtml();
  resultAppliance = mainResult;
  resultIngredients = mainResult;
  resultUstensils = mainResult;

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

  resHtml();
  resultUstensils = mainResult;
  resultIngredients = mainResult;

  resultAppliance = [];
  let arrayTestAppAdv = [];
  let arrayTest2AppAdv = [];
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
      arrayTestAppAdv.push(element.appliance);
    });

    //Conversion Capitale
    arrayTestAppAdv.forEach((appl) => {
      let capApp = "";

      capApp = appl.charAt(0).toUpperCase() + appl.slice(1);

      arrayTest2AppAdv.push(capApp);
    });

    // Suppression doubles ustensils
    arrayTest2AppAdv = [...new Set([...arrayTest2AppAdv])];

    //Ajout ingrédients HTML

    arrayTest2AppAdv.forEach((appl) => {
      if (appl.toLowerCase().includes(inputApp)) {
        if (arrayTags.some((e) => e.name.toLowerCase() === appl.toLowerCase())) {
        } else {
          applianceHTMLAdv += `
  
        <li class = "itemTag" >${appl}</li>
        
        `;
        }
      }
    });

    if (resultAppliance.length < 1) {
      applianceHTMLAdv = `<li> Aucun résultat</li>`;
    }
    document.querySelector(".advListApp").innerHTML = applianceHTMLAdv;

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
  searchUstens.placeholder = "Ustensiles";
  searchAppli.value = "";
  searchAppli.placeholder = "Appareil";
  document.querySelector(".appliance").className = "appliance filter-title-input color-appliance";

  resHtml();
  resultAppliance = mainResult;
  resultUstensils = mainResult;

  if (inputIngred.length < 3) {
    displayRecipes(mainResult);
  } else if (inputIngred.length > 2) {
    resHtml();
    displayRecipes(resultIngredients);
  }
  displayAppliance(mainResult);
  displayUstensils(mainResult);
};

arrowIngred.onclick = function () {
  document.querySelector(".filter-ustensils").className = "filter-ustensils color-ustensils filter-box-min";
  document.querySelector(".filter-appliance").className = "filter-appliance color-appliance filter-box-min";
  searchIngred.value = "";
  searchIngred.placeholder = "Ingrédients";
  document.querySelector(".ingredients").className = "ingredients filter-title-input color-ingredients";

  searchUstens.value = "";
  searchUstens.placeholder = "Ustensiles";
  document.querySelector(".ustensils").className = "ustensils filter-title-input color-ustensils";

  searchAppli.value = "";
  searchAppli.placeholder = "Appareil";
  document.querySelector(".appliance").className = "appliance filter-title-input color-appliance";

  resHtml();
  resultAppliance = mainResult;
  resultIngredients = mainResult;
  resultUstensils = mainResult;
  displayRecipes(mainResult);
  displayAppliance(mainResult);
  displayIngredients(mainResult);
  displayUstensils(mainResult);

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
  resHtml();

  resultAppliance = mainResult;
  resultUstensils = mainResult;

  arrayTestIngredAdv = [];
  arrayTest2IngredAdv = [];

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
        arrayTestIngredAdv.push(element2.ingredient);
      });
    });

    //Conversion Capitale

    arrayTest2IngredAdv = [];

    arrayTestIngredAdv.forEach((ingred) => {
      ingred = ingred.toLowerCase();
      let capIngred = "";
      capIngred = ingred.charAt(0).toUpperCase() + ingred.slice(1);
      arrayTest2IngredAdv.push(capIngred);
    });

    // Suppression doubles ingred
    arrayTest2IngredAdv = [...new Set([...arrayTest2IngredAdv])];

    //Ajout ingrédients HTML
    let ingredHtmlAdv = "";

    arrayTest2IngredAdv.forEach((ingred) => {
      if (ingred.toLowerCase().includes(inputIngred)) {
        if (arrayTags.some((e) => e.name.toLowerCase() === ingred.toLowerCase())) {
        } else {
          ingredHtmlAdv += `
  
        <li class="itemTag">${ingred}</li>
        
        `;
        }
      }
    });
    if (resultIngredients.length < 1) {
      ingredHtmlAdv = `<li> Aucun résultat</li>`;
    }
    document.querySelector(".advListIngred").innerHTML = ingredHtmlAdv;

    displayRecipes(resultIngredients);
  }
  addTag();
});

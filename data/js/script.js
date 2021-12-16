const searchMain = document.querySelector(".search-field");
const searchIngred = document.querySelector(".ingredients");
const searchAppli = document.querySelector(".appliance");
const searchUstens = document.querySelector(".ustensils");
const arrowUstens = document.getElementById("arrowUstens");
const arrowAppli = document.getElementById("arrowAppli");
const arrowIngred = document.getElementById("arrowIngred");
/* let itemUstensil2 =  */

let suggestion = "";
let ingredRecipHtml = "";
let ingredHtml = "";
let ingredHtmlAdv = "";
let applianceHTML = "";
let applianceHTMLAdv = "";
let ustensilsHTML = "";
let ustensilsHTMLAdv = "";
let tagsHtml = "";
let tagsHtmlAdv = "";
let arrFiltered = [];

let resultAllWords = recipes;
let resultAllWordsMemo = recipes;
let ustensilsList = "";
let resultIngredients = [];
let resultIngredientsAdv = [];
let resultUstensils = [];
let resultAppliance = [];
let resultAll = [];
let resultAll2 = [];
let arrayTest = [];
let arrayTestAdv = [];

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

let inputMain = searchMain.value.toLowerCase().trim().split(" ");
let inputUst = searchUstens.value.toLowerCase().trim();
let inputApp = searchAppli.value.toLowerCase().trim();
let inputIngred = searchIngred.value.toLowerCase().trim();
let itemTag = [];
let itemTag2 = [];

displayRecipes(resultAllWords);
displayUstensils(resultAllWords);
displayAppliance(resultAllWords);
displayIngredients(resultAllWords);

function resHtml() {
  ustensilsHTML = "";
  ustensilsHTMLAdv = "";

  applianceHTML = "";
  applianceHTMLAdv = "";

  ingredHtml = "";
  ingredHtmlAdv = "";

  suggestion = "";
  /*  resultUstensils = resultAllWords;
resultAppliance = resultAllWords;
resultIngredients = resultAllWords; */
}
// Ajouter un tag
function addTag(cat) {
  itemTag = document.querySelectorAll(".itemTag");

  itemTag.forEach((element) => {
    element.addEventListener("click", function () {
      resHtml();

      // Memorisation du tableau sans tags
      if (arrayTags.length < 1) {
        resultAllWordsMemo = resultAllWords;
        //console.log(resultAllWordsMemo);
      }

      if (arrayTags.includes(element.innerText.toLowerCase())) {
      } else {
        tagsHtml += `      <div class= "tags-item color-${cat}">
    <p>${element.innerText}</p>
    <img src="./assets/images/cross.svg" alt="cross" class="cross"/> 
  </div>      `;
        document.querySelector(".tags").innerHTML = tagsHtml;
        arrayTags.push(element.innerText.toLowerCase());
      }

      //arrayTags = ['Couteau']
      //console.log(arrayTags);
      
      arrayRecipesTags = resultAllWords.filter((recipe) => {
        let recipeIngred = [];

        recipe.ingredients.forEach((ingred) => {
          recipeIngred.push(ingred.ingredient.toLowerCase());
        });
        //search = [recipe.appliance.toLowerCase(), ...recipeIngred].concat(recipe.ustensils);

        return arrayTags.every((word) => [recipe.appliance.toLowerCase(), ...recipeIngred].concat(recipe.ustensils).includes(word));
      });

      //console.log(arrayRecipesTags);
      arrayRecipesTags = [...new Set([...arrayRecipesTags])];
      resultAllWords = arrayRecipesTags;
      displayRecipes(resultAllWords);
      console.log(resultAllWords);
      displayAppliance(resultAllWords);
      displayIngredients(resultAllWords);
      displayUstensils(resultAllWords);
      if (document.querySelector(".filter-ustensils").classList.contains("filter-box-med")) {
        document.querySelector(".filter-ustensils").className = "filter-ustensils color-ustensils filter-box-min";
        searchUstens.value = "";
        searchUstens.placeholder = "Ustensiles";
      }
      if (document.querySelector(".filter-appliance").classList.contains("filter-box-med")) {
        document.querySelector(".filter-appliance").className = "filter-appliance color-appliance filter-box-min";
        searchAppli.value = "";
        searchAppli.placeholder = "Appareil";
      }
      if (document.querySelector(".filter-ingredients").classList.contains("filter-box-med")) {
        document.querySelector(".filter-ingredients").className = "filter-ingredients color-ingredients filter-box-min";
        searchIngred.value = "";
        searchIngred.placeholder = "Ingrédients";
      }
    });
  });
}

// retirer un tags

/* function rmvTag(cat){
} */

//cross.forEach((img) =>

//    Afficher les recettes par défaut

function displayRecipes(arr) {
  for (recipe of arr) {
    ingredRecipHtml = "";
    for (item of recipe.ingredients) {
      if (typeof item.quantity === "undefined" && typeof item.unit === "undefined") {
        ingredRecipHtml += `
          
        <p>${item.ingredient}</p>
        
  `;
      } else if (typeof item.unit === "undefined") {
        ingredRecipHtml += `
        
            <p>${item.ingredient} : ${item.quantity}</p>
            
      `;
      } else {
        ingredRecipHtml += `
        
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
  }
  document.querySelector(".recipes-list").innerHTML = suggestion;
  rmvTag();
}

function displayUstensils(arr) {
  arrayTest = [];
  arrayTest2 = [];
  for (recipe of arr) {
    for (item of recipe.ustensils) {
      arrayTest.push(item);
    }
  }

  //Conversion Capitale

  for (ustens of arrayTest) {
    let capUstens = "";
    capUstens = ustens.charAt(0).toUpperCase() + ustens.slice(1);
    arrayTest2.push(capUstens);
  }

  // Suppression doubles ustensils
  arrayTest2 = [...new Set([...arrayTest2])];

  //Ajout ingrédients HTML

  for (ustens of arrayTest2) {
    if (arrayTags.includes(ustens.toLowerCase())) {
    } else {
      ustensilsHTML += `

      <p class="itemTag"> ${ustens} </p>
      
      `;
    }
  }

  document.querySelector(".advListUst").innerHTML = ustensilsHTML;
  addTag("ustensils");
  rmvTag();
}
//addTag();

function displayAppliance(arr) {
  // console.log(arr);
  arrayTestApp = [];

  arr.forEach((element) => {
    arrayTestApp.push(element.appliance);
  });

  //Conversion Capitale
  arrayTest2App = [];
  for (appl of arrayTestApp) {
    let capApp = "";
    //console.log(appl);
    capApp = appl.charAt(0).toUpperCase() + appl.slice(1);
    //console.log(capApp);
    arrayTest2App.push(capApp);
  }

  // Suppression doubles ustensils
  arrayTest2App = [...new Set([...arrayTest2App])];

  //Ajout ingrédients HTML

  for (appl of arrayTest2App) {
    if (arrayTags.includes(appl.toLowerCase())) {
    } else {
      applianceHTML += `
      <p class="itemTag">${appl}</p>
      `;
    }
  }

  document.querySelector(".advListApp").innerHTML = applianceHTML;
  addTag("appliance");
  rmvTag();
}

function displayIngredients(arr) {
  // console.log(arr);
  arrayTestIngred = [];

  arr.forEach((element) => {
    element.ingredients.forEach((element2) => {
      //console.log(element2.ingredient);
      arrayTestIngred.push(element2.ingredient);
      //console.log(arrayTestIngred);
    });
  });

  //console.log(arrayTestIngred);
  // console.log(arrayTest);

  //Conversion Capitale
  arrayTest2Ingred = [];
  for (ingred of arrayTestIngred) {
    ingred = ingred.toLowerCase();
    let capIngred = "";
    capIngred = ingred.charAt(0).toUpperCase() + ingred.slice(1);
    arrayTest2Ingred.push(capIngred);
  }

  // console.log(arrayTest2);
  // Suppression doubles ustensils
  arrayTest2Ingred = [...new Set([...arrayTest2Ingred])];
  //console.log(arrayTest2Ingred);

  //Ajout ingrédients HTML

  for (ingred of arrayTest2Ingred) {
    if (arrayTags.includes(ingred.toLowerCase())) {
    } else {
      ingredHtml += `

<p class="itemTag">${ingred}</p>

`;
    }
  }
  document.querySelector(".advListIngred").innerHTML = ingredHtml;
  addTag("ingredients");
  rmvTag();
}

// Listener search bar
searchMain.onclick = function () {
  document.querySelector(".filter-ustensils").className = "filter-ustensils color-ustensils filter-box-min";
  document.querySelector(".filter-ingredients").className = "filter-ingredients color-ingredients filter-box-min";
  document.querySelector(".filter-appliance").className = "filter-appliance color-appliance filter-box-min";
  searchUstens.value = "";
  searchUstens.placeholder = "Ustensiles";
  searchIngred.value = "";
  searchIngred.placeholder = "Ingrédients";
  searchIngred.value = "";
  searchAppli.placeholder = "Appareil";
  searchAppli.value = "";
  resHtml();
  displayRecipes(resultAllWords);
  //console.log(resultAllWords);

  resultAppliance = resultAllWords;
  resultIngredientsAdv = resultAllWords;
  resultUstensils = resultAllWords;
  rmvTag();
};
searchMain.addEventListener("input", function () {
  inputMain = searchMain.value.toLowerCase().trim().split(" ");
  resHtml();

  //////////////////////////
  if (arrayTags.length < 1) {
    resultAllWords = recipes;
  }
  if (arrayTags.length >= 1) {
    resultAllWords = arrayRecipesTags;
  }

  if (inputMain[0].length < 3 && inputMain.length < 2) {
    ustensilsHTML = "";
    applianceHTML = "";
    ingredHtml = "";
    suggestion = "";
    //console.log('pas encore')


  } else if (inputMain[0].length >= 3) {
    //console.log(inputMain)


    resultAllWords = resultAllWords.filter((recipe) => {
      let recipeIngred1 = [];

      recipe.ingredients.forEach((ingred) => {
        recipeIngred1.push(ingred.ingredient.toLowerCase());
      });
      //
      // search = [recipe.appliance.toLowerCase(), ...recipeIngred1].concat(recipe.ustensils);
      search = recipe.name.toLowerCase() + " " + recipeIngred1 + " " + recipe.description.toLowerCase();

      /* console.log(recipe.name.toLowerCase()) 
    console.log(recipeIngred1); */
      // console.log(recipe.description);

      // console.log(search);

      return inputMain.every((word) => search.includes(word));
    });
    console.log(search)
    
    //resultAllWords = arrFiltered;
  }

  //console.log(resultAllWords)

  ////////////////////////

  /* resultAll = [];
  console.log(inputMain);
  // resultAllWordsMemo = [];
  inputMain.forEach((word) => {
    if (inputMain.length < 2 && word.length < 3) {
      ustensilsHTML = "";
      applianceHTML = "";
      ingredHtml = "";
      suggestion = "";

      if (arrayTags.length < 1) {
        resultAllWords = recipes;
      }
      if (arrayTags.length >= 1) {
        resultAllWords = arrayRecipesTags;
      }
    } else if (word.length >= 3) {
      console.log(word);
      // Par Nom

      const resultName = resultAllWords.filter((item) => item.name.toLowerCase().includes(word.trim().toLowerCase()));

      console.log("Par Nom");
      console.log(resultName);

      // Par Description

      const resultDescr = resultAllWords.filter((item) => item.description.toLowerCase().includes(word.trim().toLowerCase()));

      console.log("Par Description");
      console.log(resultDescr);

      // Par Ingrédients

      resultIngredients = [];
      resultAllWords.forEach((element) => {
        element.ingredients.forEach((element2) => {
          if (element2.ingredient.toLowerCase().includes(word.trim().toLowerCase())) {
            resultIngredients.push(element);
          }
        });
      });

      console.log("Par ingrédients");
      console.log(resultIngredients);

      //          Supression des doublons après la fusion des tableaux

      const resultWord = [...new Set([...resultName, ...resultIngredients, ...resultDescr])];
      console.log("tableau current word");

      console.log(resultWord);

      // Affichage du tableau de résultats final
      resultAll.push(...resultWord);
      console.log("tableau accu");
      console.log(resultAll);
      resultAllWords = [...new Set([...resultAll])];
    }
  }); */

  //console.log(resultAllWords);
  displayRecipes(resultAllWords);
  displayUstensils(resultAllWords);
  displayAppliance(resultAllWords);
  displayIngredients(resultAllWords);
  console.log("Recherche générale");
  console.log(resultAllWords);
  rmvTag()
});

// Listener Ustensils
searchUstens.onclick = function () {
  document.querySelector(".filter-ingredients").className = "filter-ingredients color-ingredients filter-box-min";
  document.querySelector(".filter-appliance").className = "filter-appliance color-appliance filter-box-min";
  searchIngred.value = "";
  searchIngred.placeholder = "Ingrédients";
  // searchIngred.placeholder.style.opacity= "0.5";
  searchAppli.value = "";
  searchAppli.placeholder = "Appareil";

  resHtml();
  resultAppliance = resultAllWords;
  resultIngredientsAdv = resultAllWords;

  if (inputUst.length < 3) {
    displayRecipes(resultAllWords);
    //console.log(resultAllWords);
  } else if (inputUst.length > 2) {
    resHtml();
    displayRecipes(resultUstensils);
  }

  displayAppliance(resultAllWords);
  displayIngredients(resultAllWords);
  addTag("ustensils");
  rmvTag();
};

arrowUstens.onclick = function () {
  document.querySelector(".filter-ingredients").className = "filter-ingredients color-ingredients filter-box-min";
  document.querySelector(".filter-appliance").className = "filter-appliance color-appliance filter-box-min";
  searchIngred.value = "";
  searchIngred.placeholder = "Ingrédients";
  searchAppli.value = "";
  searchAppli.placeholder = "Appareil";
  searchUstens.value = "";
  searchUstens.placeholder = "Ustensiles";

  resHtml();
  resultAppliance = resultAllWords;
  resultIngredients = resultAllWords;
  resultUstensils = resultAllWords;
  displayRecipes(resultAllWords);
  displayAppliance(resultAllWords);
  displayIngredients(resultAllWords);
  displayUstensils(resultAllWords);

  if (document.querySelector(".filter-ustensils").classList.contains("filter-box-min") || document.querySelector(".filter-ustensils").classList.contains("filter-box-med")) {
    document.querySelector(".filter-ustensils").className = "filter-ustensils color-ustensils filter-box-larg";
    searchUstens.placeholder = "Recherche un ustensile";
  } else if (document.querySelector(".filter-ustensils").classList.contains("filter-box-larg")) {
    document.querySelector(".filter-ustensils").className = "filter-ustensils color-ustensils filter-box-min";
    searchUstens.placeholder = "Ustensiles";
  }
  rmvTag();

};

searchUstens.addEventListener("input", function () {
  inputUst = searchUstens.value.toLowerCase().trim();
  resHtml();
  resultAppliance = resultAllWords;
  resultIngredients = resultAllWords;
  // resultAllUstensils = [];
  // resultAll2 = [];
  arrayTestAdv = [];
  arrayTest2Adv = [];

  if (inputUst.length < 3) {
    if (document.querySelector(".filter-ustensils").classList.contains("filter-box-med")) {
      document.querySelector(".filter-ustensils").className = "filter-ustensils color-ustensils filter-box-min";
    }
    //console.log(resultAllWords);

    displayUstensils(resultAllWords);
    displayRecipes(resultAllWords);
    displayAppliance(resultAllWords);
    displayIngredients(resultAllWords);
  } else if (inputUst.length >= 3) {
    // Par Ustensils

    if (document.querySelector(".filter-ustensils").classList.contains("filter-box-min")) {
      document.querySelector(".filter-ustensils").className = "filter-ustensils color-ustensils filter-box-med";
    }

    resultUstensils = resultAllWords.filter((element) => element.ustensils.join(" ").toLowerCase().includes(inputUst.trim().toLowerCase()));

    for (recipe of resultUstensils) {
      for (item of recipe.ustensils) {
        // console.log(recipe.ustensils);
        // console.log(item);
        arrayTestAdv.push(item);
      }
    }
    // console.log(arrayTest);

    //Conversion Capitale

    for (ustens of arrayTestAdv) {
      let capUstens = "";
      capUstens = ustens.charAt(0).toUpperCase() + ustens.slice(1);
      arrayTest2Adv.push(capUstens);
    }

    // console.log(arrayTest2);
    // Suppression doubles ustensils
    arrayTest2Adv = [...new Set([...arrayTest2Adv])];

    //Ajout ingrédients HTML

    //console.log(arrayTest2Adv);
    //ustensilsHTML = "";

    for (ustens of arrayTest2Adv) {
      if (ustens.toLowerCase().includes(inputUst)) {
        ustensilsHTMLAdv += `
  
        <p class="itemTag">${ustens}</p>
        
        `;
      }
    }

    document.querySelector(".advListUst").innerHTML = ustensilsHTMLAdv;

    displayRecipes(resultUstensils);

    //console.log(resultUstensils);
    // console.log(resultUstensils);
  }
  addTag("ustensils");
  rmvTag();

  /* console.log("Par Ustensils");
  console.log(resultUstensils); */
});

//////////////////////////////////////////

// Appareils

searchAppli.onclick = function () {
  document.querySelector(".filter-ustensils").className = "filter-ustensils color-ustensils filter-box-min";
  document.querySelector(".filter-ingredients").className = "filter-ingredients color-ingredients filter-box-min";
  searchUstens.value = "";
  searchUstens.placeholder = "Ustensiles";
  searchIngred.value = "";
  searchIngred.placeholder = "Ingrédients";

  resHtml();
  resultUstensils = resultAllWords;
  resultIngredientsAdv = resultAllWords;

  if (inputApp.length < 3) {
    displayRecipes(resultAllWords);
  } else if (inputApp.length > 2) {
    resHtml();
    displayRecipes(resultAppliance);
  }

  displayUstensils(resultAllWords);
  displayIngredients(resultAllWords);

  addTag("appliance");
  rmvTag();

};

arrowAppli.onclick = function () {
  document.querySelector(".filter-ustensils").className = "filter-ustensils color-ustensils filter-box-min";
  document.querySelector(".filter-ingredients").className = "filter-ingredients color-ingredients filter-box-min";
  searchUstens.value = "";
  searchUstens.placeholder = "Ustensiles";
  searchAppli.value = "";
  searchAppli.placeholder = "Appareil";
  searchIngred.value = "";
  searchIngred.placeholder = "Ingrédients";

  resHtml();
  resultAppliance = resultAllWords;
  resultIngredients = resultAllWords;
  resultUstensils = resultAllWords;

  displayRecipes(resultAllWords);
  displayAppliance(resultAllWords);
  displayIngredients(resultAllWords);
  displayUstensils(resultAllWords);

  if (document.querySelector(".filter-appliance").classList.contains("filter-box-min") || document.querySelector(".filter-appliance").classList.contains("filter-box-med")) {
    document.querySelector(".filter-appliance").className = "filter-appliance color-appliance filter-box-larg";
    searchAppli.placeholder = "Recherche un appareil";
  } else if (document.querySelector(".filter-appliance").classList.contains("filter-box-larg")) {
    document.querySelector(".filter-appliance").className = "filter-appliance color-appliance filter-box-min";
    searchAppli.placeholder = "Appareil";
  }
  //addTag("appliance");
  rmvTag();

};

searchAppli.addEventListener("input", function () {
  inputApp = searchAppli.value.toLowerCase().trim();

  resHtml();
  resultUstensils = resultAllWords;
  resultIngredients = resultAllWords;

  resultAppliance = [];
  arrayTestAppAdv = [];
  arrayTest2AppAdv = [];
  if (inputApp.length < 3) {
    if (document.querySelector(".filter-appliance").classList.contains("filter-box-med")) {
      document.querySelector(".filter-appliance").className = "filter-appliance color-appliance filter-box-min";
    }
    //console.log(resultAllWords);
    displayUstensils(resultAllWords);
    displayRecipes(resultAllWords);
    displayAppliance(resultAllWords);
    displayIngredients(resultAllWords);
  } else if (inputApp.length >= 3) {
    // Par Ustensils
    if (document.querySelector(".filter-appliance").classList.contains("filter-box-min")) {
      document.querySelector(".filter-appliance").className = "filter-appliance color-appliance filter-box-med";
    }

    resultAppliance = resultAllWords.filter((item) => item.appliance.toLowerCase().includes(inputApp.trim().toLowerCase()));

    resultAppliance.forEach((element) => {
      arrayTestAppAdv.push(element.appliance);
    });

    //Conversion Capitale

    for (appl of arrayTestAppAdv) {
      let capApp = "";

      capApp = appl.charAt(0).toUpperCase() + appl.slice(1);

      arrayTest2AppAdv.push(capApp);
    }

    // Suppression doubles ustensils
    arrayTest2AppAdv = [...new Set([...arrayTest2AppAdv])];

    //Ajout ingrédients HTML

    for (appl of arrayTest2AppAdv) {
      if (appl.toLowerCase().includes(inputApp)) {
        applianceHTMLAdv += `
  
        <p class = "itemTag" >${appl}</p>
        
        `;
      }
    }

    document.querySelector(".advListApp").innerHTML = applianceHTMLAdv;
    displayRecipes(resultAppliance);
  }
  addTag("appliance");
});

// Ingrédients

searchIngred.onclick = function () {
  document.querySelector(".filter-ustensils").className = "filter-ustensils color-ustensils filter-box-min";
  document.querySelector(".filter-appliance").className = "filter-appliance color-appliance filter-box-min";

  searchUstens.value = "";
  searchUstens.placeholder = "Ustensiles";
  searchAppli.value = "";
  searchAppli.placeholder = "Appareil";
  resHtml();
  resultAppliance = resultAllWords;
  resultUstensils = resultAllWords;

  if (inputIngred.length < 3) {
    displayRecipes(resultAllWords);
  } else if (inputIngred.length > 2) {
    resHtml();
    displayRecipes(resultIngredientsAdv);
  }

  displayAppliance(resultAllWords);
  displayUstensils(resultAllWords);
  addTag("ingredients");
};

arrowIngred.onclick = function () {
  document.querySelector(".filter-ustensils").className = "filter-ustensils color-ustensils filter-box-min";
  document.querySelector(".filter-appliance").className = "filter-appliance color-appliance filter-box-min";
  searchIngred.value = "";
  searchIngred.placeholder = "Ingrédients";
  searchUstens.value = "";
  searchUstens.placeholder = "Ustensiles";
  searchAppli.value = "";
  searchAppli.placeholder = "Appareil";

  resHtml();
  resultAppliance = resultAllWords;
  resultIngredients = resultAllWords;
  resultUstensils = resultAllWords;
  displayRecipes(resultAllWords);
  displayAppliance(resultAllWords);
  displayIngredients(resultAllWords);
  displayUstensils(resultAllWords);

  if (document.querySelector(".filter-ingredients").classList.contains("filter-box-min") || document.querySelector(".filter-ingredients").classList.contains("filter-box-med")) {
    document.querySelector(".filter-ingredients").className = "filter-ingredients color-ingredients filter-box-larg";
    searchIngred.placeholder = "Recherche un ingrédient";
  } else if (document.querySelector(".filter-ingredients").classList.contains("filter-box-larg")) {
    document.querySelector(".filter-ingredients").className = "filter-ingredients color-ingredients filter-box-min";
    searchIngred.placeholder = "Ingrédients";
  }
};

searchIngred.addEventListener("input", function () {
  inputIngred = searchIngred.value.toLowerCase().trim();
  resHtml();
  resultAppliance = resultAllWords;
  resultUstensils = resultAllWords;
  // resultAllUstensils = [];
  // resultAll2 = [];
  arrayTestIngredAdv = [];
  arrayTest2IngredAdv = [];

  if (inputIngred.length < 3) {
    if (document.querySelector(".filter-ingredients").classList.contains("filter-box-med")) {
      document.querySelector(".filter-ingredients").className = "filter-ingredients color-ingredients filter-box-min";
    }
    //console.log(resultAllWords);

    displayUstensils(resultAllWords);
    displayRecipes(resultAllWords);
    displayAppliance(resultAllWords);
    displayIngredients(resultAllWords);
  } else if (inputIngred.length >= 3) {
    // Par Ustensils

    if (document.querySelector(".filter-ingredients").classList.contains("filter-box-min")) {
      document.querySelector(".filter-ingredients").className = "filter-ingredients color-ingredients filter-box-med";
    }

    /*     resultIngredientsAdv = [];
    resultAllWords.forEach((element) => {
      element.ingredients.forEach((element2) => {
        if (element2.ingredient.toLowerCase().includes(inputIngred.trim().toLowerCase())) {
          resultIngredientsAdv.push(element);
        }
      });
    }); */
    resultIngredients = [];
    resultAllWords.forEach((element) => {
      element.ingredients.forEach((element2) => {
        if (element2.ingredient.toLowerCase().includes(inputIngred.trim().toLowerCase())) {
          resultIngredients.push(element);
        }
      });
    });
    resultIngredients = [...new Set([...resultIngredients])];

    //console.log(resultIngredients);

    resultIngredients.forEach((element) => {
      element.ingredients.forEach((element2) => {
        //console.log(element2.ingredient);
        arrayTestIngredAdv.push(element2.ingredient);
        //console.log(arrayTestIngred);
      });
    });
    // console.log(arrayTest);

    //Conversion Capitale

    arrayTest2IngredAdv = [];
    for (ingred of arrayTestIngredAdv) {
      ingred = ingred.toLowerCase();
      let capIngred = "";
      capIngred = ingred.charAt(0).toUpperCase() + ingred.slice(1);
      arrayTest2IngredAdv.push(capIngred);
    }
    // console.log(arrayTest2);
    // Suppression doubles ingred
    arrayTest2IngredAdv = [...new Set([...arrayTest2IngredAdv])];
    //console.log(arrayTest2IngredAdv);
    //Ajout ingrédients HTML

    for (ingred of arrayTest2IngredAdv) {
      if (ingred.toLowerCase().includes(inputIngred)) {
        ingredHtmlAdv += `
  
        <p class="itemTag">${ingred}</p>
        
        `;
      }
    }

    document.querySelector(".advListIngred").innerHTML = ingredHtmlAdv;

    displayRecipes(resultIngredients);
    addTag("ingredients");
  rmvTag();

    // console.log(resultUstensils);
  }

  /* console.log("Par Ustensils");
  console.log(resultUstensils); */
});

function rmvTag() {
  

  document.querySelector(".cross").onclick = function () {
    
    console.log('Test')

    } 
}
 
rmvTag();

// TEST JS BENCH

// trello site

/* tag = tag.toLowerCase();
               
              recipe.ingredients.forEach((i) => 
              i.ingredient.toLowerCase().includes(tag.trim().toLowerCase())
            )

           

            || */

//console.log(arrayRecipesTags);

/*  let itemsIngred = [];
      resultAllWords.forEach((element) => {
        element.ingredients.forEach((element2) => {
          
            itemsIngred.push(element2.ingredient.toLowerCase());
          
        });
      });

arrayRecipesTags = resultAllWords.filter((recipe) => {
  console.log(recipe.ustensils.join(" ").toLowerCase())
  const tags = [recipe.appliance.toLowerCase(), ...[recipe.ustensils.join(" ").toLowerCase()], ...itemsIngred];
  console.log(tags)
  console.log(arrayTags)
  console.log(arrayTags.every(f => tags.includes(f)));
  return arrayTags.every(f => tags.includes(f));
  
}); */

////////////////////////////////// IMPORTANT BRANCH 2/////////

/*         resultAllWords.forEach((recipe) => {


           arrayTags.forEach((tag) => { 

        
if(


  (
    recipe.ingredients.forEach((element2) => {
      (element2.ingredient.toLowerCase().includes(tag.trim().toLowerCase())) 
        
    })
  ) 

  ||


(
  recipe.ustensils.join(" ").toLowerCase().includes(tag.trim().toLowerCase())
      
    
  )
  ||
  (
    recipe.appliance.toLowerCase().includes(tag.trim().toLowerCase())        
      
    )
){

  arrayRecipesTags0.push(recipe);
console.log(arrayRecipesTags0)
}
  






  }) 

}) */

/* 
  arrayTestAdv = [];
  arrayTest2Adv = [];
  for (recipe of arr) {
    for (item of recipe.ustensils) {
      
      arrayTestAdv.push(item);
    }
  }
  

  //Conversion Capitale

  for (ustens of arrayTestAdv) {
    let capUstens = "";
    capUstens = ustens.charAt(0).toUpperCase() + ustens.slice(1);
    arrayTest2Adv.push(capUstens);
  }

  
  // Suppression doubles ustensils
  arrayTest2Adv = [...new Set([...arrayTest2Adv])];

  //Ajout ingrédients HTML

  




  for (ustens of arrayTest2Adv) {
    if (ustens.toLowerCase().includes(inputUst)) {


      ustensilsHTMLAdv += `

      <p class = "itemUstensil">${ustens}</p>
      
      `;
      
    }
    
  }
  

  document.querySelector(".advList").innerHTML = ustensilsHTMLAdv;


 */

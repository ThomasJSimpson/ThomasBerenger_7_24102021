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
let applianceHTML = "";
let applianceHTMLAdv = "";
let ustensilsHTML = "";
let ustensilsHTMLAdv = "";
let tagsHtmlUst = "";
let tagsHtmlUstAdv = "";


let resultAllWords = recipes;
let ustensilsList = "";
let resultIngredients = [];
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
let arrayTags = [];
let arrayRecipesTags = [];

/* let resultAllWordsMemo = resultAllWords;
let resultAllUstensilsMemo = resultAllWords; */
let inputMain = searchMain.value.toLowerCase().trim().split(" ");
let inputUst = searchUstens.value.toLowerCase().trim();
let inputApp = searchAppli.value.toLowerCase().trim();
let inputIngred = searchIngred.value.toLowerCase().trim();
let itemUstensil2 = [];

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

  suggestion = "";
  /*  resultUstensils = resultAllWords;
resultAppliance = resultAllWords;
resultIngredients = resultAllWords; */
}

function addItem() {
  itemUstensil2 = document.querySelectorAll(".itemUstensil");

  itemUstensil2.forEach((element) => {
    /*     let elementStr =  element;
    console.log(element)
    console.log(elementStr)
  console.log(typeof (element))
  console.log(typeof (elementStr )) */

    element.addEventListener("click", function () {
      tagsHtmlUst ="";
      
      arrayTags.push(element.innerText);

      arrayTags = [...new Set([...arrayTags])];

/*       console.log(arrayTags);
      console.log();
*/
      arrayTags.forEach((elem) => {
        tagsHtmlUst += 
        `      <div class= "tags-item color-ustensils">
        <p>${elem}</p>
        <img src="../images/cross.svg" alt="cross" id = "cross" /> 
      </div>      `

      }); 
      document.querySelector(".tags").innerHTML = tagsHtmlUst;

      // displayRecipes(arrayTags)
      
    });



  });

  // let resultName = recipes.filter((item) => item.name.toLowerCase().includes(word.trim().toLowerCase()));
  

}

/* function (){

} */
/* addItem(); */

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
              <img src="../images/time.svg" alt="clock">
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
  addItem();
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
    ustensilsHTML += `

<p class="itemUstensil"> ${ustens} </p>

`;
  }

  document.querySelector(".advListUst").innerHTML = ustensilsHTML;
  addItem();
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
}

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
    applianceHTML += `

<p>${appl}</p>

`;
  }

  document.querySelector(".advListApp").innerHTML = applianceHTML;
  addItem();
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
    ingredHtml += `

<p>${ingred}</p>

`;
  }
  document.querySelector(".advListIngred").innerHTML = ingredHtml;
  addItem();
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
};

searchMain.addEventListener("input", function () {
  inputMain = searchMain.value.toLowerCase().trim().split(" ");
  resHtml();
  resultAll = [];
  // resultAllWordsMemo = [];
  inputMain.forEach((word) => {
    if (inputMain.length < 2 && word.length < 3) {
      ustensilsHTML = "";
      applianceHTML = "";
      ingredHtml = "";
      suggestion = "";
      resultAllWords = recipes;
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

      // Par Ingrédients

      resultIngredients = [];
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

      const resultWord = [...new Set([...resultName, ...resultIngredients, ...resultDescr])];
      console.log("tableau current word");

      console.log(resultWord);

      // Affichage du tableau de résultats final
      resultAll.push(...resultWord);
      console.log("tableau accu");
      console.log(resultAll);
      resultAllWords = [...new Set([...resultAll])];

      console.log(resultAllWords);
    }
  });
  // resultAllWordsMemo = resultAllWords;
  displayRecipes(resultAllWords);
  displayUstensils(resultAllWords);
  displayAppliance(resultAllWords);
  displayIngredients(resultAllWords);
  console.log("Recherche générale");
  console.log(resultAllWords);
  // console.log(resultAllWordsMemo);
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
  resultIngredients = resultAllWords;

  if (inputUst.length < 3) {
    displayRecipes(resultAllWords);
  } else if (inputUst.length > 2) {
    resHtml();
    displayRecipes(resultUstensils);
  }

  displayAppliance(resultAllWords);
  displayIngredients(resultAllWords);
  addItem();
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
  addItem();
};

searchUstens.addEventListener("input", function () {
  inputUst = searchUstens.value.toLowerCase().trim();
  resHtml();
  resultAppliance = resultAllWords;
  resultIngredients = resultAllWords;
  resultAllUstensils = [];
  resultAll2 = [];
  arrayTestAdv = [];
  arrayTest2Adv = [];

  if (inputUst.length < 3) {
    if (document.querySelector(".filter-ustensils").classList.contains("filter-box-med")) {
      document.querySelector(".filter-ustensils").className = "filter-ustensils color-ustensils filter-box-min";
    }
    console.log(resultAllWords);

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
  
        <p class = "itemUstensil">${ustens}</p>
        
        `;
      }
    }

    document.querySelector(".advListUst").innerHTML = ustensilsHTMLAdv;

    displayRecipes(resultUstensils);
    console.log(resultUstensils);
  }
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
  resultIngredients = resultAllWords;

  if (inputApp.length < 3) {
    displayRecipes(resultAllWords);
  } else if (inputApp.length > 2) {
    displayRecipes(resultAppliance);
  }

  displayUstensils(resultAllWords);
  displayIngredients(resultAllWords);
};

arrowAppli.onclick = function () {
  document.querySelector(".filter-ustensils").className = "filter-ustensils color-ustensils filter-box-min";
  document.querySelector(".filter-ingredients").className = "filter-ingredients color-ingredients filter-box-min";
  searchUstens.value = "";
  searchUstens.placeholder = "Ustensiles";
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
};

searchAppli.addEventListener("input", function () {
  inputApp = searchAppli.value.toLowerCase().trim();

  resHtml();
  resultUstensils = resultAllWords;
  resultIngredients = resultAllWords;
  resultAppliance = [];

  if (inputApp.length < 3) {
    console.log(resultAllWords);
    displayUstensils(resultAllWords);
    displayRecipes(resultAllWords);
    displayAppliance(resultAllWords);
    displayIngredients(resultAllWords);
  } else if (inputApp.length >= 3) {
    // Par Ustensils

    resultAppliance = resultAllWords.filter((item) => item.appliance.toLowerCase().includes(inputApp.trim().toLowerCase()));

    arrayTestAppAdv = [];

    resultAppliance.forEach((element) => {
      arrayTestAppAdv.push(element.appliance);
    });

    //Conversion Capitale
    arrayTest2AppAdv = [];
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
  
        <p>${appl}</p>
        
        `;
      }
    }

    document.querySelector(".advListApp").innerHTML = applianceHTMLAdv;
    displayRecipes(resultAppliance);
  }
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
};

arrowIngred.onclick = function () {
  document.querySelector(".filter-ustensils").className = "filter-ustensils color-ustensils filter-box-min";
  document.querySelector(".filter-appliance").className = "filter-appliance color-appliance filter-box-min";

  searchUstens.value = "";
  searchUstens.placeholder = "Ustensiles";
  searchAppli.value = "";
  searchAppli.placeholder = "Appareil";
  resHtml();

  if (document.querySelector(".filter-ingredients").classList.contains("filter-box-min") || document.querySelector(".filter-ingredients").classList.contains("filter-box-med")) {
    document.querySelector(".filter-ingredients").className = "filter-ingredients color-ingredients filter-box-larg";
    searchIngred.placeholder = "Recherche un ingrédient";
  } else if (document.querySelector(".filter-ingredients").classList.contains("filter-box-larg")) {
    document.querySelector(".filter-ingredients").className = "filter-ingredients color-ingredients filter-box-min";
    searchIngred.placeholder = "Ingrédients";
  }
};

console.log(itemUstensil2);

/* itemUstensil2.addEventListener("click", function () { 
  console.log("Hello");

}); */


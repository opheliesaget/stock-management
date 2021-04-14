//Récupération des éléments HTML (input)
let productName = document.getElementById("productName");
let quantity = document.getElementById("quantity");
let priceBuy = document.getElementById("priceBuy");
let priceSell = document.getElementById("priceSell");
let boissonType = document.getElementById("boissonType");
let alcoolDegree = document.getElementById("alcoolDegree");
let triBoissonType = document.getElementById("triBoissonType");
////Récupération des éléments HTML (boutons)
let validBtn = document.getElementById("validBtn");
let menuBtn = document.getElementById("menuBtn");
//Récupération des éléments HTML (div)
let tableBody = document.getElementById("tableBody");
let typeAlcool = document.getElementById("typeAlcool");
let alertMessage = document.getElementById("alertMessage");
//Infobulle et menu
let menu = document.getElementById("menu");
let info = document.getElementById("info");
let infoBulle = document.getElementById("infoBulle");

//Affichage infobulle
info.addEventListener("mouseover", function (e) {
  infoBulle.style.display = "block";
});
info.addEventListener("mouseout", function (e) {
  infoBulle.style.display = "none";
});

//Menu
accordionFunction();

//Création de la liste
//récupération des éléments du local storage
//Affichage des éléments du local storage
let listeProduct = [];
recupStorage(listeProduct);
if (listeProduct.length != 0) {
  displayFunction();
}

//Variable de validation
let validation = true;

//Message d'alerte si la marge est négative
priceSell.addEventListener("blur", function (e) {
  messageFunction();
});

//Affiche ou non l'input pour le degré d'alcool
boissonType.addEventListener("change", function () {
  if (boissonType.value == "alcool") {
    typeAlcool.style.display = "block";
  } else {
    typeAlcool.style.display = "none";
  }
});

//Ajout des éléments lorsqu'on clique sur le bouton ajouter
validBtn.addEventListener("click", function (e) {
  alertMessage.innerText = "";
  let id = productName.value + Date.now();
  if (validation) {
    if (productName.value == "" || quantity.value == "") {
      //Non validation si absence de nom du produit
      let errorMarge = document.createElement("p");
      errorMarge.innerText =
        "Veuillez inscrire le nom et la quantité du produit ajouté.";
      alertMessage.insertAdjacentElement("beforeend", errorMarge);
    } else if (boissonType.value == "alcool") {
      let BoissonAlcool = new ProductAlcool(
        productName.value,
        parseInt(quantity.value),
        priceBuy.value,
        priceSell.value,
        boissonType.value,
        id,
        alcoolDegree.value
      );
      listeProduct.push(BoissonAlcool);
      addStorage(BoissonAlcool);
      displayFunction();
    } else if (boissonType.value == "soft") {
      let Boisson = new ProductSoft(
        productName.value,
        parseInt(quantity.value),
        priceBuy.value,
        priceSell.value,
        boissonType.value,
        id
      );
      listeProduct.push(Boisson);
      console.log(listeProduct);
      addStorage(Boisson);
      displayFunction();
    } else {
      let BoissonOther = new ProductOther(
        productName.value,
        parseInt(quantity.value),
        priceBuy.value,
        priceSell.value,
        boissonType.value,
        id
      );
      listeProduct.push(BoissonOther);
      console.log(listeProduct);
      addStorage(BoissonOther);
      displayFunction();
    }
  } else {
    //Non validation si marge négative
    let errorMarge = document.createElement("p");
    errorMarge.innerText =
      "Veuillez modifier le prix de vente ou le prix d'achat.";
    alertMessage.insertAdjacentElement("beforeend", errorMarge);
  }
});

//Filtrer selon le type de boisson
triBoissonType.addEventListener("change", function (e) {
  console.log(triBoissonType.value);
  tempListe = [];
  if (triBoissonType.value == "soft") {
    for (let i = 0; i < listeProduct.length; i++) {
      let softElem = listeProduct[i] instanceof ProductSoft;
      if (softElem) {
        tempListe.push(listeProduct[i]);
      }
    }
    listeProduct = tempListe;
    displayFunction();
    recupStorage(listeProduct);
  } else if (triBoissonType.value == "alcool") {
    for (let i = 0; i < listeProduct.length; i++) {
      let alcoolElem = listeProduct[i] instanceof ProductAlcool;
      if (alcoolElem) {
        tempListe.push(listeProduct[i]);
      }
    }
    listeProduct = tempListe;
    displayFunction();
    recupStorage(listeProduct);
  } else if (triBoissonType.value == "other") {
    for (let i = 0; i < listeProduct.length; i++) {
      let otherElem = listeProduct[i] instanceof ProductOther;
      if (otherElem) {
        tempListe.push(listeProduct[i]);
      }
    }
    listeProduct = tempListe;
    displayFunction();
    recupStorage(listeProduct);
  } else if (triBoissonType.value == "all") {
    listeProduct = [];
    recupStorage(listeProduct);
    displayFunction();
  }
});

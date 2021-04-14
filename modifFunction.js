//Modification du statut du stock
let modifStatut = function (elem, divColorStock) {
  if (elem.quantity > 5) {
    //vert
    divColorStock.style.backgroundColor = "rgb(19,207,78)";
  } else if (elem.quantity > 0) {
    //jaune
    divColorStock.style.backgroundColor = "rgb(255,193,61)";
  } else {
    divColorStock.style.backgroundColor = "rgb(255,97,89)";
  }
};

//Ajout des attributs dans les input de modifications
let inputAtt = function (propriety) {
  propriety.setAttribute("type", "number");
  propriety.setAttribute("min", 0);
  propriety.setAttribute("step", "any");
};

//Fonction de modification
let modifFunction = function (
  pName,
  pQuantity,
  pPriceBuy,
  pPriceSell,
  pMarge,
  pSellttc,
  pBoissonType,
  divStockPlus,
  divStockMinus,
  pAlcoolDegree,
  dataName,
  dataPriceBuy,
  dataPriceSell,
  dataTypeBoisson,
  dataAlcoolDegre,
  divColorStock,
  elem
) {
  //Modification du nom du produit
  pName.addEventListener("click", function (e) {
    pName.style.display = "none";
    //Création de l'input
    let pNameModif = document.createElement("input");
    pNameModif.placeholder = "Nom";
    dataName.insertAdjacentElement("beforeend", pNameModif);
    pNameModif.focus();
    //Validation de la modif lorsque l'input n'est plus focus
    pNameModif.addEventListener("blur", function (e) {
      pNameModif.remove();
      elem.productName = pNameModif.value;
      pName.innerText = elem.productName;
      pName.style.display = "block";
      addStorageModif(elem);
    });
  });

  //Ajout d'un produit (quantité)
  divStockPlus.addEventListener("click", function (e) {
    elem.quantity += 1;
    pQuantity.innerText = elem.quantity;
    modifStatut(elem, divColorStock);
    addStorageModif(elem);
  });
  //Suppression d'un produit (quantité)
  divStockMinus.addEventListener("click", function (e) {
    if (elem.quantity > 0) {
      elem.quantity -= 1;
      pQuantity.innerText = elem.quantity;
      modifStatut(elem, divColorStock);
      addStorageModif(elem);
    } else {
      elem.quantity = 0;
      pQuantity.innerText = elem.quantity;
      modifStatut(elem, divColorStock);
      addStorageModif(elem);
    }
  });

  //Modification du prix d'achat du produit
  pPriceBuy.addEventListener("click", function (e) {
    pPriceBuy.style.display = "none";
    //Création de l'input
    let pPriceBuyModif = document.createElement("input");
    //Ajout des attribut à l'input
    inputAtt(pPriceBuyModif);
    pPriceBuyModif.placeholder = "Prix d'achat HT";
    //On ajoute le nouvel élément après l'élément précédent
    dataPriceBuy.insertAdjacentElement("beforeend", pPriceBuyModif);
    pPriceBuyModif.focus();
    //Validation de la modif lorsque l'input n'est plus focus
    pPriceBuyModif.addEventListener("blur", function (e) {
      pPriceBuyModif.remove();
      elem.priceBuy = pPriceBuyModif.value;
      pPriceBuy.innerText = `${elem.priceBuy} €`;
      pPriceBuy.style.display = "block";
      let calculMarge = elem.priceSell - elem.priceBuy;
      addStorageModif(elem);
      if (calculMarge >= 0) {
        pMarge.innerText = `${calculMarge} €`;
      } else {
        pMarge.innerText = "ERREUR";
      }
    });
  });

  //Modification du prix de vente du produit
  pPriceSell.addEventListener("click", function (e) {
    pPriceSell.style.display = "none";
    //Création de l'input
    let pPriceSellModif = document.createElement("input");
    //Ajout des attribut à l'input
    inputAtt(pPriceSellModif);
    pPriceSellModif.placeholder = "Prix de vente HT";
    //On ajoute le nouvel élément après l'élément précédent
    dataPriceSell.insertAdjacentElement("beforeend", pPriceSellModif);
    pPriceSellModif.focus();
    //Validation de la modif lorsque l'input n'est plus focus
    pPriceSellModif.addEventListener("blur", function (e) {
      pPriceSellModif.remove();
      elem.priceSell = pPriceSellModif.value;
      pPriceSell.innerText = `${elem.priceSell} €`;
      pPriceSell.style.display = "block";
      let calculMarge = elem.priceSell - elem.priceBuy;
      let calculPriceTTC = elem.priceSell * 1.2;
      if (calculMarge >= 0) {
        pMarge.innerText = `${calculMarge} €`;
      } else {
        pMarge.innerText = "ERREUR";
      }
      pSellttc.innerText = `${calculPriceTTC.toPrecision(3)} €`;
      addStorageModif(elem);
    });
  });

  //Modification du type de boisson
  pBoissonType.addEventListener("click", function (e) {
    pBoissonType.style.display = "none";
    //Création de du select et des options
    let pBoissonTypeModif = document.createElement("select");
    let option = document.createElement("option");
    let optionOne = document.createElement("option");
    let optionTwo = document.createElement("option");
    let optionThree = document.createElement("option");
    option.value = "choice";
    option.innerText = "Type de boisson";
    optionOne.value = "soft";
    optionOne.innerText = "Boisson non alcoolisée";
    optionTwo.value = "alcool";
    optionTwo.innerText = "Boisson alcoolisée";
    optionThree.value = "other";
    optionThree.innerText = "Autres (boissons chaudes ...)";
    pBoissonTypeModif.add(option);
    pBoissonTypeModif.add(optionOne);
    pBoissonTypeModif.add(optionTwo);
    pBoissonTypeModif.add(optionThree);
    dataTypeBoisson.insertAdjacentElement("beforeend", pBoissonTypeModif);
    pBoissonTypeModif.addEventListener("change", function (e) {
      pBoissonTypeModif.remove();
      elem.boissonType = pBoissonTypeModif.value;
      pBoissonType.innerText = elem.boissonType;
      pBoissonType.style.display = "block";
      addStorageModif(elem);
      console.log("ok");
      if (elem.boissonType == "alcool") {
        //Modification du degré d'alcool
        pAlcoolDegree.innerText = "NR";
        pAlcoolDegree.addEventListener("click", function (e) {
          pAlcoolDegree.style.display = "none";
          //Création de l'input
          let pAlcoolDegreeModif = document.createElement("input");
          pAlcoolDegreeModif.placeholder = "Degré d'alcool";
          dataAlcoolDegre.insertAdjacentElement(
            "beforeend",
            pAlcoolDegreeModif
          );
          pAlcoolDegreeModif.focus();
          //Validation de la modif lorsque l'input n'est plus focus
          pAlcoolDegreeModif.addEventListener("blur", function (e) {
            pAlcoolDegreeModif.remove();
            elem.alcoolDegree = pAlcoolDegreeModif.value;
            pAlcoolDegree.innerText = `${elem.alcoolDegree} °`;
            pAlcoolDegree.style.display = "block";
            addStorageModif(elem);
          });
        });
      } else {
        elem.alcoolDegree = 0;
        pAlcoolDegree.innerText = "/";
      }
    });
  });
};

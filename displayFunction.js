//Style de des lignes
let displayLineFunction = function (listeProduct, lineProduct) {
  for (let i = 0; i < listeProduct.length; i++) {
    if (i % 2 == 0) {
      lineProduct.style.backgroundColor = "#e6ccb2";
      console.log("black");
    } else {
      lineProduct.style.backgroundColor = "#ede0d4";
      console.log("blue");
    }
  }
};

//Fonction d'affichage des produits
let displayFunction = function () {
  //On vide la div container pour éviter les doublons
  tableBody.innerText = "";
  //Boucle d'affichage (pour chaque élément de la liste)
  for (const elem of listeProduct) {
    //Création des éléments
    ////Ligne de tableau
    let lineProduct = document.createElement("tr");
    let dataStatut = document.createElement("td");
    let dataQr = document.createElement("td");
    let dataName = document.createElement("td");
    let dataQuantity = document.createElement("td");
    let dataPriceBuy = document.createElement("td");
    let dataPriceSell = document.createElement("td");
    let dataMarge = document.createElement("td");
    let dataPriceTTC = document.createElement("td");
    let dataTypeBoisson = document.createElement("td");
    let dataAlcoolDegre = document.createElement("td");
    let dataAction = document.createElement("td");
    //Création des div
    let divStockPlus = document.createElement("div");
    let divStockMinus = document.createElement("div");
    let divColorStock = document.createElement("div");
    let divQr = document.createElement("div");
    ////p
    let pQr = document.createElement("p");
    let pName = document.createElement("p");
    let pQuantity = document.createElement("p");
    let pPriceBuy = document.createElement("p");
    let pPriceSell = document.createElement("p");
    let pMarge = document.createElement("p");
    let pSellttc = document.createElement("p");
    let pBoissonType = document.createElement("p");
    let pAlcoolDegree = document.createElement("p");
    ////button
    let btnSupp = document.createElement("button");
    //Création des class
    divColorStock.className = "divStatut";
    divStockPlus.className = "btnStock";
    divStockMinus.className = "btnStock";
    btnSupp.className = "btnSup";
    //calcul marge et prix TTC
    let calculMarge = elem.priceSell - elem.priceBuy;
    let calculPriceTTC = elem.priceSell * 1.2;
    //On ajoute les valeurs dans ces éléments
    pQr.innerText = "QR";
    pName.innerText = elem.productName;
    pQuantity.innerText = elem.quantity;
    pPriceBuy.innerText = `${elem.priceBuy} €`;
    pPriceSell.innerText = `${elem.priceSell} €`;
    pMarge.innerText = `${calculMarge} €`;
    pSellttc.innerText = `${calculPriceTTC.toPrecision(3)} €`;
    pBoissonType.innerText = elem.boissonType;
    if (elem.alcoolDegree) {
      pAlcoolDegree.innerText = `${elem.alcoolDegree}°`;
    } else {
      pAlcoolDegree.innerText = "/";
    }
    btnSupp.innerText = `X`;
    divStockPlus.innerText = "+";
    divStockMinus.innerText = "-";
    //Style Qr
    pQr.style.fontSize = "80%";
    pQr.style.color = "#b08968";
    //Changement de statut (en fonction des stock)
    modifStatut(elem, divColorStock);
    //Ajout des données dans les colonne
    dataStatut.insertAdjacentElement("beforeend", divColorStock);
    dataQr.insertAdjacentElement("beforeend", pQr);
    dataName.insertAdjacentElement("beforeend", pName);
    dataQuantity.insertAdjacentElement("beforeend", pQuantity);
    dataQuantity.insertAdjacentElement("beforeend", divStockPlus);
    dataQuantity.insertAdjacentElement("beforeend", divStockMinus);
    dataPriceBuy.insertAdjacentElement("beforeend", pPriceBuy);
    dataPriceSell.insertAdjacentElement("beforeend", pPriceSell);
    dataMarge.insertAdjacentElement("beforeend", pMarge);
    dataPriceTTC.insertAdjacentElement("beforeend", pSellttc);
    dataTypeBoisson.insertAdjacentElement("beforeend", pBoissonType);
    dataAlcoolDegre.insertAdjacentElement("beforeend", pAlcoolDegree);
    dataAction.insertAdjacentElement("beforeend", btnSupp);
    //Ajout des cellules (colonne)
    lineProduct.insertAdjacentElement("beforeend", dataStatut);
    lineProduct.insertAdjacentElement("beforeend", dataQr);
    lineProduct.insertAdjacentElement("beforeend", dataName);
    lineProduct.insertAdjacentElement("beforeend", dataQuantity);
    lineProduct.insertAdjacentElement("beforeend", dataPriceBuy);
    lineProduct.insertAdjacentElement("beforeend", dataPriceSell);
    lineProduct.insertAdjacentElement("beforeend", dataMarge);
    lineProduct.insertAdjacentElement("beforeend", dataPriceTTC);
    lineProduct.insertAdjacentElement("beforeend", dataTypeBoisson);
    lineProduct.insertAdjacentElement("beforeend", dataAlcoolDegre);
    lineProduct.insertAdjacentElement("beforeend", dataAction);
    //Ajout des td dans la ligne
    tableBody.insertAdjacentElement("beforeend", lineProduct);
    //Le bouton modifié apparait seulement quand on modifie
    //Couleur des lignes
    //displayLineFunction(listeProduct, lineProduct);
    //On vide les input
    productName.value = "";
    quantity.value = "";
    priceBuy.value = "";
    priceSell.value = "";
    alcoolDegree.value = "";
    alertMessage.innerText = "";
    //Appel de la fonction de modification
    modifFunction(
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
    );
    //Création du qrCode
    let qrcode = new QRCode(divQr, {
      text: "https://www.google.fr/",
      width: 80,
      height: 80,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
    dataQr.insertAdjacentElement("beforeend", divQr);
    divQr.style.display = "none";

    pQr.addEventListener("mouseover", function (e) {
      divQr.style.display = "inline-block";
    });
    pQr.addEventListener("mouseout", function (e) {
      divQr.style.display = "none";
    });

    //Bouton spprimer un élément
    btnSupp.addEventListener("click", function (e) {
      supprFunction(elem);
      displayFunction();
    });
  }
};

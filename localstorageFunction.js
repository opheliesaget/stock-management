//Récupération des données du local storage (récup+transfo)
let recupStorage = function (listeProduct) {
  for (let i = 0; i < localStorage.length; i++) {
    let objectKey = localStorage.key(i);
    let objectJSON = localStorage.getItem(objectKey);
    let object = JSON.parse(objectJSON);
    console.log(object);
    console.log(object.boissonType);
    if (object.boissonType == "alcool") {
      console.log(" ok alcool");
      let BoissonAlcool = new ProductAlcool(
        object.productName,
        parseInt(object.quantity),
        object.priceBuy,
        object.priceSell,
        object.boissonType,
        object.id,
        object.alcoolDegree
      );
      listeProduct.push(BoissonAlcool);
    } else if (object.boissonType == "soft") {
      console.log(" ok soft");
      let Boisson = new ProductSoft(
        object.productName,
        parseInt(object.quantity),
        object.priceBuy,
        object.priceSell,
        object.boissonType,
        object.id
      );
      listeProduct.push(Boisson);
    } else {
      console.log(" ok autre");
      let BoissonOther = new ProductOther(
        object.productName,
        parseInt(object.quantity),
        object.priceBuy,
        object.priceSell,
        object.boissonType,
        object.id
      );
      listeProduct.push(BoissonOther);
    }
  }
};

//Ajout d'un élément au local storage (transfo+key+stockage)
let addStorage = function (object) {
  let objectJSON = JSON.stringify(object);
  let objectKey = object.id;
  localStorage.setItem(objectKey, objectJSON);
};

//Suppression d'une élément du local storage
let suppStorage = function (elem) {
  /*Le local storage range les élément sotcker dans un ordre aléatoire (?) propre aux navigateurs
    On crée donc une autre liste, on détermine le nouvel index de l'élément qu'on veut supprimer
    et on le supprime*/
  let tempListeProduct = [];
  recupStorage(tempListeProduct);
  let indexSupp = tempListeProduct.findIndex(function (product) {
    return product.id === elem.id;
  });
  //Determine la clé de l'élément à un index donné
  let elemSupKey = localStorage.key(indexSupp);
  localStorage.removeItem(elemSupKey);
};

//Ajout d'un élément après modification
let addStorageModif = function (elem) {
  /*On utilise la même fonction que pour supprimer (pour cibler l'élément avec une certaine clé)*/
  let tempListeProduct = [];
  recupStorage(tempListeProduct);
  let indexSupp = tempListeProduct.findIndex(function (product) {
    return product.id === elem.id;
  });
  //Determine la clé de l'élément à un index donné
  let elemKey = localStorage.key(indexSupp);
  let elemJSON = JSON.stringify(elem);
  localStorage.setItem(elemKey, elemJSON);
};

let supprFunction = function (elem) {
  /*On compare l'id de notre objet aux id des objets de la listeProduct
    pour determiner son index*/
  let index = listeProduct.findIndex(function (product) {
    return product.id === elem.id;
  });
  //Une fois l'index trouvé, on le supprime de la listePorduct
  listeProduct.splice(index, 1);
  console.log("Je suis index");
  console.log(index);
  //Appel de la fonction de suppression dans le localstorage
  suppStorage(elem);
};

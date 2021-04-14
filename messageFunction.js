let messageFunction = function () {
  alertMessage.innerText = "";
  if (priceBuy.value > priceSell.value) {
    let errorMarge = document.createElement("p");
    errorMarge.innerText =
      "Le prix de vente doit être supérieur au prix d'achat (sinon vous ne ferez pas de marge !)";
    alertMessage.insertAdjacentElement("beforeend", errorMarge);
    validation = false;
  } else {
    let margeSimu = document.createElement("p");
    let margeTemp = priceSell.value - priceBuy.value;
    margeSimu.innerText = `Marge : ${margeTemp} €`;
    alertMessage.insertAdjacentElement("beforeend", margeSimu);
    validation = true;
  }
};

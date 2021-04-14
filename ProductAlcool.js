class ProductAlcool extends Product {
  constructor(
    productName,
    quantity,
    priceBuy,
    priceSell,
    boissonType,
    id,
    alcoolDegree
  ) {
    super(productName, quantity, priceBuy, priceSell, boissonType, id);
    this.alcoolDegree = alcoolDegree;
  }
}

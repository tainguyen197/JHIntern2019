class User {
  constructor() {
    this.id = createUuid();
    this.cart = new Cart();
  }

  toTalPrice() {
    const listPrice = [];
    this.cart.buyItems.forEach(item => {
      let product = listBestSell.filter(itemSell => {
        return itemSell.id === item.product;
      })[0];

      if (!product) {
        product = listHotSell.filter(itemHot => {
          return itemHot.id === item.product;
        })[0];
      }

      listPrice.push(product.price * item.number  );
    });

    return listPrice.reduce((previous, cusor) =>{
      return previous + cusor;
    })
  }
}

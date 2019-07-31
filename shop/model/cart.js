class Cart {
  constructor() {
    this.buyItems = [];
  }
  isDuplicate(productId) {
    return this.buyItems.some(item => {
      if (productId === item.product) {
        return true;
      }
    });
  }

  addCart(productId) {
    if (this.isDuplicate(productId)) {
      this.buyItems.forEach(item => {
        if (item.product === productId) this.updateNumberItem(item, 1);
      });
    } else {
      const item = {
        number: 1,
        product: productId
      };
      this.buyItems.push(item);
    }
  }

  removeCart(productId){
    this.buyItems.forEach(item => {
      if (item.product === productId) this.updateNumberItem(item, -1);
    });
  }

  updateNumberItem(item, number) {
    if (item.number <= 1 && number < 0) {
      this.buyItems.some((itemCart, index) => {
        if (itemCart.product === item.product) {
          this.buyItems.splice(index, 1);
          return true;
        }
      });
    }
    item.number += number;
  }

  toTalPrice() {
    const listPrice = [];
    this.buyItems.forEach(item => {
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

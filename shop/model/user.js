
class User {
    constructor(){
        this.id = createUuid();
        this.cart = new Cart();
    }

      // toTalPrice() {
      //   const sellPrice = this.buyItems.reduce((pre, cusor, index, arr) => {
      //     return (
      //       pre.product.price.price * pre.number +
      //       cusor.product.price.price * cusor.number
      //     );
      //   });
      //   return new Money(sellPrice);
      // }
  }
  
  
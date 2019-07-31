class User {
  constructor() {
    this.id = createUuid();
    this.cart = new Cart();
  }


}

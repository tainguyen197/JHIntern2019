class Product {
    constructor(name, price, unit, src) {
      this.id = createUuid();
      this.name = name || "Name";
      this.image = src;
      this.price = new Money(price, unit);
    }
  
    setProductMoney(price, unit) {
      if (this.price) {
        this.price.price = price;
        this.price.unit = unit;
      }
    }
  
    isDuplicate(product) {
      return this.id === product.id;
    }

    getProductById(id){
        if(this.id === id){
          return this;
        }      
    }
  }
class Money {
    constructor(price, unit) {
      this.price = price || 0;
      this.unit = unit || "VND";
    }
  
    getFinalSellPrice() {
      return this.sellPrice - this.sellPrice * discount;
    }
  }
  
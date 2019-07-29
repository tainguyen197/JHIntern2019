function createUuid() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
    c
  ) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

class User {
  constructor() {
    this.id = createUuid();
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
    //check is duplicate item
    if (this.isDuplicate(productId)) {
      this.buyItems.forEach(item => {
        if (item.product === productId) this.updateNumberItem(item, 1);
      });
    } else {
      const item = {
        // id: createUuid(),
        number: 1,
        product: productId
      };
      this.buyItems.push(item);
    }

    //   updatePriceItem(item);
  }

  updateNumberItem(item, number) {
    if (item.number <= 1 && number < 0) {
      this.buyItems.some((itemCart, index) => {
        if (itemCart.id === item.id) {
          this.buyItems.splice(index, 1);
          return true;
        }
      });
    }
    item.number += number;
  }

  //   toTalPrice() {
  //     const sellPrice = this.buyItems.reduce((pre, cusor, index, arr) => {
  //       return (
  //         pre.product.price.price * pre.number +
  //         cusor.product.price.price * cusor.number
  //       );
  //     });
  //     return new Money(sellPrice);
  //   }
}

class Money {
  constructor(price, unit) {
    this.price = price || 0;
    this.unit = unit || "VND";
  }

  getFinalSellPrice() {
    return this.sellPrice - this.sellPrice * discount;
  }
}

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
}

class Commission {
  constructor(comission) {
    this.comission = comission || 0;
  }

  setComission(value) {
    this.comission = value;
  }
}

const Customer = new User();
const commissionForProvider = new Commission(0.15);

const initItems = function(listItem, bestSeller) {
  listItem.forEach((item, index) => {
    const itemBox = document.createElement("div");
    itemBox.classList.add("item-box");

    const imgItemBox = document.createElement("div");
    imgItemBox.classList.add("img-item-box");

    const img = document.createElement("img");
    img.setAttribute("src", item.image);

    const titleContent = document.createElement("p");
    titleContent.classList.add('item-title');
    titleContent.textContent = item.name;

    const itemBoxContent = document.createElement("div");
    itemBoxContent.classList.add("item-box-content");

    const cartItemButton = document.createElement("div");
    cartItemButton.classList.add("cart-item-button");

    const priceItem = document.createElement("p");
    priceItem.classList.add("price");
    priceItem.textContent = customMoney(item.price.price) + " " + item.price.unit;

    const buttonCart = document.createElement("button");
    buttonCart.textContent = "Buy";
    buttonCart.setAttribute("id", item.id);
    bestSeller.appendChild(itemBox);

    itemBox.appendChild(imgItemBox);
    imgItemBox.appendChild(img);

    itemBox.appendChild(itemBoxContent);

    itemBoxContent.appendChild(titleContent);

    itemBoxContent.appendChild(cartItemButton);

    cartItemButton.appendChild(priceItem);
    cartItemButton.appendChild(buttonCart);

    buttonCart.addEventListener("click", () => {
      Customer.addCart(item.id);
      updateNumberIconCart();
      setCookie();
    });
  });
};

updateNumberIconCart = () => {
  document.getElementById("numberCart").textContent = Customer.buyItems.length;
  //save data in cookie
};

setCookie = () =>{
    const now = new Date();
    const timeExpire = now.getTime() +   1000 * 60 * 60;
    now.setTime(timeExpire);
    document.cookie =
      "listItem=" + JSON.stringify(Customer.buyItems) + ";expires=" + now;
}

initListProductBestSell = () => {
  const listBestSell = [
    new Product(
      "Raw Hem Butterfly Embroidered Cropped Tee - White M",
      30000,
      "VND",
      "./img/product/1.jpg"
    ),
    new Product(
      "Spaghetti Strap Cropped Top - Black S",
      40000,
      "VND",
      "./img/product/2.jpg"
    ),
    new Product(
      "Smocked Printed Sleeveless A Line Dress - Light Blue S",
      324000,
      "VND",
      "./img/product/3.jpg"
    ),
    new Product(
      "Floral Print Buttoned A Line Skirt Set - Deep Blue S",
      432000,
      "VND",
      "./img/product/4.jpg"
    ),
    new Product(
      "Open Back Cropped Tank Top - Black S",
      890000,
      "VND",
      "./img/product/5.jpg"
    ),
    new Product(
      "ZAFUL Ribbed Fire Heart Cropped Tank Top - White S",
      499000,
      "VND",
      "./img/product/6.jpg"
    ),
    new Product(
      "Striped Belted Cami Romper - Purplish Blue S",
      400000,
      "VND",
      "./img/product/7.jpg"
    ),
    new Product(
      "Flap Pockets Chain Jogger Pants - Black S",
      440000,
      "VND",
      "./img/product/8.jpg"
    ),
    new Product(
      "Polka Dot Plunging Ruffle Skirt Set - White S",
      346000,
      "VND",
      "./img/product/9.jpg"
    ),
    new Product(
      "ZAFUL Glitter Strapless Asymmetrical Skirt Set - Black M",
      604000,
      "VND",
      "./img/product/10.jpg"
    )
  ];
  const mainContain = document.getElementById("best-item");
  initItems(listBestSell, mainContain);
};

initListHotSell = () => {
  const listHotSell = [
    new Product(
      "Raw Hem Butterfly Embroidered Cropped Tee - White M",
      30000,
      "VND",
      "./img/product/11.jpg"
    ),
    new Product(
      "Spaghetti Strap Cropped Top - Black S",
      40000,
      "VND",
      "./img/product/12.jpg"
    ),
    new Product(
      "Smocked Printed Sleeveless A Line Dress - Light Blue S",
      324000,
      "VND",
      "./img/product/13.jpg"
    ),
    new Product(
      "Floral Print Buttoned A Line Skirt Set - Deep Blue S",
      432000,
      "VND",
      "./img/product/14.jpg"
    ),
    new Product(
      "Open Back Cropped Tank Top - Black S",
      890000,
      "VND",
      "./img/product/15.jpg"
    ),
    new Product(
      "ZAFUL Ribbed Fire Heart Cropped Tank Top - White S",
      499000,
      "VND",
      "./img/product/16.jpg"
    ),
    new Product(
      "Striped Belted Cami Romper - Purplish Blue S",
      400000,
      "VND",
      "./img/product/17.jpg"
    ),
    new Product(
      "Flap Pockets Chain Jogger Pants - Black S",
      440000,
      "VND",
      "./img/product/18.jpg"
    ),
    new Product(
      "Polka Dot Plunging Ruffle Skirt Set - White S",
      346000,
      "VND",
      "./img/product/19.jpg"
    ),
    new Product(
      "ZAFUL Glitter Strapless Asymmetrical Skirt Set - Black M",
      604000,
      "VND",
      "./img/product/20.jpg"
    )
  ];
  const mainContain = document.getElementById("hot-item");
  initItems(listHotSell, mainContain);
};

const displayMenu = close => {
  if (menu.classList.contains("menu-show")) {
    menu.classList.remove("menu-show");
  } else if (close === false) menu.classList.add("menu-show");

  if (nav.classList.contains("nav-icon") && !close) {
    nav.classList.remove("nav-icon");
    nav.classList.add("nav-icon-close");
  } else {
    nav.classList.add("nav-icon");
    nav.classList.remove("nav-icon-close");
  }
};

const initNumberIconCart = () => {
  const itemInCookie = document.cookie.split("; ");
  itemInCookie.forEach(item => {
    if (item.search("listItem") >= 0) {
      const itemInCart = JSON.parse(item.slice("listItem".length + 1));
      itemInCart.forEach(item => {
        Customer.addCart(item);
      });

      updateNumberIconCart();
    }
  });
  // console.log(itemInCart);
};

const init = () => {
  initListProductBestSell();
  initListHotSell();
  initNumberIconCart();
};

const nav = document.getElementById("nav-icon");
nav.addEventListener("click", e => displayMenu(false));

main = () => {
  init();
};

main();

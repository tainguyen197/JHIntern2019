const user = new User();
const comissionForProvider = new Commission(0.15);

const cartBox = document.getElementById("cartBoxContent");
// console.log(cartBox)
showItem = (item, number) => {
  // console.log(item)
  // const cartBox = document.getElementById('')

  const itemCart = document.createElement("div");
  itemCart.classList.add("item-cart");

  const imgItem = document.createElement("img");
  imgItem.setAttribute("src", item.src);

  const itemNameBox = document.createElement("div");
  itemNameBox.classList.add("item-name-box");

  const itemNameBoxp = document.createElement("p");
  itemNameBoxp.textContent = item.name;

  const itemPriceBox = document.createElement("div");
  itemPriceBox.classList.add("item-price-box");

  const itemPriceBoxp = document.createElement("p");
  itemPriceBoxp.textContent = customMoney(item.price) + item.unit;

  const selectNumberBox = document.createElement("div");
  selectNumberBox.classList.add("select-number-box");

  const selectNumberBoxbtnMinus = document.createElement("button");
  const selectNumberBoxbtnAdd = document.createElement("button");
  const selectNumberBoxinput = document.createElement("input");

  cartBox.appendChild(itemCart);

  itemCart.appendChild(imgItem);
  itemCart.appendChild(itemNameBox);
  itemNameBox.appendChild(itemNameBoxp);

  itemCart.appendChild(itemPriceBox);
  itemPriceBox.appendChild(itemPriceBoxp);

  itemCart.appendChild(selectNumberBox);
  selectNumberBox.appendChild(selectNumberBoxbtnMinus);
  selectNumberBoxbtnMinus.textContent = "-";
  selectNumberBox.appendChild(selectNumberBoxinput);
  selectNumberBoxinput.setAttribute("readonly", true);
  selectNumberBoxinput.value = number;
  selectNumberBox.appendChild(selectNumberBoxbtnAdd);
  selectNumberBoxbtnAdd.textContent = "+";

  selectNumberBoxbtnAdd.addEventListener("click", () => {
    user.cart.addCart(item.id);
    setCookie();
    window.location.reload();
  });

  selectNumberBoxbtnMinus.addEventListener("click", () => {
    user.cart.removeCart(item.id);
    setCookie();
    window.location.reload();
  });
};

showListItemInCart = () => {};

showCost = (temporaryCost, comission, totalPrice, unit) => {
  const temporary = document.getElementById("emporaryPrice");
  const comissionProvider = document.getElementById("comission");
  const totalCost = document.getElementById("totalPrice");

  temporary.textContent = customMoney(temporaryCost) + unit;
  comissionProvider.textContent = comission + "%";
  totalCost.textContent = customMoney(totalPrice) + unit;
};

cart = () => {
  initItemInCart();
  user.cart.buyItems.forEach(element => {
    //search in listBestSell
    const product =
      listBestSell.filter(item => {
        return item.id === element.product;
      }).length > 0
        ? listBestSell.filter(item => {
            return item.id === element.product;
          })[0]
        : listHotSell.filter(item => {
            return item.id === element.product;
          })[0];

    // let product = listBestSell.filter(item => {
    //   return item.id === element.product;
    // })[0];

    // if (!product) {
    //   product = listHotSell.filter(item => {
    //     return item.id === element.product;
    //   })[0];
    // }

    //show product
    showItem(product, element.number);
  });

  const temporaryCost = user.cart.toTalPrice();
  const comission = comissionForProvider.comission;

  const totalPrice = temporaryCost - temporaryCost * comission;

  showCost(temporaryCost, comission * 100, totalPrice, "đ");
};

cart();

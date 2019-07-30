initItems = function(listItem, bestSeller) {
  listItem.forEach((item) => {
    const itemBox = document.createElement("div");
    itemBox.classList.add("item-box");

    const imgItemBox = document.createElement("div");
    imgItemBox.classList.add("img-item-box");

    const img = document.createElement("img");
    img.setAttribute("src", item.src);

    const titleContent = document.createElement("p");
    titleContent.classList.add('item-title');
    titleContent.textContent = item.name;

    const itemBoxContent = document.createElement("div");
    itemBoxContent.classList.add("item-box-content");

    const cartItemButton = document.createElement("div");
    cartItemButton.classList.add("cart-item-button");

    const priceItem = document.createElement("p");
    priceItem.classList.add("price");
    priceItem.textContent = customMoney(item.price) + " " + item.unit;

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
      user.cart.addCart(item.id);
      updateNumberIconCart();
      setCookie();
    });
  });
};

updateNumberIconCart = () => {
  document.getElementById("numberCart").textContent = user.cart.buyItems.length;
  //save data in cookie
};

setCookie = () =>{
    const now = new Date();
    const timeExpire = now.getTime() +   1000 * 60 * 60;
    now.setTime(timeExpire);
    document.cookie =
      "listItem=" + JSON.stringify(user.cart.buyItems) + ";expires=" + now;
}

initListProductBestSell = () => {
  const mainContain = document.getElementById("best-item");
  initItems(listBestSell, mainContain);
};

initListHotSell = () => {
  const mainContain = document.getElementById("hot-item");
  initItems(listHotSell, mainContain);
};

delCookie = () =>{
  document.cookie =
      "listItem=" + JSON.stringify(user.cart.buyItems) + ";expires=Thu, 01 Jan 1970 00:00:00 UTC"
}

initItemInCart = () => {
  const itemInCookie = document.cookie.split("; ");
  itemInCookie.forEach(item => {
    if (item.search("listItem") >= 0) {
      const itemInCart = JSON.parse(item.slice("listItem".length + 1));

      user.cart.buyItems = itemInCart;
      updateNumberIconCart();
    }
  });
};

const user = new User();
const commissionForProvider = new Commission(0.15);

main = () => {
  initListProductBestSell();
  initListHotSell();


  initItemInCart();

  // console.log('buy',user.buyItems)
  // delCookie(); 
};

main();

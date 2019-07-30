

  updateNumberIconCart = () => {
    document.getElementById("numberCart").textContent = user.cart.buyItems.length;
    //save data in cookie
  };

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
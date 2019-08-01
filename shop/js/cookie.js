setCookie = () =>{
    const now = new Date();
    const timeExpire = now.getTime() +   1000 * 60 * 60;
    now.setTime(timeExpire);
    document.cookie =
      "listItem=" + JSON.stringify(user.cart.buyItems) + ";expires=" + now;
}

delCookie = () =>{
    document.cookie =
        "listItem=;expires=Thu, 01 Jan 1970 00:00:00 UTC"
  }
  
  
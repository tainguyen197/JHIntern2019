const username = document.getElementById("username");
const password = document.getElementById("password");
const btnLogin = document.getElementById("btnLogin");
btnLogin.addEventListener("click", () => {
  login();
});

login = () => {
  const user = username.value;
  const pass = password.value;

  const account = checkLogin(user, pass);
  // console.log(account);
  if (!account) {
    window.alert("Wrong login");
  } else {
    //login success
    signIn(user);
    //redirect homepage
    const host = window.location.origin;
    const pathname = window.location.pathname;
    const url =
      host +
      pathname.slice(0, window.location.pathname.lastIndexOf("/")) +
      "/shop.html";
    window.location.replace(url);
  }
};


checkLogin = (user, pass) => {
  //search account in db
  return listUser.filter(item => {
    return item.username === user && item.password === pass;
  })[0];
};

const userInfo = checkCookie();
if (userInfo) {
  const host = window.location.origin;
  const pathname = window.location.pathname;
  const url =
    host +
    pathname.slice(0, window.location.pathname.lastIndexOf("/")) +
    "/shop.html";
  window.location.replace(url);
}
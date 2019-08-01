//set type user in line 43

const customer = "Tai";
const admin = "Admin";
const nav = document.getElementById("nav-icon");
nav.addEventListener("click", e => displayMenu(false));

initMenu = () => {
  const menu = document.getElementById("menu");
  const ul = document.createElement("ul");
  const login = document.createElement("li");
  const user = document.createElement("li");
  const about = document.createElement("li");
  const location = document.createElement("li");
  const logout = document.createElement("li");

  const userInfo = checkCookie();
  menu.appendChild(ul);

  if (userInfo) {
    logout.textContent = "Log out";
    user.textContent = "Hi, " + userInfo;
    about.textContent = "About";

    ul.appendChild(user);
    ul.appendChild(about);

    if (userInfo === 'admin') {
      location.textContent = "Location";
      ul.appendChild(location);
    }

    ul.appendChild(logout);
  } else {
    login.textContent = "Login";
    ul.appendChild(login);
    about.textContent = "About";
    ul.appendChild(about);
  }

  login.addEventListener("click", () => {
    const user = customer;
    // signIn(user);
    const host = window.location.origin;
    const pathname = window.location.pathname;
    const url =
      host +
      pathname.slice(0, window.location.pathname.lastIndexOf("/")) +
      "/login.html";
    window.location.replace(url);
  });

  logout.addEventListener("click", () => {
    signOut();
    window.location.reload();
  });

  location.addEventListener("click", () => {
    const locationMap = document.getElementById("mapBox");
    locationMap.classList.add("map-box-active");
  });
};

signOut = () => {
  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
};

signIn = user => {
  const now = new Date();
  const timeExpire = now.getTime() + 1000 * 60 * 60;
  now.setTime(timeExpire);
  document.cookie = "user=" + user + ";expires=" + now;
};

//check cookie if user logged
checkCookie = () => {
  const cookieInfo = document.cookie;
  if (cookieInfo) {
    const itemInCookie = document.cookie.split("; ");
    const userInfo = itemInCookie.filter(item => {
      if (item.search("user") >= 0) {
        return true;
      }
    });
    if (userInfo.length > 0) {
      return userInfo[0].slice("user".length + 1);
    }
  }
  return null;
};

displayMenu = close => {
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

initMenu();

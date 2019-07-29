initMenu = () => {
  const menu = document.getElementById("menu");
  const ul = document.createElement("ul");
  const login = document.createElement("li");
  const user = document.createElement("li");
  const about = document.createElement("li");
	const location = document.createElement("li");
  const logout = document.createElement("li");
	

  const userInfo = checkCookie();
	console.log(userInfo)
  menu.appendChild(ul);

  if (userInfo) {
   
		location.textContent = "Location";
		logout.textContent = "Logout";
		user.textContent = 'Hi, ' + userInfo;
    ul.appendChild(user);
		ul.appendChild(location);
		about.textContent = "About";
		ul.appendChild(about);

		ul.appendChild(logout);

  } else {
    login.textContent = "Login";
		ul.appendChild(login);
		about.textContent = "About";
		ul.appendChild(about);
  }


	
	login.addEventListener('click',()=>{
		const user = 'Tai';
		signIn(user);
		window.location.reload();

	})

	logout.addEventListener('click',()=>{
		signOut();
		window.location.reload();
	})

};

signOut = () =>{
	document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}

signIn = (user) =>{
	const now = new Date();
	const timeExpire = now.getTime() + 1000 * 60 * 60;
	now.setTime(timeExpire);
	document.cookie = "user="+user+";expires=" + now;
}

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
    if(userInfo.length>0){

			return userInfo[0].slice("user".length + 1);;
		}
  }
  return null;
};
initMenu();

/*
Import Note: The global.js hold every general data that needs that is to run in the app
for example: If the app needs to redirect to login after session has expires
             or another example where certified[0] or user data ae destroyed from the broswer
*/

if(onsessionUser){
    const navSignIn = document.querySelector("#nav-sign-in") || false;
    navSignIn ? navSignIn.classList.add('d-none'): null;
    const trackUserNav = document.querySelector('[data-user-drop-box]') || false;
    const trackUserNotify = document.querySelector('#notification-tab') || false;
    const trackAdminNotify = document.querySelector('#adminNotify') || false;
          trackUserNotify ? trackUserNotify.style.display = 'block' : null;
          trackUserNav ? trackUserNav.style.display = 'block' : null;
          trackAdminNotify ? trackAdminNotify.style.display = 'block': null;
}
//Logout Code
const logoutUser = document.querySelector('[data-logout]') || false;


const logoutUserFunc = () => {
 
    const {user} = JSON.parse(localStorage.getItem('DevelopND-user')) || false; 
    if(user){
        if(user.user_type == 'admin' || user.user_type == 'contractor'){
            localStorage.clear();
            location.replace(`${window.location.origin}/account/admin`);
        }else{
            localStorage.clear();
            location.replace(`${window.location.origin}/login.html`);
        }
    }else {
        localStorage.clear();
        location.replace(`${window.location.origin}/login.html`);
    }
 
}


logoutUser ? logoutUser.addEventListener('click', logoutUserFunc) : null;

// //Resize Sidebar in mobile view

// function myFunction(x) {
//   if (x.matches) { // If media query matches

//    const sideBar = document.querySelector('#sidebar');
//    sideBar.classList.remove('active');
//   } else {
//     const sideBar = document.querySelector('#sidebar');
//     sideBar.classList.add('active');
//   }
// }

// var x = window.matchMedia("(max-width: 768px)")
// myFunction(x) // Call listener function at run time
// x.addListener(myFunction) // Attach listener function on state changes


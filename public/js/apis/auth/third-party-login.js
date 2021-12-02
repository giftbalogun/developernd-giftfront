const googleBtn = document.querySelector('[data-google-login]');
const facebookBtn = document.querySelector('[data-facebook-login]');

const googleauthenticate = (event) => {
    event.preventDefault();
    console.log('google')
    localStorage.setItem('platform', true);
    console.log(localStorage.getItem('platform'))
    //Store the Login Platform
    const routes = new Routes();
    //Call an auth popup
    window.open(`${routes.apiOrigin}${routes.googleAuth}`, "Google Authentication", "height=650, width=600, resizable=yes");
}


//Facebook Auth
const facebookauthenticate = (event) => {
    event.preventDefault();
    const routes = new Routes();
    localStorage.setItem('platform', true);

     //Call an auth popup
    window.open(`${routes.apiOrigin}${routes.facebookAuth}`, "Facebook Authentication", "height=650, width=600, resizable=yes");
}

googleBtn.addEventListener('click', (event) => googleauthenticate(event, googleBtn))
facebookBtn.addEventListener('click', (event) => facebookauthenticate(event, facebookBtn))

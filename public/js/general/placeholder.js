/*
Import Note: The placeholder.js hold every repeated data that needs to be appllied to more than 3 pages 
for example-> The website title or name should be place in the placholder

*/
//Website Title Placeholder
const website_title = 'DevelopND';
//insert into DOM
const title = document.querySelector('[data-title]');

// title.innerHTML = `${website_title} | ${title.innerHTML}`

//Wesite Logo 
const website_logo = '';
//Api status code placeholder
let status;
//This permit placeholder is use to allow a button to work after the validation has been met
let permit = false;
let permit_verify = false;


// Service Worker initialization
// Make sure service workers are supported
if ('serviceWorker' in navigator) {
    console.log('Service worker supported')
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('../sw_cached_site.js')
            .then(reg => console.log('Service Worker: Registered'))
            .catch(err => console.log(`Service Worker: Error: ${err}`))
    })
}

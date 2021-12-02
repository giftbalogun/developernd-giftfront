//This handles the validation of the login form
//Get the login form 
const loginForm   = document.querySelector('[data-login-form-email]');
const loginFormPhone   = document.querySelector('[data-login-form-phone]') || false;
//Get the error field
let emailError    = document.querySelector('#emailError');
let passwordErrorEmail    = document.querySelector('#passwordError-email');

let phoneError    = document.querySelector('#phoneError') || false;
let passwordErrorPhone    = document.querySelector('#passwordError-phone') || false;


const validateFormEmail = (loginForm) => {
    //Clear the error field 
    emailError.textContent = '';
    passwordErrorEmail.textContent = '';
    const testEmail  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //Convert form to formData
    const formData = new FormData(loginForm);
    //Throw error if field is empty
    if(formData.get('email') == '') {
        emailError.textContent = 'Please email field is required';
        permit = false;
        return false;
    }
    //Throw error if field is empty
    if(formData.get('password_email') == '') {
        passwordErrorEmail.textContent = 'Password field is required';
        permit = false;
        return false;
    }
    //Return error if email is invalid
    if(!testEmail.test(String(formData.get('email')).toLowerCase())) {
        emailError.textContent = 'Invalid email, please check email to continue!';
        permit = false;
        return false;
    }
    permit = true;
    console.log(permit)
}
loginForm.addEventListener('change', () => validateFormEmail(loginForm));
window.addEventListener('load', () => validateFormEmail(loginForm));
//Next the login api found 


const validateFormPhone = (loginFormPhone) => {
    //Clear the error field 
    phoneError.textContent = '';
    passwordErrorPhone.textContent = '';

    //Convert form to formData
    const formData = new FormData(loginFormPhone);


    //Throw error if field is empty
    if(formData.get('phone') == '') {
        console.log(formData.get('phone'))
        phoneError.textContent = 'Please phone field is required';
        permit = false;
        return false;
    }
    if(formData.get('phone')){
        const digit = formData.get('phone').toString()[0];
        if(digit == 0){
            const newPhone = formData.get('phone').toString().substr(1); 
            document.querySelector('#phone').value = newPhone;
        }
    }
    
    //Return error if email is invalid
    if(isNaN(formData.get('phone'))) {
        phoneError.textContent = 'Invalid phone number, please check to continue!';
        permit = false;
        return false;
    }
    //Throw error if field is empty
    if(formData.get('password_phone') == '') {
        passwordErrorPhone.textContent = 'Password field is required';
        permit = false;
        return false;
    }
    
    permit = true;
    console.log(permit)
}
if(loginFormPhone) {
    loginFormPhone.addEventListener('change', () => validateFormPhone(loginFormPhone));
    window.addEventListener('load', () => validateFormPhone(loginFormPhone));    
}

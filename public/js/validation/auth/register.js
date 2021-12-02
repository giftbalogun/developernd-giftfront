//This handles the validation of the register form
//Get the register form 
const registerForm   = document.querySelector('[data-register-form-email]');
const registerFormPhone   = document.querySelector('[data-register-form-phone]');
//Get the error field
let emailError    = document.querySelector('#emailError');
let passwordErrorEmail    = document.querySelector('#passwordError-email');

let phoneError    = document.querySelector('#phoneError');
let passwordErrorPhone    = document.querySelector('#passwordError-phone');


const validateFormEmail = (registerForm) => {
    //Clear the error field 
    emailError.textContent = '';
    passwordErrorEmail.textContent = '';
    const testEmail  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //Convert form to formData
    const formData = new FormData(registerForm);
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
registerForm.addEventListener('change', () => validateFormEmail(registerForm));
window.addEventListener('load', () => validateFormPhone(registerForm));
//Next the register api found 


const validateFormPhone = (registerFormPhone) => {
    //Clear the error field 
    phoneError.textContent = '';
    passwordErrorPhone.textContent = '';

    //Convert form to formData
    const formData = new FormData(registerFormPhone);
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
registerFormPhone.addEventListener('change', () => validateFormPhone(registerFormPhone));
window.addEventListener('load', () => validateFormPhone(registerFormPhone));

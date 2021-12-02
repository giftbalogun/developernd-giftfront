//This handles the validation of the register form
//Get the register form 
const verifyForm   = document.querySelector('[data-verify-form]');
//Get the error field

let codeError    = document.querySelector('#codeError');

const validateVerifyForm = (verifyForm) => {
    //Clear the error field 
    codeError.innerHTML = '';
    //Convert form to formData
    const formData = new FormData(verifyForm);
    //Throw error if field is empty
    if(formData.get('verifycode') == '') {

        codeError.innerHTML = 'Please email field is required';
        permit_verify = false;
        return false;
    }
    if(isNaN(formData.get('verifycode'))) {
        codeError.innerHTML = 'Verification code must be a number digit';
        permit_verify = false;
        return false;
    }
    if(formData.get('verifycode').length < 6) {

        codeError.innerHTML = 'Verification code cannot be less than six';
        permit_verify = false;
        return false;
    }
    permit_verify = true;
}
verifyForm.addEventListener('change', () => validateVerifyForm(verifyForm));
//Next the register api found 


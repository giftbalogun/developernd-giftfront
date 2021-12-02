const useEmailForm = document.querySelector("#use-email-form");
const continueEmailLink = document.querySelector("#continue-email");
const usePhoneForm = document.querySelector("#use-phone-form");
const continuePhoneLink = document.querySelector("#continue-phone");
const confirmForm = document.querySelector("#confirm-form")

const EmailRegBtn =  document.querySelector("[data-email-reg-btn]")
const PhoneRegBtn =  document.querySelector("[data-phone-reg-btn]")

continueEmailLink.addEventListener('click', () => {
    useEmailForm.classList.remove("d-none");
    continueEmailLink.classList.add("d-none");
    //
    usePhoneForm.classList.add("d-none");
    continuePhoneLink.classList.remove("d-none");
})
continuePhoneLink.addEventListener('click', () => {
    usePhoneForm.classList.remove("d-none");
    continuePhoneLink.classList.add("d-none");
    //
    useEmailForm.classList.add("d-none");
    continueEmailLink.classList.remove("d-none");
})
const registerApi = (event, key = null) => {
    event.preventDefault();
    //Convert form to formData
    const formData = new FormData();
    const routes = new Routes();
    let submitBtn;
    
    const url = `${ routes.apiOrigin }${ routes.register }`;
    console.log(url);

    if(permit == true) {//Condition that check if validation is true
          //Handle who is useing his function
        if(key == 'EmailRegBtn'){
            formData.append('auth_permit', document.querySelector('#email').value);
            formData.append('password',  document.querySelector('#password_email').value);
            submitBtn = EmailRegBtn;

        }else if(key == 'PhoneRegBtn'){
            const phone = `${document.querySelector('#country_code').value}${document.querySelector('#phone').value}`;
            console.log(phone);
            formData.append('auth_permit', phone);
            formData.append('password',  document.querySelector('#password_phone').value);
            submitBtn = PhoneRegBtn;
         }
         submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" style="width: 1.3em; height: 1.3em;" role="status" aria-hidden="true"></span>'

         //Catch error status code
         const errorHandling = (response) => {
            status = response.status;
            console.log(status)
            return response.json();
         }
         
        const getResponse = (data) => {
            switch(status) {
                case 422:
                    submitBtn.innerHTML = 'Try Again';
                    $('#responseModal').modal('toggle');
                    $('#response').html(`
                            <p style="color:red; font-size:14px;">Registration failed:
                            ${JSON.stringify(data.errors).split('"').join('').split('{').join('').split('}').join('')}
                            </p>`);
                    break;
                
                case 501:
                    submitBtn.innerHTML = 'Try Again';
                    $('#responseModal').modal('toggle');
                    $('#response').html(`
                            <p style="color:red; font-size:14px;">An error occured while creating an account, please try again!
                            </p>`);
                    break;
                case 201:
                $('#responseModal').modal('toggle');
                    if(key == 'EmailRegBtn'){
                        submitBtn.innerHTML = 'Continue with email';
                        permit = false;
                        $('#response').html(`
                                <p style="color:#0b273d; font-size:14px;">Please check email a verification code has been sent to you to confirm account</p>`);
                        confirmForm.classList.remove('d-none');
                        document.querySelector('[data-email-rg]').textContent = `email ${formData.get('auth_permit')}`;
                    }else if (key == 'PhoneRegBtn'){
                         submitBtn.innerHTML = 'Continue with phone';
                        permit = false;
                        $('#response').html(`
                                <p style="color:#0b273d; font-size:14px;">Please check your phone a verification code has been sent to you to confirm account</p>`);
                        confirmForm.classList.remove('d-none');
                        document.querySelector('[data-email-rg]').textContent = `phone ${formData.get('auth_permit')}`;
                    }
                   
                    break;
                default:

            }
         }
         fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Accept": "aplication/json"
            },
            body: formData
         })
         .then(response => errorHandling(response))
         .then(data => {
             if(data) {
                 console.log(data);
                 getResponse(data);
             }
         })
         .catch(err => {
             if(err) {
                submitBtn.innerHTML = 'Continue with email';
                $('#responseModal').modal('toggle');
                $('#response').html(`
                        <p style="color:#0b273d; font-size:14px;">This may be due to internet connection not available, please turn on internet connection or contact website owner, Thank you!</p>`);
            
             }
             console.error(err);
         })
    }

}

EmailRegBtn.addEventListener('click', (event) => registerApi(event, key = 'EmailRegBtn'));
PhoneRegBtn.addEventListener('click', (event) => registerApi(event, key = 'PhoneRegBtn'));
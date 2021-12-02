const useEmailForm = document.querySelector("#use-email-form");
const continueEmailLink = document.querySelector("#continue-email");
const usePhoneForm = document.querySelector("#use-phone-form");
const continuePhoneLink = document.querySelector("#continue-phone");


const EmailLoginBtn =  document.querySelector("[data-email-log-btn]")
const PhoneLoginBtn =  document.querySelector("[data-phone-log-btn]") || false;


const key = document.querySelector('[data-key]').innerHTML;
if (key == 1) {
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
}

const loginApi = (event, accessKey = null) => {
    event.preventDefault();
    let url;
    const routes = new Routes();
    const formData = new FormData();
    let submitBtn;
        //Catch error status code
        const errorHandling = (response) => {
            status = response.status;
            console.log(status)
            return response.json();
        }

        const getResponse = (data) => {
            console.log(status)
            switch (status) {
                case 422:
                    submitBtn.innerHTML = 'Try Again';
                    $('#responseModal').modal('toggle');
                    $('#response').html(`
                            <p style="color:red; font-size:14px;">Login failed:
                            ${JSON.stringify(data.errors).split('"').join('').split('{').join('').split('}').join('')}
                            </p>`);
                    break;
                case 400:
                    console.log(status)
                    submitBtn.innerHTML = 'Try Again';
                    $('#responseModal').modal('toggle');
                    $('#response').html(`
                            <p style="color:red; font-size:14px;">Login failed: Your login details are invalid, please try again!
                            </p>`);
                    break;
                default:
                    //insert the data into broswer localStorage
                    localStorage.setItem('token', JSON.stringify(data.token));
                    localStorage.setItem('DevelopND-user', JSON.stringify(data));

                    if(!data.two_factor){           
                        if (data.user.user_type == 'admin' && key == 0) {
                            location.replace(`${window.location.origin}/account/admin/dashboard-home.html`);
                        } else if (data.user.user_type == 'contractors' && key == 01) {
                            location.replace(`${window.location.origin}/account/contractors/contractors.html`);
                        } else if (data.user.user_type == 'reviewer' && key == 1) {
                            location.replace(`${window.location.origin}/account/reviewer/reviewer.html`);
                        } else if (data.user.user_type == 'community_member' && key == 1) {
                            location.replace(`${window.location.origin}/project/search-results.html`);
                        }else {
                            $('#responseModal').modal('toggle');
                            $('#response').html(`
                                    <p style="color:red; font-size:14px;">Login failed: This email is not permitted to access this login route!
                                    </p>`);
                        }
                    }else {
                        $('#responseModal').modal('toggle');
                        $('#response').html(`
                                <p style="color:#0b273d; font-size:14px;">${data.message}
                                </p>`);

                        setTimeout(() => {
                            location.replace(`${window.location.origin}/verify-account.html`);
                        }, 3000);
                    
                    }
            }
        }

    console.log(permit)
    if (key == 1) {
        url = `${routes.apiOrigin}${routes.login_1}`;
    } else if (key == 0) {
        url = `${routes.apiOrigin}${routes.login_0}`;
    }

    console.log(url);
    console.log(permit)
    if (permit == true) {//Condition that check if validation is true
        //Convert form to formData
       
        if(accessKey == 'EmailLoginBtn'){
            formData.append('auth_permit', document.querySelector('#email').value);
            formData.append('password',  document.querySelector('#password_email').value);
            submitBtn = EmailLoginBtn;

        }else if(accessKey == 'PhoneLoginBtn'){
            const phone = `${document.querySelector('#country_code').value}${document.querySelector('#phone').value}`;
            console.log(phone);
            formData.append('auth_permit', phone);
            formData.append('password',  document.querySelector('#password_phone').value);
            submitBtn = PhoneLoginBtn;
         }
         console.log(submitBtn)
         submitBtn.setAttribute('disabled', true);
         submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" style="width: 1.3em; height: 1.3em;" role="status" aria-hidden="true"></span>'

       
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
                console.log(data);
                submitBtn.removeAttribute('disabled');
                submitBtn.innerHTML = 'Continue with email';
                if(data == 'Not Allowed, Only for admins and contractors'){
                    $('#responseModal').modal('toggle');
                    $('#response').html(`<p style="color:red; font-size:13px;">
                    ${data}!
                    </p>`);
                    if(key == 0){
                        submitBtn.innerHTML = 'Continue as admin';
                    }
                    return;
                }

                if (data) {
                    console.log(data);
                    getResponse(data);
                }
            })
            .catch(err => {
                if (err) {
                    console.log(err)
                    submitBtn.removeAttribute('disabled');
                    $('#responseModal').modal('toggle');
                    $('#response').html(`<p style="color:red; font-size:13px;">
                    Unexpected Error, this could be from an unreliable network coverage, contact support if problem persit!
                    </p>`);
                }
                console.error(err);
            })
    }

}

EmailLoginBtn.addEventListener('click', (event) => loginApi(event, accessKey = 'EmailLoginBtn'));
if(PhoneLoginBtn){
    PhoneLoginBtn.addEventListener('click', (event) => loginApi(event, accessKey = 'PhoneLoginBtn'));
}

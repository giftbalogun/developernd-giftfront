const editProfileForm = document.querySelector('#edit-profile-form')
const changePasswordForm = document.querySelector('#change-password-form')
const fileName = document.querySelector('#file-name')
const responseText = document.querySelector('#response-text');

const validateExcel = (event, editProfileForm) => {
    event.preventDefault();
    console.log(event)
    //Convert form to formData
    const formData = new FormData(editProfileForm);

    const input = formData.get('image');
    console.log(input);
    fileName.innerHTML = input.name;
}

editProfileForm.addEventListener('change', (event) => validateExcel(event, editProfileForm))


const editProfileApi = (event, editProfileForm) => {
    event.preventDefault();
    const submitBtn = document.querySelector('#submitBtn');
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" style="width: 1.3em; height: 1.3em;" role="status" aria-hidden="true"></span>'
    const routes = new Routes();
    const editProfileUrl = `${routes.apiOrigin}${routes.editProfile}`;
    const formData = new FormData(editProfileForm);
    const token = JSON.parse(localStorage.getItem('token'));
    fetch(editProfileUrl, {
        method: "POST",
        mode: "cors",
        headers: {
            "Accept": "application/json",
            "Authorization": token
        },
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            submitBtn.innerHTML = 'Save Information';
            console.log(data);
            // requestStatus.classList.remove('d-none')
            responseText.innerHTML = data.message;
            const userData = JSON.parse(localStorage.getItem('DevelopND-user'));
            userData.user = data.user;
            localStorage.setItem('DevelopND-user', JSON.stringify(userData));


            console.log(localStorage.getItem('DevelopND-user'))
            $('#alertModal').modal('show');
            
            setTimeout(function(){
                location.reload()
            }, 2000);
        })
        .catch(err => {
            submitBtn.innerHTML = 'Save Information';
            console.error(err)
        })
}


editProfileForm.addEventListener('submit', (event) => editProfileApi(event, editProfileForm, certified[0]))


// Change Password
const oldPwdInput = document.querySelector("#old-pwd-input");
const pwdInput = document.querySelector("#pwd-input");
const confirmPwdInput = document.querySelector("#confirm-pwd-input");
const changePasswordApi = (event, changePasswordForm) => {
    event.preventDefault();
    const submitBtn = document.querySelector('#passBtn');
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" style="width: 1.3em; height: 1.3em;" role="status" aria-hidden="true"></span>'
    const routes = new Routes();
    const changePasswordUrl = `${routes.apiOrigin}${routes.changePassword}`;
    const formData = new FormData(changePasswordForm);
    console.log(certified[0])
    data = {
        old_password: oldPwdInput.value,
        password: pwdInput.value,
        password_confirmation: confirmPwdInput.value
    };
    const errorHandling = (response) => {
        status = response.status;
        console.log(status)
        return response.json();
    }
    fetch(changePasswordUrl, {
        method: "PUT",
        mode: "cors",
        headers: {
            "Accept": "application/json",
            "Authorization": certified[0],
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => errorHandling(response))
        .then(data => {
            console.log(data);
            submitBtn.innerHTML = 'Save Information';
            $('#alertModal').modal('show');
            if (status == 422) {
                console.log(data)
                result = JSON.stringify(data.errors).split('"').join('').split('{').join('').split('}').join('');
                console.log(result)
                responseText.innerHTML = result;
            } else if (status == 200) {
                responseText.innerHTML = data.success;
                setTimeout(function(){
                    location.reload()
                }, 2000);
            } else {
                responseText.innerHTML = "An Error Occured!";
            }
            // requestStatus.classList.remove('d-none')
        })
        .catch(err => {
            console.error(err.errors)
            submitBtn.innerHTML = 'Save Information';
            $('#alertModal').modal('show');
            // responseText.innerHTML = data.errors.message;
            result = JSON.stringify(data.errors).split('"').join('').split('{').join('').split('}').join('');
            console.log(result)
        })
}


changePasswordForm.addEventListener('submit', (event) => changePasswordApi(event, changePasswordForm, certified[0]))

// Delete Account
const deleteAccountBtn = document.querySelector('#delete-account-btn');
const deleteAccountApi = (event) => {
    event.preventDefault();
    deleteAccountBtn.innerHTML = '<span class="spinner-border spinner-border-sm" style="width: 1.3em; height: 1.3em;" role="status" aria-hidden="true"></span>'
    console.log("whatev")
    const routes = new Routes();
    const deleteAccountUrl = `${routes.apiOrigin}${routes.deleteAccount}`;
    console.log(certified[0])
    fetch(deleteAccountUrl, {
        method: "DELETE",
        mode: "cors",
        headers: {
            "Accept": "application/json",
            "Authorization": certified[0],
            "Content-type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            deleteAccountBtn.innerHTML = 'Yes Delete'
            // requestStatus.classList.remove('d-none')
            location.replace(`${window.location.origin}`)
        })
        .catch(err => {
            deleteAccountBtn.innerHTML = 'Yes Delete'
            console.error(err)
        })
}


deleteAccountBtn.addEventListener('click', (event) => deleteAccountApi(event, certified[0]))



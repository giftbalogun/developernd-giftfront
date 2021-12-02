const routes = new Routes();
const url = `${ routes.apiOrigin}${ routes.resetPassword}`;
const resetForm = document.querySelector('#reset-form')
const requestStatus = document.querySelectorAll('.request-status')[0]

resetForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(resetForm);

    const submitBtn = document.querySelector('#recover-password')
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" style="width: 1.3em; height: 1.3em;" role="status" aria-hidden="true"></span>'

    fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
            "Accept": "aplication/json"
        },
        body: formData
     })
     .then(response => response.json())
     .then(data => {
      
         if(data.message == 'The given data was invalid.'){
            submitBtn.innerHTML = 'Try Again';
            $('#responseModal').modal('toggle');
            $('#response').html(`
                    <p style="color: red; font-size:14px;">
                    ${data.errors.verifycode ? data.errors.verifycode[0] : ''}<br>
                    ${data.errors.password ? data.errors.password[0] : ''}
                    </p>`);  
            return false;
         }
         if(data.success == false){
            submitBtn.innerHTML = 'Try Again';
            $('#responseModal').modal('toggle');
            $('#response').html(`
                    <p style="color: red; font-size:14px;">
                         ${data.message}
                    </p>`); 
            return false;
         }
         requestStatus.classList.remove('d-none')
        setTimeout(() => {
            location.replace("login.html")
        }, 3000);
        })
     .catch(err => {
         console.error(err)
         submitBtn.innerHTML = 'Get New Password';
     })
})
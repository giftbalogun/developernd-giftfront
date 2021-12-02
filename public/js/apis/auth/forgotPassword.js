const routes = new Routes();
const url = `${ routes.apiOrigin}${ routes.forgotPassword}`;
const forgotForm = document.querySelector('#forgot-form')
const requestStatus = document.querySelectorAll('.request-status')[0]


const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

forgotForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(forgotForm);
    
    if(formData.get('email') == "") {
        submitBtn.innerHTML = 'Try Again';
        $('#responseModal').modal('toggle');
        $('#response').html(`
                <p style="color: red; font-size:14px;">Email field cannot empty!
                </p>`); 
        return false;
    }
    if(!validateEmail(formData.get('email'))){
        submitBtn.innerHTML = 'Try Again';
        $('#responseModal').modal('toggle');
        $('#response').html(`
                <p style="color: red; font-size:14px;"> The email is invalid, please use a valid email to continue!
                </p>`);  
     }
    const submitBtn = document.querySelector('#recover-email')
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" style="width: 1.3em; height: 1.3em;" role="status" aria-hidden="true"></span>';

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
         if(!data.success){
            submitBtn.innerHTML = 'Try Again';
            $('#responseModal').modal('toggle');
            $('#response').html(`
                    <p style="color: red; font-size:14px;">${data.message}
                    </p>`); 
            return false;
         }
        submitBtn.innerHTML = 'Recover';
        requestStatus.classList.remove('d-none');
        
        setTimeout(() => {
            location.replace("reset-password.html")
        }, 5000);
        })
     .catch(err => console.error(err))
})
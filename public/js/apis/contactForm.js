
// contact form
const postContactForm = () => {
    // document.querySelector('#name').value = "";
    // document.querySelector('#email').value = "";
    // document.querySelector('#phone').value = "";
    // document.querySelector('#state').value = "";
    // document.querySelector('#message').value = "";

    let submitBtn = document.querySelector('#contact-btn');
    submitBtn.innerHTML = `<div class="spinner-border spinner-border-sm" role="status">
    <span class="sr-only">Loading...</span></div>`;
    let routes = new Routes();
    let url = `${routes.apiOrigin}${routes.contactUs}`;
    let contactForm = new FormData(document.querySelector('#contactForm'));
    let formData = {
        'name' : contactForm.get('name'),
        'email' : contactForm.get('email'),
        'location' : contactForm.get('location'),
        'message' : contactForm.get('message')
    }
   
    if(contactForm.get('phone')){
        formData['phone'] = contactForm.get('phone');
    }

    console.log(formData)
    let formContent = JSON.stringify(formData);
    fetch(url, {
        method : "POST",
        mode: "cors",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: formContent    
    })
    .then((resp) => resp.json())
    .then((data) => {
        submitBtn.innerHTML = "Submit";
        let alert = document.querySelector('#successAlert')
        alert.classList.remove('d-none');;
        setTimeout(() =>{            
            alert.classList.add('d-none');
        }, 5000);      
        console.log(data);
    })
    .catch((err) => {
        submitBtn.innerHTML = "Submit";
        let alert = document.querySelector('#failureAlert');
        alert.classList.remove('d-none');
        setTimeout(() =>{            
            alert.classList.add('d-none');
        }, 5000);        
        console.error(err);
    })
}

const submitForm = document.querySelector('#contactForm');
submitForm.addEventListener('submit', (e) => {    
    postContactForm();
    e.preventDefault();
});
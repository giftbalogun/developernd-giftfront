
let nLetterRoutes = new Routes();
let nLetterUrl = `${nLetterRoutes.apiOrigin}${nLetterRoutes.subscribeSend}`;

const subBtnOne = document.querySelector('#subscribe-btn-1') || false;
const subBtnTwo = document.querySelector('#subscribe-btn-2');


const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//Get input field values
const subscribe = (e, allow) => {
    e.preventDefault();
    let email;
    if(allow == 1){
        subBtnOne.innerHTML = '<span class="spinner-border spinner-border-sm" style="width: 1.3em; height: 1.3em;" role="status" aria-hidden="true"></span>'
        email = document.querySelector('#email-sub-1').value;
    }else {
        subBtnTwo.innerHTML = '<span class="spinner-border spinner-border-sm" style="width: 1.3em; height: 1.3em;" role="status" aria-hidden="true"></span>'
        email = document.querySelector('#email-sub-2').value;
    }
    console.log(email)
    if(email == ""){
        $('#responseModal').modal('toggle');
        $('#response').html(`
                <p style="color: red; font-size:14px;"> The email field cannot be empty!
                </p>`);  
        if(allow == 1){
            subBtnOne.innerHTML = 'Subcribe'
        }else {
            subBtnTwo.innerHTML = 'Subcribe'
        }    
        return false;
    }
    if(!validateEmail(email)){
        $('#responseModal').modal('toggle');
        $('#response').html(`
                <p style="color: red; font-size:14px;"> The email is invalid, please use a valid email to continue!
                </p>`);  
        if(allow == 1){
            subBtnOne.innerHTML = 'Subcribe'
        }else {
            subBtnTwo.innerHTML = 'Subcribe'
        }    
        return false;
    }
    const data = {
            email
        };
        console.log(data);

    //fetch(request)
    fetch(nLetterUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'     
        },
        body: JSON.stringify(data)
    })
        .then(resp => resp.json()) 
        .then(resp => {
            console.log(resp)
            if(resp.success == false){
                $('#responseModal').modal('toggle');
                $('#response').html(`
                        <p style="color: red; font-size:14px;">Invalid input, please try again! <br>
                            ${JSON.stringify(resp.response.email).split('["').join('').split('"]').join('').split(',')}
                        </p>`);   
                if(allow == 1){
                    subBtnOne.innerHTML = 'Subcribe'
                }else {
                    subBtnTwo.innerHTML = 'Subcribe'
                }    
                return false;
            }
            e.target.value = ""; 
            $('#responseModal').modal('toggle');
            $('#response').html(`
                    <p style="color: #0B273D; font-size:14px; text-align: center;">${resp.message}.
                    </p>`);  
            if(allow == 1){
                subBtnOne.innerHTML = 'Subcribe'
            }else {
                subBtnTwo.innerHTML = 'Subcribe'
            }            
            console.log(resp);
        })
        .catch(err => {
            $('#responseModal').modal('toggle');
            $('#response').html(`
                    <p style="color:red; font-size:14px;">This may be due to internet connection not available, please turn on internet connection, Thank you!
                    </p>`);
            console.log(err);
        })
};


subBtnTwo.addEventListener('click', (event) => subscribe(event, 2));

const subscribeTwo = document.querySelector('#email-sub-2');
subscribeTwo.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) {               
        subscribe(e, 2);
    }
});

if(subBtnOne){
    subBtnOne.addEventListener('click',(event) => subscribe(event, 1));
    const subscribeOne = document.querySelector('#email-sub-1');
    subscribeOne.addEventListener('keyup', (e) => {
        if(e.keyCode === 13) {
            subscribe(e, 1);
        }
    });
}




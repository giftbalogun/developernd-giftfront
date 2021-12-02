
// Mark task assigned to reviewer as completed
const taskCompleted = (id) => {    
    console.log('button click');
    gEId(`input-${id}`).style.display = "none"; 
    gEId(`spinner-${id}`).classList.remove('d-none');
    if(reviewerInfo) {
        let {token} = reviewerInfo;
        let url = `${routes.apiOrigin}${routes.markTaskCompleted}${id}`;
        console.log(url);
        fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Authorization": `${token}`
            }
        })
        .then(respondValidation)
        .then((resp) => {return resp.json()})
        .then((data) => {
            gEId(`spinner-${id}`).classList.add('d-none');            
            gEId(`input-${id}`).setAttribute('disabled', '');
            gEId(`text-${id}`).innerText = "Completed";
            gEId(`alert-${id}`).classList.add('text-success');
            gEId(`alert-${id}`).innerText = "Ok!";
            gEId(`alert-${id}`).classList.remove('d-none');
            setTimeout(()=> {
                gEId(`alert-${id}`).classList.add('d-none');
            }, 1000);
            gEId(`img-${id}`).src = "../../images/task-completed.png";
            gEId(`input-${id}`).style.display = "inline-block";
            console.log(data);
        })
        .catch((error) => {        
            gEId(`input-${id}`).checked = false;
            gEId(`spinner-${id}`).classList.add('d-none');
            gEId(`alert-${id}`).classList.add('text-danger');
            gEId(`alert-${id}`).innerText = "Error!";
            gEId(`alert-${id}`).classList.remove('d-none');
            setTimeout(()=> {
                gEId(`alert-${id}`).classList.add('d-none');
            }, 1000);            
            gEId(`input-${id}`).style.display = "inline-block";            
            console.error(error);
        })
    }
}
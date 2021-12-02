
//Get the the submit rating button
const ratingBtn = document.querySelector('[data-submit-rating]');

const storeRatingAPi = (event, ratingBtn) => {
    //Now store the rated value to the api request
   
    const routes = new Routes();
    let url = `${routes.apiOrigin}${routes.storeRating(track_project_id)}`;

    const token = localStorage.getItem('token');
    ratingBtn.innerHTML = '<span style="color: #0b273d;" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
   const data = {
       'rating': ratedValue
   } 
   console.log(data)
    fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        ratingBtn.innerHTML = "ok";
        setTimeout(() => {
            ratingBtn.innerHTML = 'Submit';
            document.querySelector('[data-cancel-rating]').style.display = 'none';
            document.querySelector('[data-submit-rating]').style.display = 'none';
        }, 1000);  
    }).catch(err => {
        if(err){
           console.log(err);
        }
    })
}

ratingBtn.addEventListener('click', (event) => storeRatingAPi(event, ratingBtn));


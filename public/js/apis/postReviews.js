
// post the reviews
const postReviewForm = () => {
    qs('#criteria-one').value = "";
    qs('#comment').value = "";
    qs('.reviewer-image-name').innerText = "Select your image!";
    qs('.uploaded-image-wrapper').innerHTML = "";
    qs('.reviewer-alert').classList.remove('text-success');
    qs('.reviewer-alert').classList.add('text-danger');
    qs('.clear-media').classList.add('d-none');

    let reviewerForm = JSON.parse((localStorage.getItem('evaluation-form')));
    let form = new FormData();
    form.append("project_id", reviewerForm.project_id);
    form.append("review_title", reviewerForm.criteria_1);
    form.append("review_description", reviewerForm.comments);
    form.append("filename[]", imageFile[0]);

    qs('.review-preview-close').click();
    qs('.reviewer-spinner').style.display = "block";    

    if(reviewerInfo) {
        let {token} = reviewerInfo;
        let url = `${routes.apiOrigin}${routes.postReviewsByProjectId}`;
        console.log(url);
        fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "Authorization": `${token}`
            },
            body: form
        })
        .then((response) => {
            qs('.reviewer-spinner').style.display = "none";
            if(!response.ok){
                qs('#re-save-success-failure').style.display = "block";
                qs('.reviewer-post-message').innerHTML = `
                <p class="text-danger lead py-2 px-2 p-lg-5 text-center">Saving was not Successful</p>`;
                setTimeout(() => {
                    qs('#re-save-success-failure').style.display = "none";
                }, 3000);                
            }
            else {
                qs('#re-save-success-failure').style.display = "block";
                qs('.reviewer-post-message').innerHTML = `
                <p class="text-success lead py-2 px-2 p-lg-5 text-center">Saving was Successful</p>`;
                setTimeout(() => {
                    gEId('re-save-success-failure').style.display = "none";
                }, 3000); 
            }
            return response;
        })
        .then((resp) => {
            return resp.json();
        })
        .then((data) => {
            // display success modal
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }
}
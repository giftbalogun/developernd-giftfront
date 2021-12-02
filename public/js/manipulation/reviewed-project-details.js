

let imageFile;

let reviewerClearance = true
const previewReview = (e) => {
    let getAllErrors = [];
    reviewerClearance = true;
    const formData = new FormData(gEId('re-evaluation-form'));
    let critOne = formData.get("criteria_1");

    let reviewComment = formData.get("comments");
    let reviewImage = formData.get("filename");

    if(critOne === "") {     
        reviewerClearance = false;
        getAllErrors.push(qs('.criteria-one'));
        //qs('.criteria-one').classList.remove('d-none');
        //return;
    }
    if(reviewComment === "") {
        reviewerClearance = false;
        getAllErrors.push(qs('.comment'));
        // qs('.comment').classList.remove('d-none');
        // return;
    }
    if(getAllErrors.length !== 0){
        getAllErrors.forEach(x => {
            x.classList.remove('d-none');
        });
    }

    formData.append('project_id', queryId);
    formStorage = {
        "project_id": queryId,
        "criteria_1": critOne,
        "comments" : reviewComment,
        "filename": reviewImage
    }

    let imageName = (reviewImage.name) ? reviewImage.name : "No Image";
    qs('#reviewer-evaluate').innerHTML = `<div>
            <h5>Review Title</h5>
            <p>${critOne}</p>
        </div>
        <div>
            <h5>Review Description</h5>
            <p>${reviewComment}</p>
        </div>
        <div class="mt-3">            
            <span>Image Name: ${imageName}</span>
        </div>`;
    localStorage.setItem('evaluation-form', JSON.stringify(formStorage));
    if(reviewerClearance) {        
        e.target.setAttribute("data-toggle", "modal");
        e.target.setAttribute("data-target", "#exampleModalCenter");          
        e.target.click();
    }    
}

const previewReviewerImage = (file) => {
    imageFile = file;
    let reviewerImage = file[0];
    let type = file[0].type;
    let mediaType = file[0].type.split('/')[0];

    let uploadedImageWrapper = qs('.uploaded-image-wrapper');
    let previewDefault = qs('.preview-image-default');
    let reviewerImageTitle = qs('.reviewer-image-name');
    let reviewedMediaWrapper = qs('.media-file');   

    if(reviewerImage) {
        let mediaSize = 20*1024*1024;
        if(reviewerImage.size > mediaSize) {                        
            previewDefault.classList.remove('d-none');
            qs('.preview-image-default').innerHTML = "Image too large! not more than 20MB";
            qs('.preview-image-default').style.color = "red";            
            reviewerClearance = false;            
        }
        else {
            reviewerImageTitle.innerHTML = reviewerImage.name;
            const reviewerImageReader = new FileReader();

            reviewerImageReader.addEventListener('load', () => {
                    let mediaContainer = (mediaType.split('/')[0] == 'video')
                    ? `<video class="media-file" controls width="100%"><source src="${reviewerImageReader.result}" type="${type}"></video>`
                    : `<img class="media-file" src="${reviewerImageReader.result}" width="100%" alt="Reviewed Project Media File">`;

                    qs('.reviewer-alert').classList.remove('text-danger');
                    qs('.reviewer-alert').classList.add('text-success');
                    reviewedMediaWrapper.innerHTML = mediaContainer;
                    uploadedImageWrapper.innerHTML = mediaContainer;
                    qs('.clear-media').classList.remove('d-none');
            });
            reviewerImageReader.readAsDataURL(reviewerImage);
        }
    }
}

const formError = (field) => {
    field.style.display = "block";
}

const reDetialsUiInteraction = () => {
    qs('#viewBtn').addEventListener('click', (e) => {        
        previewReview(e);
    });

    (() => {
        let element = [
            {'id' : 'criteria-one'},
            {'id' : 'comment'}
        ];            
        element.forEach(x => {
            gEId(x.id).addEventListener('change', (e) => {
                let field = gEClass(x.id)[0];
                if(e.target.value !== "") {
                    field.style.display = "none";
                }              
            });
        });
    })();

    // Hover to delete media files
    qs('.clear-media').addEventListener('click', (e) => {
        qs('.uploaded-image-wrapper').innerHTML = `<p class="preview-image-default col-12 text-center">No Image</p>`;
        qs('.reviewer-image-name').innerText = "Select your image!";
        qs('.reviewer-alert').classList.remove('text-success');
        qs('.reviewer-alert').classList.add('text-danger');
        e.target.classList.add('d-none');
    });
}
reDetialsUiInteraction();
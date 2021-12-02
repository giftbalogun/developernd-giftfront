// Get all reviews associated to each project
let reviewImgLink2 = "https://res.cloudinary.com/developnd/image/upload/";
let reviewVideoLink = "https://res.cloudinary.com/getfiledata/video/upload/";
const allReviews = (reviewId) => {
    let getReviews = JSON.parse(localStorage.getItem('reviews'));    
    console.log(getReviews[reviewId]);
    let parent = qs('.all-reviews-modal');
    let temp = `title_${reviewId}`;
    qs('.modal-title').innerText = getReviews[temp];
    getReviews[reviewId].forEach(x => {
        let media;
        if(x.files.length !== 0) {
            let fileExt = x.files[0].filename.split('.')[1];
            media = (x.files[0].file_type !== "video") 
            ? `<p>Media File</p><img src="${reviewImgLink2}${x.files[0].filename}" width="100%" alt="Reviewed Project Media File">`
            : `<p>Media File</p><video controls width="100%"><source src="${reviewVideoLink}${x.files[0].filename}" type="video/${fileExt}"></video>`;
        }
        else {
            media = "";
        }
        console.log(x);
        let div = document.createElement('div');
        div.setAttribute('class', 'col-12 mb-4 border-3 border-left border-success rounded');
        div.innerHTML = `<p><span class="font-weight-bold">Review Title:</span> ${x.review_title}</p>        
        <p><span class="font-weight-bold">Description</span> ${x.review_description}</p>
        <div>            
            ${media}
        </div>
        `;
        parent.appendChild(div);
    });
}

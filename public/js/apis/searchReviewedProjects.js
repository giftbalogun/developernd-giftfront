
const cleanMyText = (text) => {
    let temp = [];
    text.split(' ').forEach((x)=>{
        if(x) {
            temp.push(x);
        }
    })
    if(text && temp.join(' ')){
        return temp.join(' ');
    }
}

/**
 * Search for Reviewed project
 * @param {path} route
 */
const fetchReviewedProjects = (qurey) => {
    if(reviewerInfo) {
        qs('.reviewed-side-search').value = "";
        categoryName(qurey);
        projectDom.innerHTML = `
        <div class="col-1 spinner-con text-center" style="top: 20%;">
            <div class="spinner-border mt-3 text-success" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        `;        
        let url = `${routes.apiOrigin}${routes.myReviewdProjectFilter}${qurey}/null/null`;
        let {token} = reviewerInfo;
        console.log(url);
        fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": `${token}`
            }
        })
        .then(respondValidation)
        .then((resp) => {
            return resp.json();
        })
        .then((data) => {
            console.log(data);
            displayfilteredProj(data);            
        })
        .catch((err) => {
            console.log(err);
        });        
    }
}
//fetchReviewedProjects();

qs('.reviewed-side-search').addEventListener('keyup', (e) => {
    if(e.keyCode == 13 && cleanMyText(e.target.value)) {
        fetchReviewedProjects(cleanMyText(e.target.value));
    }       
    e.preventDefault();
});
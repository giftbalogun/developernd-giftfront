// Basics Function
const gEId = (elem) => {
    return document.getElementById(elem);
}
const gEClass = (elem) => {
    return document.getElementsByClassName(elem);
}
const qs = (selector) => {
    return document.querySelector(selector);
}
const qsAll = (selector) => {
    return document.querySelectorAll(selector);
}

let reviewImgLink = "https://res.cloudinary.com/getfiledata/image/upload/";
const reviewerInfo = JSON.parse(localStorage.getItem('DevelopND-user'));
if(reviewerInfo) {
    console.log(reviewerInfo);
}

const reviewerUrl = new URL(window.location.href);
const reviewerUrlParam = reviewerUrl.searchParams;
let queryId;
queryId = reviewerUrlParam.get('id');
console.log(queryId);

const displayProjectToReview = (result) => {
    qs('.reviewer-spinner').style.display = "none";
    let {project} = result;
    console.log(result);
    let {id,LGA,end_date,contractor,
        approved_first_year,approved_second_year,budget_cost,comments_count,state,
        commitment,created_at,start_date,location,project_description,project_type,projectlikes,
        status,updated_at,wallpaper, unique_id} = project;

    qs('.rev-image').src = `${reviewImgLink}${wallpaper}`;
    qs('.rev-spent').innerHTML = `&#8358;${Number(budget_cost).toLocaleString()}`;
    qs('.rev-startdate').innerText = start_date;
    qs('.rev-about-budget').innerText = project_description;
    qs('.rev-about-contractor').innerText = contractor;
    qs('.rev-project-title').innerText = project_description;
    qs('.rev-contractor-name').innerText = contractor;
    qs('.rev-status').innerText = status;
    qs('.rev-descript').innerText = project_description;
    qs('.rev-project-id').innerText = unique_id;
    qs('.rev-project-budget').innerHTML = `&#8358;${Number(budget_cost).toLocaleString()}`;
    qs('.rev-startdate2').innerText = start_date;
    qs('.rev-end-date').innerText = end_date;
    qs('.rev-location').innerText = `${state} / ${LGA} / ${location}`;
    qs('.rev-google-map').innerHTML = `<iframe style="width: 100%; height: 300px;" data-project-location-map id="gmap_canvas"
    src="https://maps.google.com/maps?q=${location}&t=&z=13&ie=UTF8&iwloc=&output=embed"
    frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>`;
}

const respondValidation = (response) => {
    if(response.ok){
        return response;
    }
    else if (response.status == 401 || response.status == 403) {
        localStorage.removeItem('DevelopND-user');
        location.replace(`${window.location.origin}/login.html`);
    } 
    else {
        throw console.log('Something when wrong');
    }
}

let routes = new Routes();
const fetchReviewedProject = (route) => {
    if(reviewerInfo) {
        let {token} = reviewerInfo;   
        let url = `${routes.apiOrigin}${route}`;
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
            displayProjectToReview(data);
        })
        .catch((err) => {
            qs('.body-wrapper').innerHTML = `<div>
            <p class="lead text-secondary text-center">An Error Occur</p>
        </div>`;
            console.log(err);
        });        
    }
}
fetchReviewedProject(routes.viewOneProject(queryId));
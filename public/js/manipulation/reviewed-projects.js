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
let rImgLink = "https://res.cloudinary.com/getfiledata/image/upload/";
let routes = new Routes();

let catName = localStorage.getItem('reviewer-categories-name');
let fetchUrl = localStorage.getItem('reviewer-project-api');
console.log(fetchUrl);
console.log(catName);

const categoryName = (query) => {
    let categoryName = (query) ? query : "Not Found";
    gEId('categ-name').innerHTML = categoryName;
}
categoryName(catName);

const pageStats = (data) => {
    let {from, to, total} = data;
    let stats = (total) ? `${from} - ${to} of ${total}` : "0";
    gEId('pageStats').innerHTML = stats;
}

const activePagination = (x, data) => { 
    let url;
    let {current_page, first_page_url,last_page,
        last_page_url, next_page_url, prev_page_url, total} = data;

    let pageContainer = [];
    // if(total < 11) {
    //     qs('.rev-pagination-dom').style.margin = "0";
    // }
    let pageDom = qsAll('.re-page-list a');
    ((para) => {
        para.forEach((x) => {
            let temp = x.innerHTML;
            temp = Number(temp) / 1;
            if(temp >= 1) {              
                pageContainer.push(Number(temp));
            }          
        });            
    })(pageDom);

    const nextOrPrevious = (operator) => {
        pageDom.forEach((x) => {
            let temp = x.innerHTML;
            temp = Number(temp) / 1;
            if(temp >= 1) {     
                if(operator === 'next') {
                    x.innerHTML = Number(temp + 1);
                }
                else {
                    x.innerHTML = Number(temp - 1);
                }
            }          
        });
    }

    if(x === 'next_page') {        
        let last = pageContainer[pageContainer.length - 1];
        if(last < last_page) {
            nextOrPrevious("next");
        }
        url = next_page_url;
    }

    if(x === 'previous_page') {        
        let last = pageContainer[pageContainer.length - 1];
        if(5 < last) {
            nextOrPrevious("previous");
        }
        url = prev_page_url;
    }
    
    if(x === 'first_page') {
        let i = 1;
        pageDom.forEach((x) => {
            let temp = x.innerHTML;
            temp = Number(temp) / 1;
            if(temp >= 1) {
                x.innerHTML = i;
                i += 1;
            }
        });
        url = first_page_url;
    }
    if(x === 'last_page') {
        let last = pageContainer[pageContainer.length - 1];
        let i = last_page - 5;
        if(i > 0) {
            pageDom.forEach((x) => {
                let temp = x.innerHTML;
                temp = Number(temp) / 1;
                if(temp >= 1) { 
                    x.innerHTML = i + 1;                    
                    i += 1;
                }
            });
        }
        url = last_page_url;
    }
    
    let temp = x / 1;
    if(temp > 0) {
        url = `${routes.apiOrigin}${routes.allMyReviews}?page=${temp}`;
    }    
    // fetch reviewed projects according to selection
    console.log(url);
    if(url) {
        fetchReviewerProject(url);
    }
}

const reviewerPagination = (data) => {
    let pageNum = [];
    let {current_page, first_page_url,last_page,
        last_page_url, next_page_url, prev_page_url} = data;

    if(last_page <= 1) {
        qs('.reviewer-paginate-rapper').style.display = "none";
    }
    else {
        qs('.reviewer-paginate-rapper').style.display = "block";
        //last_page = 20;
        for(let i = 0; i < last_page; i++) {
            pageNum.push(`<a id="${i+1}" class="page-link active" href="#">${i+1}</a>`);
            if(i == 4) {
                break;
            }
        }
        console.log(pageNum.length);
        let ul = qs('.re-page-list');
        ul.innerHTML += `<li class="page-item re-previous-p">
                        <a id="first_page" class="page-link" href="#" aria-label="Previous">
                            <i id="first_page" class="fas fa-step-backward fa-xs"></i>
                        </a>
                    </li> 
                    <li class="page-item re-previous-p">
                        <a id="previous_page" class="page-link" href="#" aria-label="Previous">
                            <i id="previous_page" class="fas fa-less-than fa-xs"></i>
                        </a>
                    </li> `;
        
        pageNum.forEach((x) => {
            let li = document.createElement('li');
            li.setAttribute('class', 'page-item');
            li.innerHTML += x;
            ul.appendChild(li);
        });
        //
        let liFor = document.createElement('li');
        liFor.setAttribute('class', 'page-item');
        liFor.innerHTML += `<a id="last_page" class="page-link" href="#" aria-label="Next">
            <i id="last_page" class="fas fa-step-forward fa-xs"></i>
        </a>`;
        let liGra = document.createElement('li');
        liGra.setAttribute('class', 'page-item');
        liGra.innerHTML += `<a id="next_page" class="page-link" href="#" aria-label="Next">
        <i id="next_page" class="fas fa-greater-than fa-xs"></i>
        </a>`;
        ul.appendChild(liGra);
        ul.appendChild(liFor);

        let allPage = qsAll('.re-page-list a');
        allPage.forEach((x) => {
            x.addEventListener('click', (e) => {
                let temp = e.target.getAttribute('id');
                activePagination(temp, data);
                e.preventDefault();
            });
        });
    }   
}

gEId('pageStats').innerHTML = "loading...";
const reviewerInfo = JSON.parse(localStorage.getItem('DevelopND-user'));
if(reviewerInfo) {
    console.log(reviewerInfo);
}

let reviewPagaData;

let projectView = "list";
let projectDom = document.querySelector("[data-project-dom]");

// fetching data from api 
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

// List view
const displayDOM = (data) => {
    console.log(data);
    let getReviews = {};
    projectDom.innerHTML = "";
    data.forEach((x) => { 
        getReviews[x.id] = x.review;
        let temp = `title_${x.id}`;
        getReviews[temp] = x.project_description;
        let div = document.createElement('div');
        div.setAttribute('class', "col-12 px-0 projects-listed");
        div.innerHTML += `<div class="col-12 projects-listed">
            <div class="col-12 mb-3 project row mx-0 p-lg-4 px-0">
                <div class="col-12 col-md-5 px-0 project-image">
                    <img src="${rImgLink}${x.wallpaper}" alt="">
                </div>
                <div class="col-12 p-0 col-md-7 px-lg-3 project-details">
                    <h5 class="proj-header black col-12 p-0 pt-3 pt-lg-0">
                    <a style="color: #192965; font-weight: bold" 
                    href="${window.location.origin}/account/reviewer/reviewed-project-details.html?id=${x.id}">
                    ${x.project_description}</a></h5>
                    <div class="col-12 p-0 contractor-name">
                        <h6 class="black">Contractor Name: <span>${x.contractor}</span></h6>
                    </div>
                    <div  class="col-12 p-0 activity-status">
                        <span style="font-size: 14px" class="black">Activity Status</span>
                        <span style="font-size: 14px" class="status-designed p-1 br-10px">${x.status}</span>
                    </div>
                    <div class="col-12 p-0 full-desc mt-2">
                        <p style="font-size: 14px" class="black scroller">${x.project_description}</p>
                    </div>
                    <div style="font-size: 14px !important" class="col-12 p-0 project-stats row mx-0">
                        <div class="col-12 col-md-6 px-0">
                            <p class="black mb-1">Project ID: <span class="stat-value">${x.unique_id}</span></p>
                        </div>
                        <div class="col-12 col-md-6 px-0">
                            <p class="black mb-1">Total Budget: <span class="stat-value">&#8358; ${Number(x.budget_cost).toLocaleString()}</span></p>
                        </div>
                        <div class="col-12 col-md-6 px-0">
                            <p class="black mb-1">Start Date: <span class="stat-value">${x.start_date}</span></p>
                        </div>
                        <div class="col-12 col-md-6 px-0">
                            <p class="black mb-1">End Date: <span class="stat-value">${x.end_date}</span></p>
                        </div>
                        <div class="col-12 col-md-6 px-0">
                            <p class="black mb-1">State: <span class="stat-value">${x.state}</span></p>
                        </div>
                        <div class="col-12 col-md-6 px-0">
                            <p class="black mb-1">Location/LGA: <span class="stat-value">${x.location} / ${x.LGA}</span></p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center justify-content-lg-end my-4">
                        <div>
                            <button data-toggle="modal" onclick="allReviews(${x.id})" data-target="#exampleModalScrollable"
                            class="btn disable" style="color: white; background: #192965;">View Review</button>
                        </div>
                    </div>
                </div>
            </div>`;       
        projectDom.appendChild(div);
    });
    localStorage.setItem("reviews", JSON.stringify(getReviews));
}

// Grid View
const displayGridDOM = (data) => {
    console.log(data);
    projectDom.innerHTML = "";
    let rowDiv = document.createElement('div');
    rowDiv.setAttribute('class', "col-12 projects-grid-view row mx-0")
    data.forEach((x) => {
        let div = document.createElement('div');
        div.setAttribute('class', "project-block mb-3 px-1 col-12 col-md-4 col-lg-3");
        div.innerHTML = `<div class="project-con pt-1 col-12">
                     <div class="project-block-image col-12 px-0 border">
                        <a href="${window.location.origin}/account/reviewer/reviewed-project-details.html?id=${x.id}">
                            <img src="${rImgLink}${x.wallpaper}" alt="">
                        </a>
                     </div>
                     <p class="project-name mb-0">${x.project_description}</p>
                     <span class="contractor-name">Contractor Name: <span>${x.contractor}</span></span>
                     <button data-toggle="modal" onclick="allReviews(${x.id})" data-target="#exampleModalScrollable"
                     class="btn disable" style="color: white; background: #192965;">View Review</button>
                 </div>`;
        rowDiv.appendChild(div);        
    });
    projectDom.appendChild(rowDiv);        
}

const displayReviewedProject = (results) => {
    let data = (catName === "All") ? results.reviews.data : results.data;
    let stats = (catName === "All") ? results.reviews : results;
    if(data == 0) {
        qs('[data-project-dom]').innerHTML = "No Result";
        return;
    }
    reviewPagaData = data;
    pageStats(stats)
    displayDOM(data);
    reviewerPagination(stats);
}

/**
 * Fetch Reviewer Project
 * @param {url} route
 * @param {DOM element} element
 */
const fetchReviewerProject = (url) => {
    if(reviewerInfo) {
        qs('.projects-section').innerHTML = `<div class="col-1 spinner-con text-center" style="top: 20%;">
                        <div class="spinner-border mt-3" role="status" style="color: #0b273d;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>`;
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
            displayReviewedProject(data);
        })
        .catch((err) => {
            qs('.projects-section').innerHTML = `<div>
                <p class="lead text-secondary text-center">An Error Occur</p>
            </div>`;
            console.log(err);
        });        
    }
}
fetchReviewerProject(fetchUrl);

const displayFilterValues = (results) => {
    console.log(results);
    qs('.filter-inprogress').innerText = results.result[9].in_progress;
    qs('.filter-completed').innerText = results.result[9].completed;
    qs('.filter-abandoned').innerText = results.result[9].abandoned;
    qs('.filter-due-to-start').innerText = results.result[9].due_to_start;
    qs('.filter-not-started').innerText = results.result[9].not_started;
    qs('.filter-abia').innerText = results.result[0].ABIA;
    qs('.filter-akwa-ibom').innerText = results.result[2].AKWA_IBOM;
    qs('.filter-bayelsa').innerText = results.result[6].BAYELSA;
    qs('.filter-cross-rivers').innerText = results.result[5].CROSS_RIVER;
    qs('.filter-delta').innerText = results.result[7].DELTA;
    qs('.filter-edo').innerText = results.result[8].EDO;
    qs('.filter-imo').innerText = results.result[3].IMO;
    qs('.filter-ondo').innerText = results.result[4].ONDO;
    qs('.filter-rivers').innerText = results.result[1].RIVERS;
}

/**
 * Fetch Reviewer Project
 * @param {url} route
 * @param {DOM element} element
 */
const fetchFilterValues = (url) => {
    if(reviewerInfo) {
        let {token} = reviewerInfo;
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
            //console.log(data);
            displayFilterValues(data);
        })
        .catch((err) => {
            qs('.projects-section').innerHTML = `<div>
                <p class="lead text-secondary text-center">An Error Occur</p>
            </div>`;
            console.log(err);
        });        
    }
}
fetchFilterValues(`${routes.apiOrigin}${routes.reviewedProjectFilter}`);

const displayfilteredProj = (results) => {
    let {data} = results;
    if(data == 0) {
        qs('[data-project-dom]').innerHTML = `<div>
        <p class="lead text-secondary text-center">No Result</p>
    </div>`;
        return;
    }
    reviewPagaData = data;
    pageStats(results);
    displayDOM(data);
    reviewerPagination(results);
}

const fetchFilter = (target) => {
    qs('.reviewer-paginate-rapper').style.display = "none";
    projectDom.innerHTML = `
    <div class="col-1 spinner-con text-center" style="top: 20%;">
        <div class="spinner-border mt-3" role="status" style="color: #0b273d;">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    `;
    let prefix = target.split('@@');
    target = prefix[0];
    let url;
    if(target === "In-Progress" || target === "Completed" || target === 'Abandoned' || target === 'Not-Started' || target === 'Due-To-Start') {
        url = `${routes.apiOrigin}${routes.myReviewdProjectFilter}null/null/${target}`;
    }
    else if (prefix[1] === "srp") {
        url = `${routes.apiOrigin}${routes.myReviewdProjectFilter}${target}/null/null`;
    }
    else {
        url = `${routes.apiOrigin}${routes.myReviewdProjectFilter}null/${target}/null`;
    }
    if(reviewerInfo) {        
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
            //console.log(data);
            displayfilteredProj(data);
        })
        .catch((err) => {
            qs('.projects-section').innerHTML = `<div>
                <p class="lead text-secondary text-center">An Error Occur</p>
            </div>`;
            console.log(err);
        });        
    }
}

const filterTab = () => {
    let allCategories = qsAll('#collapse-filters input');
    allCategories.forEach((x) => {
        x.addEventListener('click', (e) => {
            if(e.target.checked) {
                gEId('pageStats').innerHTML = "loading...";
                categoryName(e.target.value);
                fetchFilter(e.target.value);
            }
        });
    });
}
filterTab();

const reviewerProjSearch = () => {
    let query = qs(".re-proj-search input").value;
    if(query) {
        qs(".re-proj-search input").value = "";              
        categoryName(query);
        query = `${query}@@srp`;
        fetchFilter(query);
    }
}

const uIInteraction = () => {
    qs(".re-proj-search input").addEventListener('keyup', (e) => {
        if(e.keyCode == 13) {
            reviewerProjSearch();
        }       
        e.preventDefault();
    })

    if(window.innerWidth > 800) {
        gEId('collapse-filters').className = "collapse show";
    }

    window.addEventListener('resize', () => {
        if(window.innerWidth > 800) {
            gEId('collapse-filters').className = "collapse show";            
        }
        else {
            gEId('collapse-filters').className = "collapse";
        }
    })
}
uIInteraction();

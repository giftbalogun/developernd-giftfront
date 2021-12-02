
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

const reviewerInfo =  JSON.parse(localStorage.getItem('DevelopND-user'));
if(reviewerInfo) {
    console.log(reviewerInfo);
}

let routes = new Routes();
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

const displayAssignments = (data) => {
    let status;
    let statusCheck;
    qs('.assignment-stat').innerHTML = data.task.length;
    gEId('re-default-table').innerHTML = "";
    if(data.task.length == 0) {
        gEId('re-default-table').innerHTML = `<tr><td colspan="3" class="text-center">No Result</td></tr>`;
        return;
    }
    
    data.task.forEach((x) => {
        let tr = document.createElement('tr');
        status = (x.completed == 1) 
        ? `<span class="d-lg-inline-block d-none mr-1">Completed</span>
        <span ><img src="../../images/task-completed.png"></span>`
        : `<span id="text-${x.id}" class="d-lg-inline-block d-none mr-1">Not Completed</span>
        <span ><img id="img-${x.id}" src="../../images/not-completed.png"></span>`;
        statusCheck = (x.completed == 1) 
        ? `<input type="checkbox" checked disabled>` 
        : `<input id="input-${x.id}" type="checkbox" onclick="taskCompleted(${x.id})">`;
        let content = `<td>${status}</td>
                        <td>${x.task}</td>
                        <td>${statusCheck}<span id="alert-${x.id}" class="ml-2 font-bold"></span>
                            <div id="spinner-${x.id}" class="d-none spinner-border spinner-border-sm" role="status">
                            <span class="sr-only">Loading...</span></div>
                        </td>`;
        tr.innerHTML = content;
        gEId('re-default-table').appendChild(tr);
    });
}

// Display statistics of reviewed project
const displayReviewerStats = (results) => {   
    let {all_categories} = results;

    if(all_categories == 0) {
        gEId('re-reviewed-table').innerHTML = `<tr>
            <td colspan="3" class="text-center">
                <div><h4 class="text-center p-5">No Result</h4></div>
            </td>
        </tr>`;
        qs('.reviewer-stats').innerHTML = 0;
        return;
    }
    qs('.reviewer-stats').innerHTML = all_categories;
    let parent = gEId('re-reviewed-table');
    if(results.data.length == 0) {
        parent.innerHTML = "No Result";
        return;
    }
    let stats = results.all_categories;
    parent.innerHTML = "";
    let tempTr = document.createElement('tr');
    let url = `${routes.apiOrigin}${routes.allMyReviews}`;
    tempTr.innerHTML = `<td>View all Categories</td> 
                <td>${stats}</td><td><a class="cat-All" id="${url}" href="#">
                Open</a></td>`;
    parent.appendChild(tempTr);
    results.data.forEach((x) => {        
        let tr = document.createElement('tr');
        let content = `<td>${x.project_type}</td>
                        <td>${x.count}</td>
                        <td><a class="cat-${x.project_type}" id="${x.link}" href="#">Open</a></td>`;
        tr.innerHTML = content;
        parent.appendChild(tr);
    });

    // capture all links
    qs('#re-reviewed-table').addEventListener('click', (e) => {
        if(e.target.nodeName === "A") {
            let apiUrl = e.target.getAttribute('id');
            let name = e.target.getAttribute('class').split("-")[1];
            localStorage.setItem('reviewer-project-api', apiUrl);
            localStorage.setItem('reviewer-categories-name', name);
            location.replace(`${window.location.origin}/account/reviewer/reviewed-projects-list.html`);
        }        
        e.preventDefault();
    });
}

/**
 * Fetch Reviewer Statistics
 * @param {path} route
 * @param {DOM element} element
 */
const fetchReviewerStats = (route, element) => {
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
            //console.log(data);
            displayReviewerStats(data);
        })
        .catch((err) => {
            $('#notifyModal').modal('toggle');
            $('#info_content').html(`
                <p style="color:red; font-size:14px; font-weight: bold;">An error occured,
                this could be a network failure, please try again!
                </p>`);
            console.log(err);
        });        
    }
}
fetchReviewerStats(routes.reviewedProjectStats);

/**
 * Fetch Reviewer Assignments
 * @param {path} route
 * @param {DOM element} element
 */
const fetchReviewerTasks = () => {
    if(reviewerInfo) {
        let {token} = reviewerInfo;   
        let url = `${routes.apiOrigin}${routes.allMyTasks}`;
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
            displayAssignments(data);
        })
        .catch((err) => {
            $('#notifyModal').modal('toggle');
            $('#info_content').html(`
                <p style="color:red; font-size:14px; font-weight: bold;">An error occured, 
                this could be a network failure, please try again!
                </p>`);
            console.log(err);
        });        
    }
}
fetchReviewerTasks();

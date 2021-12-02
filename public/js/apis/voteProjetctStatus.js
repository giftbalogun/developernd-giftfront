
let voteProjId = localStorage.getItem('projectId');

const updateVoting = (data, status) => {
    console.log(data);
    let {project} = data;
    let {In_Progress, Completed, Abandoned, Not_Started} = project;
    console.log(In_Progress, Completed, Abandoned, Not_Started);

    document.querySelector(`#${status}`).textContent = "ok";
    setTimeout(() => {
        document.querySelector('#Not_Started').textContent = Not_Started;
        document.querySelector('#In_Progress').textContent = In_Progress;
        document.querySelector('#Completed').textContent = Completed;
        document.querySelector('#Abandoned').textContent = Abandoned;
    }, 1000);    
}

// Vote for Project status
const voteProject = (status) => {
    const warningInfo = document.querySelector('[data-login-commnd-vote-status]');
    if(!localStorage.getItem('token')){
        warningInfo.style.display = 'block';
        return false;
    }
    let statusValue = document.querySelector(`#${status}`);
    let oldValue = statusValue.innerHTML;
    statusValue.innerHTML = `<div class="spinner-border spinner-border-sm" role="status">
                                <span class="sr-only">Loading...</span></div>`;
    let route = new Routes();
    let url = `${route.apiOrigin}${route.projectStatusVoting}${voteProjId}`;
    console.log(url);
    console.log(status);
    fetch(url, {
        method: "POST",
        headers: {            
            "Accept": "application/json",
            'Content-Type': 'application/json',
            "Authorization": localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null
        },       
        body: JSON.stringify({"status": status})
    })
    .then(response => response.json())
    .then(data => {        
        updateVoting(data, status);        
        console.log(data);
    }).catch(err => {
        console.log(err)
        statusValue.innerHTML = `<span class="text-danger">fail</span>`;
        setTimeout(() => {
            statusValue.innerHTML = oldValue;
        }, 3000);        
    })
}
const activeProjectsHolder = document.querySelector('#active-projects-holder')
const spinnerActiveProjects = document.querySelector('#spinner-active-projects')
const getActiveProjects = () => {
    console.log('here')
    const routes = new Routes();
    const url = `${ routes.apiOrigin}${ routes.activeProjects }`;
    const data = JSON.parse(localStorage.getItem('DevelopND-user'));
    const {
        token
    } = data;
    console.log(certified)
    fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                "Accept": "aplication/json",
                "Authorization": token
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            spinnerActiveProjects.style.display = 'none';
            let activeProjectsObject = data.active_projects;
            console.log(activeProjectsObject)
            if (activeProjectsObject.length > 0) {
                activeProjectsObject.map(activeProject => {
                    console.log(activeProject);
                    activeProjectsHolder.innerHTML += `
               <div class="top-project-info col-12 border-bottom row mx-0 px-0">
                        <div class="project-title col-12 col-md-8 px-0">
                        <a href="../../project/project.html?id=${activeProject.id}">
                            <p class="mb-0" style=" white-space: nowrap; 
                            overflow: hidden;
                            width: 180px;
                            text-overflow: ellipsis;">${activeProject.project_description}</p>
                            </a>
                        </div>
                    <div class="project-users col-12 col-md-4 text-right px-0">
                        <p class="mb-0">${activeProject.views}</p>
                    </div>
                </div>
                  `;
                });
            } else {
                activeProjectsHolder.innerHTML = `
            <div class="col-12">
                <div class="mt-5" role="status">
                  <p style="color: center; color: grey; font-weight: bold; text-align: center;">No Active Projects</p>
                </div>
            </div>`;
            }
        })
        .catch(err => {
            console.error(err)
        })
}
getActiveProjects();
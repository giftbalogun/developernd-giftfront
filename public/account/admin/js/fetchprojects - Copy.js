const routes = new Routes();
const url = `${ routes.apiOrigin}${ routes.allProjects }`;
const projectTableBody = document.querySelector("#project-table-body")
console.log(url)

const data = JSON.parse(localStorage.getItem('DevelopND-user'));
const {token} = data;
fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
        "Accept": "application/json",
        "Authorization": token
    }
 })
 .then(response => response.json())
 .then(data => {
    console.log(data.project);
    let projectDataObject = data.project;
    projectTableBody.innerHTML = '';
    projectDataObject.map(projectData => {
        console.log(projectData)
        projectTableBody.innerHTML += `

        <tr>
        <td>${projectData.project_type}</td>
        <td>${projectData.location}</td>
        <td>${projectData.LGA}</td>
        <td>${projectData.project_description}</td>
        <td>${projectData.budget_cost}</td>
        <th>${projectData.commitment}</th>
        <th>${projectData.status}</th>
        <th><a href="#" class="btn btn-primary btn-icon-split btn-sm">
          <span class="text">View</span>
        </a></th>
      </tr>
        `
    })
 })
 .catch(err => console.error(err))
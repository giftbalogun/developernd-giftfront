let i;
let currentpage = 1;
let next = null;
let prev = null;
let firstPage = null;
let lastPage = null;
let chosenPage = "";
let projectsTableBody;
const availablePages = document.querySelector("#available-pages");
const firstPageButton = document.querySelector("#first-page-button");
const prevPageButton = document.querySelector("#prev-page-button");
const nextPageButton = document.querySelector("#next-page-button");
const lastPageButton = document.querySelector("#last-page-button");

let queryVar = null;
let filterStateVar = null;
let filterStatusVar = null;
let filterCategoryVar = null;

const getProjects = (queryVar, filterStateVar, filterStatusVar, filterCategoryVar, next, prev) => {
  projectsTableBody = document.querySelector("#projects-table");
  projectsTableBody.innerHTML = `
    
  `;
const routes = new Routes();
let url = `${routes.apiOrigin}${routes.allProjects(queryVar, filterStateVar, filterStatusVar, filterCategoryVar)}`;
console.log(url)
if (next) {
  url = next;
  console.log(url);
} else if (prev) {
  url = prev;
  console.log(url);
} else if (chosenPage !== "") {
  url = chosenPage;
  console.log(url);
} else if (firstPage) {
  url = firstPage;
} else if (lastPage) {
  url = lastPage;
}
console.log(url)
const data = JSON.parse(localStorage.getItem("DevelopND-user"));
const { token } = data;
console.log(certified);
// if (!projectNumber) {
//   let projectNumber;
//   projectNumber = 1;
// }
// localStorage.setItem('projectNumber', projectNumber);
fetch(url, {
  method: "GET",
  mode: "cors",
  headers: {
    Accept: "aplication/json",
    Authorization: token
  }
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let projectsDataObject = data.data.data;
    localStorage.setItem("next", data.data.next_page_url);
    localStorage.setItem("prev", data.data.prev_page_url);
    localStorage.setItem("firstPage", data.data.first_page_url);
    localStorage.setItem("lastPage", data.data.last_page_url);
    localStorage.setItem("currentPageNum", data.data.current_page);
    localStorage.setItem("lastPageNum", data.data.last_page);
    localStorage.setItem("path", data.data.path);
    showPagList();
    document.querySelector("#spinner-users").style.display = "none";
    // let dataCount = localStorage.getItem('projectNumber');
    if (projectsDataObject.length > 0) {
        projectsDataObject.map(projectData => {
            console.log(projectData);
            projectsTableBody.innerHTML += `
            <tr>
            <td>${projectData.id}</td>
            <td>${projectData.project_description}</td>
            <td>${projectData.state}</td>
            <td>${projectData.project_type}</td>
            <td>${projectData.contractor}</td>
            <td>${projectData.status}</td>
            <td>${projectData.views}</td>
            <!-- <td><i class="mx-1 mt-2 fa fas fa-trash"></i>
                <i class="mx-1 mt-2 fa fas fa-eye"><i></td> -->
        </tr>
            `
            // dataCount++;
            // localStorage.setItem('projectNumber', dataCount);
            // console.log(localStorage.getItem('projectNumber'))
        })
    }else {
      reportsTableBody.innerHTML += `
      <div class="col-12 text-center">
          <h3 class="col-12 mt-5">No Projects Found</h3>
      </div>
            `
    }
  })
  .catch(err => console.error(err));
};

// setTimeout(() => {
getProjects(queryVar, filterStateVar, filterStatusVar, filterCategoryVar);
// }, 3000)

let i;
let currentpage = 1;
let next = null;
let prev = null;
let firstPage = null;
let lastPage = null;
let chosenPage = "";
const availablePages = document.querySelector("#available-pages");
const firstPageButton = document.querySelector("#first-page-button");
const prevPageButton = document.querySelector("#prev-page-button");
const nextPageButton = document.querySelector("#next-page-button");
const lastPageButton = document.querySelector("#last-page-button");

const getReports = (next, prev) => {
  const reportsTableBody = document.querySelector("#reports-table");
  // projectsTableBody.innerHTML = `
  
  // `;
const routes = new Routes();
let url = `${routes.apiOrigin}${routes.allReports}`;
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
    let reportsDataObject = data.reports.data;
    localStorage.setItem("next", data.reports.next_page_url);
    localStorage.setItem("prev", data.reports.prev_page_url);
    localStorage.setItem("firstPage", data.reports.first_page_url);
    localStorage.setItem("lastPage", data.reports.last_page_url);
    localStorage.setItem("currentPageNum", data.reports.current_page);
    localStorage.setItem("lastPageNum", data.reports.last_page);
    localStorage.setItem("path", data.reports.path);
    showPagList();
    document.querySelector("#spinner-users").style.display = "none";
    // let dataCount = localStorage.getItem('projectNumber');
    if (reportsDataObject.length > 0) {
        reportsDataObject.map(reportData => {
            console.log(reportData);
            reportsTableBody.innerHTML += `
            <tr>
            <td>${reportData.id}</td>
            <td>${reportData.name}</td>
            <td>${reportData.project.project_description}</td>
            <td>${reportData.report}</td>
            <td>${reportData.created_at}</td>
            <td><i class="mx-1 mt-2 fa fas fa-trash"></i>
                <i class="mx-1 mt-2 fa fas fa-eye"><i></td>
        </tr>
            `
            // dataCount++;
            // localStorage.setItem('projectNumber', dataCount);
            // console.log(localStorage.getItem('projectNumber'))
        })
    } else {
      reportsTableBody.innerHTML += `
        <div class="col-12 text-center" style="position:absolute;">
            <h3 class="col-12 mt-5">No Reports Found</h3>
        </div>
            `
    }
  })
  .catch(err => console.error(err));
};

  getReports();


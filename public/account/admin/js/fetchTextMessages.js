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

const getTextMessages = (next, prev) => {
  const textMessageReportTableBody = document.querySelector("#text-message-reports-table");
  // projectsTableBody.innerHTML = `
  
  // `;
const routes = new Routes();
let url = `${routes.apiOrigin}${routes.allTextMessageReports}`;
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
    let textMessageReportDataObject = data.sms.data;
    localStorage.setItem("next", data.sms.next_page_url);
    localStorage.setItem("prev", data.sms.prev_page_url);
    localStorage.setItem("firstPage", data.sms.first_page_url);
    localStorage.setItem("lastPage", data.sms.last_page_url);
    localStorage.setItem("currentPageNum", data.sms.current_page);
    localStorage.setItem("lastPageNum", data.sms.last_page);
    localStorage.setItem("path", data.sms.path);
    showPagList();
    document.querySelector("#spinner-users").style.display = "none";
    // let dataCount = localStorage.getItem('projectNumber');
    if (textMessageReportDataObject.length > 0) {
        textMessageReportDataObject.map((textMessageReport, i) => {
            console.log(textMessageReport);
            textMessageReportTableBody.innerHTML += `
            <tr>
            <td>${i + 1}</td>
            <td>${textMessageReport.from}</td>
            <td>${textMessageReport.messageBody}</td>
            <td>${textMessageReport.created_at}</td>
            <td class="deleteText" data-id="${textMessageReport.id}" ><i class="mx-1 mt-2 fa fas fa-trash" style="cursor: pointer;"></i></td>
        </tr>
            `
            // dataCount++;
            // localStorage.setItem('projectNumber', dataCount);
            // console.log(localStorage.getItem('projectNumber'))
        })
        const deleteMessages = Array.from(document.querySelectorAll('.deleteText'));
        deleteMessages.map(x => {
          console.log(x)
          x.addEventListener('click', (event) => {
            console.log(x)
            const id = x.dataset.id;
            x.innerHTML =  `<div class="spinner-border" role="status"></div>`;
            console.log(id);
            let url = `${routes.apiOrigin}${routes.deleteTextSms(id)}`;
            fetch(url, {
              method: "DELETE",
              mode: "cors",
              headers: {
                Accept: "aplication/json",
                Authorization: token
              }
            })
            .then(response => response.json())
            .then(data => {
              console.log(data)
              location.reload();
            })
            .catch(err => {
              console.log(err);
              location.reload();
            })
            
          })
        });
    } else {
      textMessageReportTableBody.innerHTML += `
        <div class="col-12 text-center" style="position:absolute;">
            <h3 class="col-12 mt-5">No Text Message Found</h3>
        </div>
            `
    }
  })
  .catch(err => console.error(err));
};

getTextMessages();

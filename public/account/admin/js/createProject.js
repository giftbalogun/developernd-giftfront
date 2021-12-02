const createProjectForm = document.querySelector("#create-project-form");
const submitBtn = document.querySelector("#submit-btn");
const createProjectResponseModal = document.querySelector("createProjectResponseModal");
const createProjectResponseSpan = document.querySelector("#create-project-response");
const approvedFirstAmount = document.querySelector('#approved_first_amount');
const approvedSecondAmount = document.querySelector('#approved_second_amount');
const approvedFirstYear = document.querySelector('#approved_first_year');
const approvedSecondYear = document.querySelector('#approved_second_year');

console.log(createProjectForm);

const createProjectApi = (event, createProjectForm) => {
    console.log(`here`)
  event.preventDefault();
  submitBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" style="width: 1.3em; height: 1.3em;" role="status" aria-hidden="true"></span>';
  const routes = new Routes();
  const url = `${routes.apiOrigin}${routes.createProject}`;
  console.log(url);
  let approvedAmounts = approvedFirstAmount.value + "," + approvedSecondAmount.value;
  let approvedYears = approvedFirstYear.value + "|" + approvedSecondYear.value;
  console.log(approvedYears);

  const formData = new FormData(createProjectForm);
  formData.append('allocated_amounts', approvedAmounts)
  formData.append('allocated_years', approvedYears);
  console.log(formData.getAll('allocated_amounts'))
  
  const errorHandling = response => {
    status = response.status;
    console.log(response);
    console.log(status);
    return response.json();
  };

  const getResponse = data => {
    switch (status) {
      case 404:
        $("#createProjectResponseModal").modal("toggle");
        createProjectResponseSpan.innerHTML = "Oops! Not Found";
        break;
      case 501:
        $("#createProjectResponseModal").modal("toggle");
        createProjectResponseSpan.innerHTML =
          "Something went wrong. Please try again";
        break;
    //   case 200:
    //     $("#createProjectResponseModal").modal("toggle");
    //     createProjectResponseSpan.innerHTML =
    //       "Project has been created";
    //     setTimeout(() => {
    //         location.replace("dashboard.html")
    //     }, 3000)
    //     break;
      case 422:
        $("#createProjectResponseModal").modal("toggle");
        createProjectResponseSpan.innerHTML =
          "One or more of your inputed data is incorrect. Please try again!";
        break;
        
    }
  };
  const token = JSON.parse(localStorage.getItem("token"));
  // console.log(userData);
  // const { token } = userData;
fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "aplication/json",
      Authorization: token
    },
    body: formData
  })
    .then(response => errorHandling(response))
    .then(data => {
      console.log(data);
      getResponse(data);
      submitBtn.innerHTML = "CREATE PROJECT";
    });  
};

createProjectForm.addEventListener("submit", (event) =>

  createProjectApi(event, createProjectForm)
);

const upgradeBtn = document.querySelector("#upgrade-btn");
const upgradeUserModal = document.querySelector("#upgradeUserModal");
const upgradeUserSpan = document.querySelector("#upgrade-user-response");

let user_id = localStorage.getItem('user_id')

if (requestedType === `CommunityMembers`) {
  upgradeBtn.classList.remove('d-none');
} else {
  upgradeBtn.classList.add('d-none');
}
const upgradeUserApi = (event) => {
  event.preventDefault();
  let user_id = localStorage.getItem('user_id')
  console.log(user_id);

  upgradeBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" style="width: 1.3em; height: 1.3em;" role="status" aria-hidden="true"></span>';
  const routes = new Routes();
  const url = `${routes.apiOrigin}${routes.upgradeUser(user_id)}`;
  console.log(url);


  const errorHandling = response => {
    status = response.status;
    console.log(response);
    console.log(status);
    return response.json();
  };

  const getResponse = data => {
    switch (status) {
      case 404:
        $("#upgradeUserModal").modal("toggle");
        upgradeUserSpan.innerHTML = "Oops! Not Found";
        break;
      case 501:
        $("#upgradeUserModal").modal("toggle");
        upgradeUserSpan.innerHTML =
          "Something went wrong. Please try again";
        break;
      case 200:
        $("#upgradeUserModal").modal("toggle");
        upgradeUserSpan.innerHTML =
          "This user has been upgraded sucessfully";
        setTimeout(() => {
          location.reload()
        }, 3000)
        break;
    }
  };
  const userData = JSON.parse(localStorage.getItem("DevelopND-user"));
  console.log(userData);
  const {
    token
  } = userData;

  fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        Authorization: token
      }
    })
    .then(response => errorHandling(response))
    .then(data => {
      console.log(data);
      getResponse(data);
      upgradeBtn.innerHTML = "UPGRADE USER";
    });
};

upgradeBtn.addEventListener("click", event =>
  upgradeUserApi(event)
);
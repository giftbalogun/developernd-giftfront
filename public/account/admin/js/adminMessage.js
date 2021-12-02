let allCheck = document.querySelector('#allCheck');
let communityCheck = document.querySelector('#communityCheck');
let reviewersCheck = document.querySelector('#reviewersCheck');
let contractorsCheck = document.querySelector('#contractorsCheck');

let sendMessageForm = document.querySelector('#send-message-form');
let checkboxes = Array.from(document.querySelectorAll('.receiver-input'))
let to = [];

const getCheckedReceivers = () => {
  checkboxes.map(x => {
    if (x.checked) {
      to.push(x.value)
    }
    return to;
  })
}
$("#allCheck").change(function () {
  console.log("changed");
  console.log(allCheck.value);
  to = [];
  let checked = allCheck.checked;
  let index;
  if (checked) {
    communityCheck.setAttribute('disabled', true)
    reviewersCheck.setAttribute('disabled', true)
    contractorsCheck.setAttribute('disabled', true)
    communityCheck.checked = false;
    reviewersCheck.checked = false;
    contractorsCheck.checked = false;
  } else {
    communityCheck.removeAttribute('disabled', true)
    reviewersCheck.removeAttribute('disabled', true)
    contractorsCheck.removeAttribute('disabled', true)
  }
  console.log(to);
});

const submitBtn = document.querySelector("#submit-btn");
const messageResponseModal = document.querySelector("#messageResponseModal");
const messageResponseSpan = document.querySelector("#messageResponseSpan");

console.log(sendMessageForm);

const sendMessageApi = (event, sendMessageForm) => {
  event.preventDefault();
  submitBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" style="width: 1.3em; height: 1.3em;" role="status" aria-hidden="true"></span>';
  const routes = new Routes();
  const url = `${routes.apiOrigin}${routes.adminMessage}`;
  console.log(url);
  getCheckedReceivers();
  console.log(to);
  const formData = new FormData(sendMessageForm);
  formData.append('to', to)
  const errorHandling = response => {
    status = response.status;
    console.log(response);
    console.log(status);
    return response.json();
  };

  const getResponse = data => {
    switch (status) {
      case 404:
        $("#messageResponseModal").modal("toggle");
        messageResponseSpan.innerHTML = "Oops! Not Found";
        break;
      case 501:
        $("#messageResponseModal").modal("toggle");
        messageResponseSpan.innerHTML =
          "Something went wrong. Please try again";
        break;
      case 200:
        $("#messageResponseModal").modal("toggle");
        messageResponseSpan.innerHTML =
          "Message sent successfully";
        setTimeout(() => {
          location.reload()
        }, 3000)
        break;
      case 422:
        $("#messageResponseModal").modal("toggle");
        messageResponseSpan.innerHTML =
          "One or more of your inputed data is incorrect. Please try again!";
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
      Accept: "aplication/json",
      Authorization: token
    },
    body: formData
  })
    .then(response => errorHandling(response))
    .then(data => {
      console.log(data);
      getResponse(data);
      submitBtn.innerHTML = "SEND MESSAGE";
    });
};

sendMessageForm.addEventListener("submit", event =>
  sendMessageApi(event, sendMessageForm)
);







// $("#allCheck").change(function () {
//     console.log("changed");
//     console.log(allCheck.value);
//     to = [];
//     let checked = allCheck.checked;
//     let index;
//     if (checked) {
//         to.push(allCheck.value)
//         index = to.indexOf('all');
//         console.log(index)
//         communityCheck.setAttribute('disabled', true)
//         reviewersCheck.setAttribute('disabled', true)
//         contractorsCheck.setAttribute('disabled', true)
//         communityCheck.removeAttribute('checked', true)
//         reviewersCheck.removeAttribute('checked', true)
//         contractorsCheck.removeAttribute('checked', true)
//     } else {
//         to.splice(index, 1)
//         index = '';
//         communityCheck.removeAttribute('disabled', true)
//         reviewersCheck.removeAttribute('disabled', true)
//         contractorsCheck.removeAttribute('disabled', true)
//     }
//     console.log(to);
// });
// $("#communityCheck").change(function () {
//     console.log("changed");
//     console.log(communityCheck.value);
//     let checked = communityCheck.checked;
//     let index;
//     if (checked) {
//         to.push(communityCheck.value)
//         index = to.indexOf('community_members');
//         console.log(index)
//     } else {
//         to.splice(index, 1)
//         index = '';
//     }
//     console.log(to);
// });
// $("#reviewersCheck").change(function () {
//     console.log("changed");
//     console.log(reviewersCheck.value);
//     let checked = reviewersCheck.checked;
//     let index;
//     if (checked) {
//         to.push(reviewersCheck.value)
//         index = to.indexOf('reviewers');
//         console.log(index)
//     } else {
//         to.splice(index, 1)
//         index = '';
//     }
//     console.log(to);
// });
// $("#contractorsCheck").change(function () {
//     console.log("changed");
//     console.log(contractorsCheck.value);
//     let checked = contractorsCheck.checked;
//     let index;
//     if (checked) {
//         to.push(contractorsCheck.value)
//         index = to.indexOf('contractors');
//         console.log(index)
//     } else {
//         to.splice(index, 1)
//         index = '';
//     }
//     console.log(to);
// });

// const getChecked = () => {

// }
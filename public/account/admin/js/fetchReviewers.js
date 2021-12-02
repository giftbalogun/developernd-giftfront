const createTaskCon = document.querySelector('#createTaskCon')
const viewTaskCon = document.querySelector('#viewTaskCon')
const reviewersData = (next, prev) => {
  const reviewersTab = document.querySelector('#reviewers-tab');
  const usersTableBody = document.querySelector(
    "#users-table"
  );
  usersTableBody.innerHTML = `
  <div class="col-1 spinner-con" id="spinner-users">
    <div class="spinner-border mt-3" role="status">
        <span class="sr-only">loading...</span>
    </div>
  </div>
  `

  // if(reviewersTabTracker){
  const routes = new Routes();
  const url = `${routes.apiOrigin}${routes.reviewers}`;
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
  usersTableBody.innerHTML = "";
  document.querySelector("#spinner-users").style.display = 'block';

  const userData = JSON.parse(localStorage.getItem("DevelopND-user"));
  console.log(userData);
  const {
    token
  } = userData;
  fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        Authorization: token
      }
    })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("next", data.reviewers.next_page_url);
      localStorage.setItem("prev", data.reviewers.prev_page_url);
      localStorage.setItem("firstPage", data.reviewers.first_page_url);
      localStorage.setItem("lastPage", data.reviewers.last_page_url);
      localStorage.setItem("currentPageNum", data.reviewers.current_page);
      localStorage.setItem("lastPageNum", data.reviewers.last_page);
      localStorage.setItem("path", data.reviewers.path);
      showPagList();
      // console.log(data.all[0]);
      // let userDataObject = data.all[0];
      let reviewersDataObject = data.reviewers.data;

      document.querySelector("#spinner-users").style.display = 'none';

      let dataCount = 1;
      let imageSrc = '';
      if (reviewersDataObject.length > 0) {
        reviewersDataObject.map(reviewerData => {
          console.log(reviewerData);
          console.log(reviewerData.user_mode)
          if (reviewerData.user_mode == "DevelopND") {
            imageSrc = `${data['image_link']}${reviewerData.image}`;
          } else {
            imageSrc = `${reviewerData.image}`;
          }
          usersTableBody.innerHTML += `
                <tr>
                    <th scope="row">${dataCount}</th>
                    <td>${reviewerData.id}</td>
                    <td>${reviewerData.name ? reviewerData.name : 'Name Not Set'}</td>
                    <td>${reviewerData.lga ? reviewerData.lga : 'Location Not Set'}</td>
                    <td>${reviewerData.user_type}</td>
                    <td>${reviewerData.created_at_for_humans}</td>
                    <td>
                    <i style="cursor: pointer" class="mx-1 mt-2 fa fas fa-eye view-reviewer" data-id=${
                      reviewerData.id
                    } data-name=${reviewerData.name} data-email=${
        reviewerData.email
      }
                     data-phone=${reviewerData.phone} data-state=${
        reviewerData.state
      } data-city=${reviewerData.city}
                      data-bio=${reviewerData.bio} data-user-type=${
        reviewerData.user_type
      }><i></td>
                </tr>
                `;
          dataCount++;
          imageSrc = ''
          const viewReviewer = Array.from(document.querySelectorAll(`.view-reviewer`));

          viewReviewer.map(x => {
            x.addEventListener("click", event => {
              if (requestedType !== `CommunityMembers`) {
                upgradeBtn.classList.add('d-none');
              }
              viewReviewerFunc(event, x);
            });
          });
        });
        reviewersTabTracker = false;
      } else {
        usersTableBody.innerHTML = `
          <div class="col-12 spinner-con" style="position: absolute; margin-top: 150px;" >
              <div class="mt-3" role="status">
                <p style="color: center; color: grey; font-weight: bold; text-align: center;">No Reviewers Found!</p>
              </div>
          </div>`;
      }
    })
    .catch(err => console.error(err));
  // }

};
viewReviewerFunc = (event, x) => {
  const viewDataSet = x.dataset;
  localStorage.setItem('user_id', viewDataSet.id);
  document.querySelector("#view-user-name").innerHTML = viewDataSet.name !== 'null' ?
    viewDataSet.name :
    "Name Not Set";
  document.querySelector("#view-user-city").innerHTML = viewDataSet.city !== 'null' ?
    viewDataSet.city :
    "City Not Set";
  document.querySelector("#view-user-id").innerHTML = viewDataSet.id;

  document.querySelector("#view-user-email").innerHTML = viewDataSet.email;

  document.querySelector("#view-user-phone").innerHTML = viewDataSet.phone !== 'null' ?
    viewDataSet.phone :
    "Phone Not Set";
  document.querySelector("#view-user-state").innerHTML = viewDataSet.state !== 'null' ?
    viewDataSet.state :
    "State Not Set";
  document.querySelector("#view-user-bio").innerHTML = viewDataSet.bio !== 'null' ?
    viewDataSet.bio :
    "Bio Not Set";
  document.querySelector("#view-user-type").innerHTML = viewDataSet.userType;
  document.querySelector("#view-user-con").style.display = "block";
  viewReviewerTasks();
};
// $('#user-type-select').change(function () {
//   let requestedType = localStorage.getItem('requestedType');
//   if (requestedType === `Reviewers`) {
//     console.log('here')
//     createTaskCon.classList.remove('d-none');
// } else {
//     console.log('here')
//     createTaskCon.classList.add('d-none');
// }
//   if (requestedType === 'Reviewers') {
//     reviewersData();
//   }
// });
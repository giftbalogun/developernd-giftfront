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
let viewDataSet;

const communityMembersData = (next, prev) => {
  const usersTableBody = document.querySelector("#users-table");
  usersTableBody.innerHTML = `
  <div class="col-1 spinner-con" id="spinner-users">
    <div class="spinner-border mt-3" role="status">
        <span class="sr-only">loading...</span>
    </div>
  </div>
  `;

  // if(communityMembersTabTracker){
  const routes = new Routes();
  let url = `${routes.apiOrigin}${routes.communityMembers}`;
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
  document.querySelector("#spinner-users").style.display = "block";

  const userData = JSON.parse(localStorage.getItem("DevelopND-user"));
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
      localStorage.setItem("next", data.community_members.next_page_url);
      localStorage.setItem("prev", data.community_members.prev_page_url);
      localStorage.setItem("firstPage", data.community_members.first_page_url);
      localStorage.setItem("lastPage", data.community_members.last_page_url);
      localStorage.setItem("currentPageNum", data.community_members.current_page);
      localStorage.setItem("lastPageNum", data.community_members.last_page);
      localStorage.setItem("path", data.community_members.path);
      showPagList();
      // console.log(data.all[0]);
      // let userDataObject = data.all[0];
      let communityMembersDataObject = data.community_members.data;

      document.querySelector("#spinner-users").style.display = "none";

      let dataCount = 1;
      let imageSrc = "";
      if (communityMembersDataObject.length > 0) {
        communityMembersDataObject.map(communityMemberData => {
          if (communityMemberData.user_mode == "DevelopND") {
            imageSrc = `${data["image_link"]}${communityMemberData.image}`;
          } else {
            imageSrc = `${communityMemberData.image}`;
          }
          usersTableBody.innerHTML += `
                <tr>
                    <th scope="row">${dataCount}</th>
                    <td>${communityMemberData.id}</td>
                    <td>${
                      communityMemberData.name
                        ? communityMemberData.name
                        : "Name Not Set"
                    }</td>
                    <td>${
                      communityMemberData.lga
                        ? communityMemberData.lga
                        : "Location Not Set"
                    }</td>
                    <td>${communityMemberData.user_type}</td>
                    <td>${communityMemberData.created_at_for_humans}</td>
                    <td>
                        <i style="cursor: pointer" class="mx-1 mt-2 fa fas fa-eye view-community" data-id=${
                          communityMemberData.id
                        } data-name=${communityMemberData.name} data-email=${
            communityMemberData.email
          }
                         data-phone=${communityMemberData.phone} data-state=${
            communityMemberData.state
          } data-city=${communityMemberData.city}
                          data-bio=${communityMemberData.bio} data-user-type=${
            communityMemberData.user_type
          }><i></td>
                </tr>
                `;
          dataCount++;
          imageSrc = "";
          const viewCommunity = Array.from(document.querySelectorAll(`.view-community`));

          viewCommunity.map(x => {
            x.addEventListener("click", event => {
              if (requestedType !== `CommunityMembers`) {
                upgradeBtn.classList.add('d-none');
              }
              viewCommunityFunc(event, x);
            });
          });
        });
        communityMembersTabTracker = false;
      } else {
        console.log('in ommunity')
        usersTableBody.innerHTML = `
          <div class="col-12 spinner-con" style="position: absolute; margin-top: 150px;" >
              <div class="mt-3" role="status">
                <p style="color: center; color: grey; font-weight: bold; text-align: center;">No CommunityMembers Found!</p>
              </div>
          </div>`;
      }
    })
    .catch(err => console.error(err));
  // }
};
viewCommunityFunc = (event, x) => {
  viewDataSet = x.dataset;
  console.log(viewDataSet);
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

  return viewDataSet;
};
if (requestedType === 'CommunityMembers') {
  console.log('here')
  communityMembersData();
}
// $("#user-type-select").change(function () {
//   let requestedType = localStorage.getItem('requestedType');
//   console.log(requestedType)
//   if (requestedType == 'CommunityMembers') {
//     console.log('here')
//     upgradeBtn.classList.remove('d-none');
//     communityMembersData();
//   } else {
//     console.log('NOT here')
//     upgradeBtn.classList.add('d-none');
//   }
// });
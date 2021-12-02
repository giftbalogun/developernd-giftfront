const adminsData = (next, prev) => {
  const adminsTab = document.querySelector('#admins-tab');
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

  // if(adminsTabTracker){
  const routes = new Routes();
  const url = `${routes.apiOrigin}${routes.admins}`;
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
      console.log(data)
      console.log(data['image_link'])
      localStorage.setItem("next", data.admins.next_page_url);
      localStorage.setItem("prev", data.admins.prev_page_url);
      localStorage.setItem("firstPage", data.admins.first_page_url);
      localStorage.setItem("lastPage", data.admins.last_page_url);
      localStorage.setItem("currentPageNum", data.admins.current_page);
      localStorage.setItem("lastPageNum", data.admins.last_page);
      localStorage.setItem("path", data.admins.path);
      showPagList();
      // console.log(data.all[0]);
      // let userDataObject = data.all[0];
      let adminsDataObject = data.admins.data;

      document.querySelector("#spinner-users").style.display = 'none';

      let dataCount = 1;
      let imageSrc = '';
      if (adminsDataObject.length > 0) {
        adminsDataObject.map(adminData => {
          console.log(adminData);
          console.log(adminData.user_mode)
          if (adminData.user_mode == "DevelopND") {
            imageSrc = `${data['image_link']}${adminData.image}`;
            console.log(imageSrc);
          } else {
            imageSrc = `${adminData.image}`;
            console.log(imageSrc);
          }
          usersTableBody.innerHTML += `
                <tr>
                    <th scope="row">${dataCount}</th>
                    <td>${adminData.id}</td>
                    <td>${adminData.name ? adminData.name : 'Name Not Set'}</td>
                    <td>${adminData.lga ? adminData.lga : 'Location Not Set'}</td>
                    <td>${adminData.user_type}</td>
                    <td>${adminData.created_at_for_humans}</td>
                    <td>
                    <i style="cursor: pointer" class="mx-1 mt-2 fa fas fa-eye view-admin" data-id=${
                      adminData.id
                    } data-name=${adminData.name} data-email=${
        adminData.email
      }
                     data-phone=${adminData.phone} data-state=${
        adminData.state
      } data-city=${adminData.city}
                      data-bio=${adminData.bio} data-user-type=${
        adminData.user_type
      }><i></td>
                </tr>
                `;
          dataCount++;
          imageSrc = ''
          const viewAdmin = Array.from(document.querySelectorAll(`.view-admin`));
          console.log(viewAdmin);

          viewAdmin.map(x => {
            console.log(x);
            x.addEventListener("click", event => {
              if (requestedType !== `CommunityMembers`) {
                upgradeBtn.classList.add('d-none');
              }
              viewAdminFunc(event, x);
            });
          });
        });
        adminsTabTracker = false;
      } else {
        usersTableBody.innerHTML = `
          <div class="col-12 spinner-con" style="position: absolute; margin-top: 150px;" >
              <div class="mt-3" role="status">
                <p style="color: center; color: grey; font-weight: bold; text-align: center;">No Admins Found!</p>
              </div>
          </div>`;
      }
    })
    .catch(err => console.error(err));
  // }

};
viewAdminFunc = (event, x) => {
  const viewDataSet = x.dataset;
  console.log(viewDataSet);
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
};
// $('#user-type-select').change(function () {
//   let requestedType = localStorage.getItem('requestedType');
//   console.log(requestedType);
//   if (requestedType === 'Admins') {
//     adminsData();
//   }
// });
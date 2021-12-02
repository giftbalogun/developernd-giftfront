const contractorsData = (next, prev) => {
  const contractorsTab = document.querySelector('#contractors-tab');
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

  // if(contractorsTabTracker){
  const routes = new Routes();
  const url = `${routes.apiOrigin}${routes.contractors}`;
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
      localStorage.setItem("next", data.contractors.next_page_url);
      localStorage.setItem("prev", data.contractors.prev_page_url);
      localStorage.setItem("firstPage", data.contractors.first_page_url);
      localStorage.setItem("lastPage", data.contractors.last_page_url);
      localStorage.setItem("currentPageNum", data.contractors.current_page);
      localStorage.setItem("lastPageNum", data.contractors.last_page);
      localStorage.setItem("path", data.contractors.path);
      showPagList();
      // console.log(data.all[0]);
      // let userDataObject = data.all[0];
      let contractorsDataObject = data.contractors.data;

      document.querySelector("#spinner-users").style.display = 'none';

      let dataCount = 1;
      let imageSrc = '';
      if (contractorsDataObject.length > 0) {
        contractorsDataObject.map(contractorData => {
          console.log(contractorData);
          console.log(contractorData.user_mode)
          if (contractorData.user_mode == "DevelopND") {
            imageSrc = `${data['image_link']}${contractorData.image}`;
            console.log(imageSrc);
          } else {
            imageSrc = `${contractorData.image}`;
            console.log(imageSrc);
          }
          usersTableBody.innerHTML += `
                <tr>
                    <th scope="row">${dataCount}</th>
                    <td>${contractorData.id}</td>
                    <td>${contractorData.name ? contractorData.name : 'Name Not Set'}</td>
                    <td>${contractorData.lga ? contractorData.lga : 'Location Not Set'}</td>
                    <td>${contractorData.user_type}</td>
                    <td>${contractorData.created_at_for_humans}</td>
                    <td>
                    <i style="cursor: pointer" class="mx-1 mt-2 fa fas fa-eye view-contractor" data-id=${
                      contratorData.id
                    } data-name=${contratorData.name} data-email=${
        contratorData.email
      }
                     data-phone=${contratorData.phone} data-state=${
        contratorData.state
      } data-city=${contratorData.city}
                      data-bio=${contratorData.bio} data-user-type=${
        contratorData.user_type
      }><i></td>
                </tr>
                `;
          dataCount++;
          imageSrc = ''
          const viewContractor = Array.from(document.querySelectorAll(`.view-contractor`));
          console.log(viewContractor);

          viewContractor.map(x => {
            console.log(x);
            x.addEventListener("click", event => {
              if (requestedType !== `CommunityMembers`) {
                upgradeBtn.classList.add('d-none');
              }
              viewContractorFunc(event, x);
            });
          });
        });
        contractorsTabTracker = false;
      } else {
        usersTableBody.innerHTML = `
          <div class="col-12 spinner-con" style="position: absolute; margin-top: 150px;" >
              <div class="mt-3" role="status">
                <p style="color: center; color: grey; font-weight: bold; text-align: center;">No Contractors Found!</p>
              </div>
          </div>`;
      }
    })
    .catch(err => console.error(err));
  // }

};
viewUserFunc = (event, x) => {
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
//   if (requestedType === 'Contractors') {
//     contractorsData();
//   }
// });
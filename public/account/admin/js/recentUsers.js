const recentUsersHolder = document.querySelector('#recent-users-holder')
const spinnerRecentUsers = document.querySelector('#spinner-recent-users')
const getRecentUsers = () => {
  const routes = new Routes();
  const url = `${ routes.apiOrigin}${ routes.recentUsers }`;
  const data = JSON.parse(localStorage.getItem('DevelopND-user'));
  const {
    token
  } = data;
  console.log(certified)
  fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Accept": "aplication/json",
        "Authorization": token
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(url);
      console.log(data);
      spinnerRecentUsers.style.display = 'none';
      let recentUsersObject = data.recent_users;
      let imageSrc = '';
      if (recentUsersObject.length > 0) {
        recentUsersObject.map(recentUser => {
          console.log(recentUser);
          if (recentUser.user_mode == "DevelopND") {
            imageSrc = `${data['image_link']}${recentUser.image}`;
            console.log(imageSrc);
          } else {
            imageSrc = `${recentUser.image}`;
            console.log(imageSrc);
          }
          recentUsersHolder.innerHTML += `
          <div class="recently-joined-info col-12 border-bottom mt-3 row mx-0 px-0">
          <div class="user-image col-3 px-0">
              <div class="image-con border ml-1 mt-1">
                  <img src="${imageSrc}" alt="">
              </div>
          </div>
          <div class="user-name col-6 px-0">
              <p class="mb-0 mt-2">${recentUser.email}</p>
              <span>Joined: ${recentUser.joined}</span>
          </div>
          <div class="user-location col-3 px-0">
              <p class="mt-3">${
                recentUser.city
                  ? recentUser.city
                  : "Location Not Set"
              }</p>
          </div>
      </div>
                  `;
          imageSrc = ''
        });
      } else {
        usersTableBody.innerHTML = `
            <div class="col-12 spinner-con" style="position: absolute; margin-top: 150px;" >
                <div class="mt-3" role="status">
                  <p style="color: center; color: grey; font-weight: bold; text-align: center;">No Community Memeber Found!</p>
                </div>
            </div>`;
      }
    })
    .catch(err => console.error(err))
}
getRecentUsers();

const allUsersData = () => {
  
const routes = new Routes();
const url = `${ routes.apiOrigin}${ routes.allUsers }`;
const userTableBody = document.querySelector("#user-table-body")
console.log(url)

const data = JSON.parse(localStorage.getItem('DevelopND-user'));
const {token} = data;
fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
        "Accept": "application/json",
        "Authorization": token
    }
 })
 .then(response => response.json())
 .then(data => {
    console.log(data.all[0]);
    let userDataObject = data.all[0];
    userTableBody.innerHTML = '';
    userDataObject.map(userData => {
        console.log(userData)
        userTableBody.innerHTML += `

        <tr>
        <td>${userData.name}</td>
        <td>${userData.email}</td>
        <td>${userData.gender}</td>
        <td>${userData.lga}</td>
        <td>${userData.city}</td>
        <th>${userData.state}</th>
        <th><a href="#" class="btn btn-primary btn-icon-split btn-sm">
          <span class="text">View</span>
        </a></th>
      </tr>
        `
    })
 })
 .catch(err => console.error(err))
}
allUsersData();
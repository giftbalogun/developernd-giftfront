// // let communityMembersTabTracker = true;
// // let reviewersTabTracker = true;
// // let contractorsTabTracker = true;
// // let adminsTabTracker = true;

// //This should trigger the fetch user event
// const communityMembersTab = document.querySelector('#community-members-tab');

// communityMembersTab.addEventListener('click', (event) => communityMembersData())

// //This should trigger the fetch user event
// const reviewersTab = document.querySelector('#reviewers-tab');

// reviewersTab.addEventListener('click', (event) => reviewersData())

// //This should trigger the fetch user event
// const contractorsTab = document.querySelector('#contractors-tab');

// contractorsTab.addEventListener('click', (event) => contractorsData())

// //This should trigger the fetch user event
// const adminsTab = document.querySelector('#admins-tab');

// adminsTab.addEventListener('click', (event) => adminsData())

let requestedType = 'CommunityMembers';
$("#user-type-select").change(function () {
  console.log("changed");
  document.querySelector("#view-user-con").style.display = "none";
  requestedType = $(this)
    .children("option:selected")
    .text();
  console.log(requestedType);
  if (requestedType == 'CommunityMembers') {
    console.log('here')
    upgradeBtn.classList.remove('d-none');
    communityMembersData();
  } else {
    console.log('NOT here')
    upgradeBtn.classList.add('d-none');
  }
  if (requestedType == `Reviewers`) {
    console.log('here')
    createTaskCon.classList.remove('d-none');
    viewTaskCon.classList.remove('d-none');
    reviewersData();
  } else {
    console.log('not here')
    createTaskCon.classList.add('d-none');
    viewTaskCon.classList.add('d-none');
  }
  if (requestedType == 'Contractors') {
    contractorsData();
  }
  if (requestedType == 'Admins') {
    adminsData();
  }
});
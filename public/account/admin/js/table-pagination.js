showNextPage = () => {

    next = localStorage.getItem("next");
    console.log(next);
    if (window.location.pathname === "/account/admin/admin-projects.html" || window.location.pathname === "/account/admin/admin-projects") {
        getProjects(next, prev);
    }
    if (window.location.pathname === "/account/admin/admin-users.html" || window.location.pathname === "/account/admin/admin-users") {
        if (requestedType === 'CommunityMembers') {
            communityMembersData(next, prev);
        }
        if (requestedType === 'Reviewers') {
            reviewersData(next, prev);
        }
        if (requestedType === 'Contractors') {
            contractorsData(next, prev);
        }
        if (requestedType === 'Admins') {
            adminsData(next, prev);
        }
    }
    next = null;
    prev = null;
    showPagList();
};

showPrevPage = () => {
    prev = localStorage.getItem("prev");
    console.log(prev);
    if (window.location.pathname === "/account/admin/admin-projects.html" || window.location.pathname === "/account/admin/admin-projects") {
        getProjects(next, prev);
    }
    if (window.location.pathname === "/account/admin/admin-users.html" || window.location.pathname === "/account/admin/admin-users.html") {
        if (requestedType === 'CommunityMembers') {
            communityMembersData(next, prev);
        }
        if (requestedType === 'Reviewers') {
            reviewersData(next, prev);
        }
        if (requestedType === 'Contractors') {
            contractorsData(next, prev);
        }
        if (requestedType === 'Admins') {
            adminsData(next, prev);
        }
    }
    next = null;
    prev = null;
    showPagList();
};

showFirstPage = () => {
    firstPage = localStorage.getItem("first");
    if (window.location.pathname === "/account/admin/admin-projects.html" || window.location.pathname === "/account/admin/admin-projects") {
        getProjects(firstPage);
    }
    if (window.location.pathname === "/account/admin/admin-users.html" || window.location.pathname === "/account/admin/admin-users") {
        if (requestedType === 'CommunityMembers') {
            communityMembersData(firstPage);
        }
        if (requestedType === 'Reviewers') {
            reviewersData(firstPage);
        }
        if (requestedType === 'Contractors') {
            contractorsData(firstPage);
        }
        if (requestedType === 'Admins') {
            adminsData(firstPage);
        }
    }
    firstPage = null;
    showPagList();
};
showLastPage = () => {
    lastPage = localStorage.getItem("lastPage");
    if (window.location.pathname === "/account/admin/admin-projects.html" || window.location.pathname === "/account/admin/admin-projects") {
        getProjects(lastPage);
    }
    if (window.location.pathname === "/account/admin/admin-users.html" || window.location.pathname === "/account/admin/admin-users") {
        if (requestedType === 'CommunityMembers') {
            communityMembersData(lastPage);
        }
        if (requestedType === 'Reviewers') {
            reviewersData(lastPage);
        }
        if (requestedType === 'Contractors') {
            contractorsData(lastPage);
        }
        if (requestedType === 'Admins') {
            adminsData(lastPage);
        }
    }
    lastPage = null;
    showPagList();
};
  seekPage = (event, x, pageNavs) => {
    chosenPageNum = x.dataset.pageNav;
    console.log(chosenPageNum);
    chosenPage = localStorage.getItem("path") + `?page=${chosenPageNum}`;
    console.log(chosenPage);
    if (window.location.pathname === "/account/admin/admin-projects.html" || window.location.pathname === "/account/admin/admin-projects") {
        getProjects(next, prev);
    }
    if (window.location.pathname === "/account/admin/admin-users.html" || window.location.pathname === "/account/admin/admin-users") {
        if (requestedType === 'CommunityMembers') {
            communityMembersData(next, prev);
        }
        if (requestedType === 'Reviewers') {
            reviewersData(next, prev);
        }
        if (requestedType === 'Contractors') {
            contractorsData(next, prev);
        }
        if (requestedType === 'Admins') {
            adminsData(next, prev);
        }
    }
    chosenPage = "";
    showPagList();
  };
showPagList = () => {
    console.log('here')
    let i;
    let currentPage = Number(localStorage.getItem("currentPageNum"));
    let lastPage = localStorage.getItem("lastPageNum");
    firstPageButton.style.display = "block";
    prevPageButton.style.display = "block";
    nextPageButton.style.display = "block";
    lastPageButton.style.display = "block";
    availablePages.innerHTML = "";
    for (i = 0; i < 5; i++) {
        availablePages.innerHTML += `
    <li class="page-item page-nav" data-page-nav="${currentPage}"><a class="page-link" href="#">${currentPage}</a></li>
    `;
    console.log(currentPage)
    console.log(lastPage)
        if (currentPage === 1) {
            firstPageButton.style.display = "none";
            prevPageButton.style.display = "none";
        } else if (currentPage == lastPage) {
            nextPageButton.style.display = "none";
            lastPageButton.style.display = "none";
        }
        currentPage = currentPage + 1;
        //   if (currentPage > lastPage) {
        //     console.log("greater");
        //     return;
        //   }
    }
    let pageNavs = Array.from(document.querySelectorAll(".page-nav"));
    console.log(pageNavs);
    pageNavs.map(x => {
          x.addEventListener("click", event => seekPage(event, x, pageNavs));
    });
};
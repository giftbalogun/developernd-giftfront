const routes = new Routes();
const url = `${ routes.apiOrigin}${ routes.getAdminStats }`;
let totalBudgetValue = document.querySelector('#total-budget-value')
// let totalContractorsValue = document.querySelector('#total-contractors-value')
let totalCommentValue = document.querySelector('#total-comment-value')
let totalCompletedValue = document.querySelector('#total-completed-value')
let totalInProgressValue = document.querySelector('#total-in-progress-value')
let totalReviewsValue = document.querySelector('#total-reviews-value')
// let totalCommunityValue = document.querySelector('#total-community-value')
let totalProjectValue = document.querySelector('#total-project-value') || false;
// let totalReviewersValue = document.querySelector('#total-reviewers-value')
// let totalSubscribersValue = document.querySelector('#total-subscribers-value')
let totalUserValue = document.querySelector('#total-user-value') || false;
let totalViewsValue = document.querySelector('#total-views-value')
// let totalAdminsValue = document.querySelector('#total-admin-value')
// let totalComplaintsValue = document.querySelector('#total-complaints-value')
// let totalSMSReceivedValue = document.querySelector('#total-sms-received-value')
// let toPPtalReviewedProjectsValue = document.querySelector('#total-reviewed-projects-value')
// let totalSavedProjectsValue = document.querySelector('#total-saved-projects-value')
let totalCompleted;
let totalNotCompleted;
let totalAbandoned;
let usersPerMonthObject;

let dashboardHome = document.querySelector('#dashboard-home') || false;

const data = JSON.parse(localStorage.getItem('DevelopND-user'));
const {
    token
} = data;
const getStat = () => {
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
            console.log(data)

            const {
                totalBudget,
                totalComment,
                totalCommunity,
                totalContractors,
                totalProject,
                totalReviewers,
                totalSubcribers,
                totalUser,
                totalAdmins,
                totalProjectComplians,
                totalRecieveSmsMessages,
                totalReviewedProject,
                totalSavedProject,
                totalCompletedProjects,
                totalNotCompletedProjects,
                totalAbandonedProjects,
                totalProjectViews,
                totalInProgressProjects,
                usersPerMonth
            } = data;
            // totalBudgetValue.innerHTML = "&#8358;"+totalBudget;
            // totalCommentValue.innerHTML = totalComment;
            // totalCommunityValue.innerHTML = totalCommunity;
            // totalContractorsValue.innerHTML = totalContractors;
            if (totalProjectValue) {
                totalProjectValue.innerHTML = totalProject;
            }
            // totalReviewersValue.innerHTML = totalReviewers;
            // totalSubscribersValue.innerHTML = totalSubcribers;
            if (totalUserValue) {
                totalUserValue.innerHTML = totalUser;
            }
            if (dashboardHome) {
                usersPerMonthObject = usersPerMonth;
                console.log(usersPerMonthObject)
                totalCompletedValue.innerHTML = totalCompletedProjects;
                totalInProgressValue.innerHTML = totalInProgressProjects;
                // totalBudgetValue.innerHTML = totalBudget;
                totalReviewsValue.innerHTML = totalReviewedProject;
                console.log(totalProjectViews)
                totalCommentValue.innerHTML = totalComment;
                totalViewsValue.innerHTML = totalProjectViews;
                totalCompleted = totalCompletedProjects;
                totalNotCompleted = totalNotCompletedProjects;
                totalInProgress = totalInProgressProjects;
                totalAbandoned = totalAbandonedProjects;
                getChart(usersPerMonthObject);
            }
            // totalAdminsValue.innerHTML = totalAdmins;
            // totalComplaintsValue.innerHTML = totalProjectComplians;
            // totalSMSReceivedValue.innerHTML = totalRecieveSmsMessages;
            // totalReviewedProjectsValue.innerHTML = totalReviewedProject;
            // totalSavedProjectsValue.innerHTML = totalSavedProject;
        })
        .catch(err => console.error(err))
}

// setTimeout(() => {
getStat();
// }, 3000)

const sidebarLogout = document.querySelector('#sidebar-logout');
sidebarLogoutFunc = () => {
    console.log('logout')
    localStorage.clear();
    location.replace(`${window.location.origin}/account/admin`);
}
/*
Import Note: The base_url.js hold every every third party base url origin and api's path for the application to work
    for example: the api origin or any api origin
    this url can been use in the application as a variable
*/
//const api_origin = 'http://127.0.0.1:8000/';
// const api_origin = 'https://hackathon-nddc.herokuapp.com/';
//const api_origin = 'https://api.developnd.ng/';

class Routes {

  get apiOrigin() {
    return  'https://api.developnd.ng/';
  }
  
  get checkSession() {
    return "api/v1/check/session"
  }
  //Authentication Paths
  get register() {
    return "api/v1/register";
  }
  get login_1() {
    return "api/v1/login";
  }
  get login_0() {
    return "api/v1/admin/login";
  }
  get verify() {
    return "api/v1/verify";
  }
  get forgotPassword() {
    return "api/v1/forgot/password";
  }
  get resetPassword() {
    return "api/v1/reset/password";
  }
  //Google Auth
  get googleAuth() {
    return "redirect/google";
  }
   //Facebook Auth
   get facebookAuth() {
    return "redirect/facebook";
  }
  get currentUser() {
    return "api/v1/user";
  }

  //Subcribers
  get subscribeSend() {
    return "api/v1/subscriber/create";
  }
  get subscribers() {
    return "api/v1/subscribers";
  }
  subscriberOne(id) {
    return `api/v1/subscribers/one/${id}`;
  }
  subscriberDelete(id) {
    return `api/v1/subscribers/delete/${id}`;
  }
 
  //Projects
  searchProject(query, filterState, filterStatus, filterProjectType, filterProjectLga, filterProjectCommunity) {
    return `api/v1/project/search/${query}/${filterState}/${filterStatus}/${filterProjectType}/${filterProjectLga}/${filterProjectCommunity}`;
  }

  viewOneProject(id) {
    return `api/v1/project/${id}`;
  }

  // Admin Dashboard
  get getAdminStats() {
    return "api/v1/count";
  }

  get allUsers() {
    return "api/v1/user/all"
  }

  allProjects(queryVar, filterStateVar, filterStatusVar, filterCategoryVar) {
    return `api/v1/admin/get-all-projects/${queryVar}/${filterStateVar}/${filterStatusVar}/${filterCategoryVar}`
  }

  get uploadExcel() {
    return "api/v1/import/project"
  }

  // Contact Us
  get contactUs() {
    return "api/v1/contact/send";
  }

  //Vote Project status
  get projectStatusVoting() {
    return "api/v1/change-project-status/";
  }

  // Reviewers Dashboard
  get allMyTasks() {
    return "api/v1/assignments/reviewers-tasks/all";
  }
  get allCompletedTasks() {
    return "api/v1/assignments/reviewers-tasks/completed";
  }
  get allNotCompletedTasks() {
    return "api/v1/assignments/reviewers-tasks/notcompleted";
  }
  get reviewedProjectFilter() {
    return "api/v1/review/myreviews/count-stat";
  }
  get allMyReviews() {
    return "api/v1/review/all-reviews";
  }
  get reviewedProjectStats() {
    return "api/v1/review/myreviews/count";
  }
  get myReviewdProjectFilter() {
    return "api/v1/review/my-reviews/filter-review/";
  }
  get postReviewsByProjectId() {
    return "api/v1/review/save";
  }
  get markTaskCompleted() {
    return "api/v1/assignments/tasks/markascomplete/";
  }

  // Edit Profile
  get editProfile() {
    return "api/v1/user/edit"
  }

  get changePassword() {
    return "api/v1/password/change"
  }

  get deleteAccount() {
    return "api/v1/user/delete"
  }

  createComment(project_id, anonymous=no) {
    return `api/v1/comment/create/${project_id}/${anonymous}`;
  }
  fetchProjectComments(id) {
    return `api/v1/project/comment/show/${id}`;
  }
  createReplyComment(project_id, comment_id, anonymous=no) {
    return `api/v1/commentreply/create/${project_id}/${comment_id}/${anonymous}`;
  }

  saveProject(project_id) {
    return `api/v1/save/project/${project_id}`
  }
  get getSavedProjects() {
    return `api/v1/saved/project`;
  }
  deleteSavedProject(id) {
    return `api/v1/saved/project/delete/${id}`;
  }

  get fetchFilterNumbers() {
    return `api/v1/project/stat/count`;
  }
  //Notification
  get getNotifications() {
    return `api/v1/notification`;
  }
  get communityMembers() {
    return `api/v1/users/community_members`
  }
  get reviewers() {
    return `api/v1/users/reviewers`
  }
  get contractors() {
    return `api/v1/users/contractors`
  }
  get admins() {
    return `api/v1/users/admins`
  }
  get createProject() {
    return `api/v1/project/create`
  }
  get recentReviews() {
    return `api/v1/admin/recent-reviews`
  }
  storeRating(project_id){
    return `api/v1/rate-project/${project_id}`
  }
  get activeProjects() {
    return `api/v1/admin/most-active-projects`
  }
  get recentUsers() {
    return `api/v1/admin/recent-users`
  }
  reportAProject(project_id) {
    return `api/v1/report/${project_id}`;
  }
  get allReports() {
    return `api/v1/admin/reports`
  }
  get allTextMessageReports() {
    return `api/v1/admin/get-all-sms`
  }
  deleteTextSms(id) {
    return `api/v1/admin/delete/sms/${id}`
  }
  get adminMessage() {
    return `api/v1/admin-send-message`
  }
  upgradeUser(user_id) {
    return `api/v1/user/upgrade/${user_id}`
  }
  createTask(user_id) {
    return `api/v1/admin/assignments/assign/${user_id}`
  }
  deleteTask(task_id) {
    return `api/v1/admin/assignments/delete/${task_id}`
  }
  viewReviewerTask(user_id) {
    return `api/v1/admin/assignments/all-reviewers-tasks/${user_id}`
  }
   get fetchSector() {
    return `api/v1/filter/project_sector`
  }
  fetchLga(state) {
    return `api/v1/filter/lga/${state}`
  }
  fetchCommunity(state, lga) {
    console.log(state)
    return `api/v1/filter/community/${state}/${lga}`
  }

}


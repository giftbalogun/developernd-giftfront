let requestedFilter = null;
$("#project-status-select").change(function () {
  console.log("changed");
  requestedFilter = $(this)
    .children("option:selected")
    .val();
  console.log(requestedFilter)
  getProjects(queryVar, filterStateVar, requestedFilter, filterCategoryVar);
});
$("#project-state-select").change(function () {
  console.log("changed");
  requestedFilter = $(this)
    .children("option:selected")
    .val();
  console.log(requestedFilter)
  getProjects(queryVar, requestedFilter, filterStatusVar, filterCategoryVar);
});
$("#project-category-select").change(function () {
  console.log("changed");
  requestedFilter = $(this)
    .children("option:selected")
    .val();
  console.log(requestedFilter)
  getProjects(queryVar, filterStateVar, filterStatusVar, requestedFilter);
});
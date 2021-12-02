
const customFilter_2 = (event, x, i) => {
 
  if (x.checked == true) {
    filterProjectType += `,${x.value}`;
  } else {
    filterProjectType = filterProjectType.replace(`,${x.value}`, "");
  }

projectResults = [];
fetchProjects(query, filterState, filterStatus, filterProjectType, filterProjectLga, filterProjectCommunity, next, prev, chosenPage);
};

const fetchProjectSectorFunc = () => {
  const projectSectorDom = document.querySelector('[data-project-sectors]');

  const routes = new Routes();
  let url = `${routes.apiOrigin}${routes.fetchProjectSector}`;

fetch(url)
  .then(response => response.json())
  .then(data => {

    if(data) {

    if(data.project_types.length == 0) {
      projectSectorDom.innerHTML += `
     <div class="form-check mb-3">
    No Project Sector Found!
       </div>`;
      return false;
    }
    projectSectorDom.innerHTML = ``;
    Object.keys(data.project_types).map(i => {
        
      const result = data.project_types[i].split('|');
    
      projectSectorDom.innerHTML += `
         <div class="form-check mb-3">
       <input class="form-check-input sector-search" type="checkbox" value="${result[0]}">
                  <label class="form-check-label">
                      ${result[0]} (<span>${result[1]}</span>)
                  </label>
           </div>`;
      });
    }

    const customFilterBoxs = Array.from(document.querySelectorAll(".sector-search"));
      customFilterBoxs.map((x, i) => {
        x.addEventListener("change", event => customFilter_2(event, x, i));
      });
    
    // expand the panel after executing fetch
    document.querySelector('#panel-btn').click();
    document.querySelector('#panel-btn').click();
  })    
 .catch(err => {
   console.log(err);
 });
}

fetchProjectSectorFunc();
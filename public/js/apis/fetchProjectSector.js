
const customFilterSector = (event, x, i) => {
 
  if (x.checked == true) {
    filterProjectSector += `,${x.value}`;
  } else {
    filterProjectSector = filterProjectSector.replace(`,${x.value}`, "");
  }

projectResults = [];
fetchProjects(query, filterState, filterStatus, filterProjectSector, filterProjectLga, filterProjectCommunity, next, prev, chosenPage);
};

const fetchProjectSectorFunc = () => {
  const projectSectorDom = document.querySelector('[data-project-sectors]');

  const routes = new Routes();
  let url = `${routes.apiOrigin}${routes.fetchSector}`;

fetch(url)
  .then(response => response.json())
  .then(data => {

    if(data) {

    if(data.sectors.length == 0) {
      projectSectorDom.innerHTML += `
     <div class="form-check mb-3">
    No Project Sector Found!
       </div>`;
      return false;
    }
    projectSectorDom.innerHTML = ``;
    Object.keys(data.sectors).map(i => {
        
      const result = data.sectors[i].split('|');
    
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
        x.addEventListener("change", event => customFilterSector(event, x, i));
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

const customFilterSector = (event, x, i) => {
  if (x.checked == true) {
    console.log(x.value, filterProjectSector)
    if(filterProjectSector){
      if(!filterProjectSector.includes(x.value)){
        filterProjectSector += `,${x.value}`;   
      }
    }else {
      filterProjectSector += `,${x.value}`;  
    }
    
   
  } else {
    if(filterProjectSector.includes(x.value)){
        filterProjectSector = filterProjectSector.replace(`,${x.value}`, "");
    }
    
  }
  projectResults = [];
  if(keyLock == true){
    fetchProjects(query, filterState, filterStatus, filterProjectSector, filterProjectLga, filterProjectSector, next, prev, chosenPage);
    keyLock = false;
  }

};


const fetchSectorFunc = (url, floatDOM) => {

const projectSectorDom = document.querySelector(`[data-project-sectors]`);

  //Render Comm DOM
  const renderSectorDomFunc = (data, projectSectorDom, url, next_page_url) => {

    if( url == next_page_url && data.sectors.length == 0) {
      return false;
    }
    
    if(data.sectors.length == 0) {
      projectSectorDom.innerHTML = `
      <div class="form-check mt-3">
          No Sector Found!
      </div>`;
      return false;
    }
    Object.keys(data.sectors).map(i => {

      const result = data.sectors[i].split('|');

      const checkSector = floatDOM.indexOf(result[0]);

        if( checkSector === -1){
          $(`[data-project-sectors]`).append(`<div class="form-check mb-3">
                  <input class="form-check-input sector-search" type="checkbox" value="${result[0]}">
                        <label class="form-check-label">
                            ${result[0]} (<span>${result[1]}</span>)
                        </label>
              </div>`);
          floatDOM.push(result[0]);
        }
  
      });
    }



fetch(url)
.then(response => response.json())
.then(data => {
  if(data) {
    renderSectorDomFunc(data, projectSectorDom, url, data.next_page_url)
    fetchSectorFunc(data.next_page_url, floatDOM)
    const customFilterBoxs = Array.from(document.querySelectorAll(".comm-search"));
    
      customFilterBoxs.map((x, i) => {
       x.addEventListener("change", event => customFilterSector(event, x, i));
      });
    // expand the panel after executing fetch
    document.querySelector('#panel-btn').click();
    document.querySelector('#panel-btn').click();
  }
})    
.catch(err => {
 console.log(err);
});
}


const fetchSectorRoute = () => {
const routes = new Routes();
const floatDOM = [];
let url = `${routes.apiOrigin}${routes.fetchSector}`;
fetchSectorFunc(url, floatDOM)
} 

fetchSectorRoute();
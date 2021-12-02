
const customFilter_Lga = (event, x, i, index, state) => {

  let randomID = x.dataset.random;
  if (x.checked == true) {

    if(filterProjectLga){
      if(!filterProjectLga.includes(x.value)){
        let activeLga = document.querySelector(`#comm${randomID}`);
        filterProjectLga += `,${x.value}`;   
        
        activeLga.innerHTML = `<div class="mx-3 comm-spinner spinner-border spinner-border-sm" data-comm-spinner${randomID} role="status">
        <span class="sr-only">Loading...</span>
        </div>`; `  `

        fetchCommunityRoute(state, x.value, i, index, randomID, activeLga);
        nodeChecked = x;  
        collapseState(activeLga, panelKey, x);
        x.parentNode.classList.replace('mb-3', 'mb-1');
      }
    }else {
  
      let activeLga = document.querySelector(`#comm${randomID}`);
      filterProjectLga += `,${x.value}`;  
        
        activeLga.innerHTML = `<div class="mx-3 comm-spinner spinner-border spinner-border-sm" data-comm-spinner${randomID} role="status">
        <span class="sr-only">Loading...</span>
        </div>`; 

        fetchCommunityRoute(state, x.value, i, index, randomID, activeLga);
        nodeChecked = x;  
        collapseState(activeLga, panelKey, x);
        x.parentNode.classList.replace('mb-3', 'mb-1');
    }

       //Disable all checboxes untill after response is successfully
        const clientSearch = Array.from(document.querySelectorAll('.client-search'));
        clientSearch.map(x => {
          x.disabled = true;
        });

  } else {
    if(filterProjectLga.includes(x.value)){
        filterProjectLga = filterProjectLga.replace(`,${x.value}`, "");
        nodeChecked = null;
        collapseState(document.querySelector(`#comm${randomID}`), null, x);
        x.parentNode.classList.replace('mb-3', 'mb-1'); 
    }
    
  }
  projectResults = [];
  if(keyLock == true){
    fetchProjects(query, filterState, filterStatus, filterProjectSector, filterProjectLga, filterProjectCommunity, next, prev, chosenPage);
    keyLock = false;
  }

};


const fetchLgaFunc = (state, index, url, floatDOM) => {

const projectLgaDom = document.querySelector(`.data-lga${index}`);
console.log(projectLgaDom)

  //Render Comm DOM
  const renderLgaDomFunc = (data, projectLgaDom, url, floatDOM) => {
   
    if(data.lga.length == 0) {
      projectLgaDom.innerHTML = `<p class="text-left font-12px pl-4 mb-1">No LGA</p>`;   
      return false;
    }
   
    Object.keys(data.lga).map(i => {

      const result = data.lga[i].split('|');
      let value = `${result[0]}${index}`;
     
      const checkLga = floatDOM.indexOf(value.toLowerCase());


      if(checkLga === -1){
        //Generate unique id for the querry the community dom
        const randomID = makeid(20);

        $(`.data-lga${index}`).append(`
        <div class="mb-1 col-12">                                        
            <label for="${result[0]}">
            <input type="checkbox" name="${randomID}" id="${result[0]}" data-random="${randomID}" class="lga-search${index} client-search"  value="${result[0]}"/> 
            ${result[0]} (<span>${result[1]}</span>)
            </label>
              <div style="border-left: 1px solid #0b273d;" id="comm${randomID}" class="panel-wrapper comm${randomID} data-comm${i} ml-1 pl-1">
                  
              </div>
        </div>`);        
        floatDOM.push(value.toLowerCase());
      }  
    });
    const customFilterBoxs = Array.from(document.querySelectorAll(`.lga-search${index}`));    
    customFilterBoxs.map((x, i) => {
      x.addEventListener("change", event => customFilter_Lga(event, x, i, index, state));
    });
    
    if(nodeChecked){
      collapseState(document.querySelector(`.data-lga${index}`), 1, nodeChecked);
      document.querySelector(`.data-lga${index} .lga-spinner`).style.display = "none";  
    }
  }

if(url) {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    
    if(data) {
      renderLgaDomFunc(data, projectLgaDom, url, floatDOM)
      fetchLgaFunc(state, index, data.next_page_url, floatDOM)
  
    }
  })    
  .catch(err => {
   console.log(err);
  });
  }
}

const fetchLgaRoute = (state, index) => {
const routes = new Routes();
const floatDOM = [];
let url = `${routes.apiOrigin}${routes.fetchLga(state)}`;
fetchLgaFunc(state, index, url, floatDOM)
} 

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

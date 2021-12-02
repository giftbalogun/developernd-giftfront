
const customFilterCommunity = (event, x, i) => {
    if (x.checked == true) {
     
      if(filterProjectCommunity){
        if(!filterProjectCommunity.includes(x.value)){
          filterProjectCommunity += `,${x.value}`;   
          
        }
      }else {
        filterProjectCommunity += `,${x.value}`;  
      }
      //Disable all checboxes untill after response is successfully
      const clientSearch = Array.from(document.querySelectorAll('.client-search'));
      clientSearch.map(x => {
        x.disabled = true;
      });
     
    } else {
      if(filterProjectCommunity.includes(x.value)){
          filterProjectCommunity = filterProjectCommunity.replace(`,${x.value}`, "");
      }
      
    }
    projectResults = [];
    if(keyLock == true){
      fetchProjects(query, filterState, filterStatus, filterProjectSector, filterProjectLga, filterProjectCommunity, next, prev, chosenPage);
      keyLock = false;
    }

};


const fetchCommunityFunc = (lga, lga_i, index, randomID, DOM, url, floatDOM) => {
 
  console.log(index, DOM, url)
 

    //Render Comm DOM
    const renderCommunityDomFunc = (data, index, randomID, DOM, url, floatDOM) => {
      
      if(data.community.length == 0) {
        DOM.innerHTML = `<p class="text-left font-12px pl-4 mb-1">No Community</p>`;  
      	return false;
      }
  
      Object.keys(data.community).map(i => {
      	const result = data.community[i].split('|');
        let value = `${result[0]}${index}`;
       
        const checkCommunity = floatDOM.indexOf(value.toLowerCase());

          if( checkCommunity === -1){
          
            $(`.comm${randomID}`).append(`
            <div class="mb-1 col-12">                                        
                <label for="${result[0]}">
                <input type="checkbox" id="${result[0]}" class="comm-search${index} client-search"  value="${result[0]}"/> 
                ${result[0]} (<span>${result[1]}</span>)
                </label>
            </div>`);
            floatDOM.push(value.toLowerCase());
          }
    
        });
        const customFilterBoxs = Array.from(document.querySelectorAll(`.comm-search${index}`));
      
        customFilterBoxs.map((x, i) => {
         x.addEventListener("change", event => customFilterCommunity(event, x, i));
        });

        collapseState(document.querySelector(`#comm${randomID}`), 1, nodeChecked);
        document.querySelector(`[data-comm-spinner${randomID}]`).style.display = "none"; 
      }

      if(url) {
        fetch(url)
        .then(response => response.json())
        .then(data => {
          
          if(data) {
            console.log(data)
            renderCommunityDomFunc(data, index, randomID, DOM, url, floatDOM)
            fetchCommunityFunc(lga, lga_i, index, randomID, DOM, data.next_page_url, floatDOM)
          
          }
        })    
        .catch(err => {
          console.log(err);
        });
      }

}


const fetchCommunityRoute = (state, lga, lga_i, index, randomID, DOM) => {
  const routes = new Routes();
  const floatDOM = [];
  let url = `${routes.apiOrigin}${routes.fetchCommunity(state, lga)}`;
  
  fetchCommunityFunc(lga, lga_i, index, randomID, DOM, url, floatDOM);
} 
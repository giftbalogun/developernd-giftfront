const parsedUrl = new URL(window.location.href);
const getUrlParam = parsedUrl.searchParams;
let next = null;
let prev = null;
let chosenPage = "";
let firstPage = null;
let lastPage = null;
let stateIdTracker = [];
let keyLock = true;
let activeState = null;
let panelKey = 0;
let nodeChecked = null;

const nowShowing = document.querySelector("#now-showing");
const availablePages = document.querySelector("#available-pages");
const firstPageButton = document.querySelector("#first-page-button");
const prevPageButton = document.querySelector("#prev-page-button");
const nextPageButton = document.querySelector("#next-page-button");
const lastPageButton = document.querySelector("#last-page-button");
const statusFilter = document.querySelector("#status-filter");
const stateFilter = document.querySelector("#state-filter");
const customFilterBoxs = Array.from(
  document.querySelectorAll(".client-search")
);

let pageLinks = document.querySelectorAll(".page-nav");
let nameSplit;

let query;
let filterState = "";
let filterStatus = "";
let filterProjectSector = "";
let filterProjectLga = "";
let filterProjectCommunity = "";

let i;
let currentpage = 1;

query = getUrlParam.get("query");

if (query) {
  document.querySelector("[data-search-placeholder-box]").style.display =
    "block";
} else {
  query = null;
}

const searchPlaceHolder = document.querySelector("[data-search-placeholder]");
searchPlaceHolder.textContent = query;

let save_project = "";
let projectResults = [];
//Get the Dom
const projectDOM = document.querySelector("[data-project-dom]");

const fetchProjects = (
  query = null,
  filterState = null,
  filterStatus = null,
  filterProjectSector = null,
  filterProjectLga = null,
  filterProjectCommunity = null,
  next,
  prev,
  chosenPage
) => {
  const userLocalStore = JSON.parse(localStorage.getItem("DevelopND-user"));

  if (userLocalStore) {
    const { user, image_link } = userLocalStore;

    const { image, name, email, user_mode, image_type, user_type } = user;

    if (image_type == "DevelopND") {
      document.querySelector("[data-user-image]").src = `${image_link}${image}`;
    } else {
      document.querySelector("[data-user-image]").src = `${image}`;
    }

    if (name) {
      nameSplit = name.split(" ");
     
      if (nameSplit[1]) {
        nameSplit = `${nameSplit[0]
          .charAt(0)
          .toUpperCase()} ${nameSplit[1].charAt(0).toUpperCase()}`;
      } else {
        nameSplit = `${nameSplit[0].charAt(0).toUpperCase()}`;
      }
    }

    if (user_type == "admin") {
      name != null
        ? (document.querySelector("[data-user-name]").textContent = nameSplit)
        : (document.querySelector(
            "[data-user-name]"
          ).textContent = `Hello Admin`);
    } else {
      name != null
        ? (document.querySelector("[data-user-name]").textContent = nameSplit)
        : (document.querySelector(
            "[data-user-name]"
          ).textContent = `Hello Member`);
    }
  }
  const routes = new Routes();
 
  let url = `${routes.apiOrigin}${routes.searchProject(
    query,
    filterState,
    filterStatus,
    filterProjectSector,
    filterProjectLga,
    filterProjectCommunity
  )}`;
  console.log(url);
  projectDOM.innerHTML = `<div class="col-1 spinner-con text-center" style="top: 20%;">
                                <div class="spinner-border mt-3" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>`;
  if (next) {
    url = next;
    
  } else if (prev) {
    url = prev;
    
  } else if (chosenPage) {
    url = chosenPage;
   
  } else if (firstPage) {
    url = firstPage;
  } else if (lastPage) {
    url = lastPage;
  }

  const certified = JSON.parse(localStorage.getItem("token"));

  fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json",
      Authorization: certified ? certified : null
    }
  })
    .then(response => response.json())
    .then(result => {
      
       //remove the disabled attribute from the checkboxes
       const clientSearch = Array.from(document.querySelectorAll('.client-search'));
       clientSearch.map(x => {
         x.disabled = false;
       })

      if (result[0].data.data.length != 0) {
        projectResults = [];
        result[0].data.data.map(x => {
  
          nowShowing.innerHTML = "";
          nowShowing.innerHTML += `<span class="font-14px" style="color: #0b273d;">Now showing projects 
                                    ${result[0].data.from}-${result[0].data.to} of ${result[0].data.total}
                                   </span>`;

          localStorage.setItem("next", result[0].data.next_page_url);
          localStorage.setItem("prev", result[0].data.prev_page_url);
          localStorage.setItem("currentPageNum", result[0].data.current_page);
          localStorage.setItem("path", result[0].data.path);
          localStorage.setItem("firstPage", result[0].data.first_page_url);
          localStorage.setItem("lastPage", result[0].data.last_page_url);
          localStorage.setItem("lastPageNum", result[0].data.last_page);
          projectResults.push(x);
          showPagList();
      
        });
        
      }
      //Key to control the process for project sector, LGA, Community
      keyLock = true;
      displayProjectResult(result[0].image_link);
      fetchFilterNumbers();
    })
    .catch(err => {
      console.log(err);
    });
};

const displayProjectResult = image_link => {
  if (projectResults.length != 0) {
    projectDOM.innerHTML = ``;
    projectResults.map(projectResult => {
    
      const {
        id,
        state,
        contractor,
        budget_cost,
        LGA,
        allocated_amounts,
        allocated_years,
        start_date,
        end_date,
        unique_id,
        location,
        project_description,
        project_type,
        status,
        views,
        wallpaper,
        comments_count,
        average_rating,
        total_raters,
        created_at,
        projectsaves
      } = projectResult;

      // titleMeta.content = `A ${project_type} project from DevelopND`;
      // descriptionMeta.content = `${project_description}`;

      if (JSON.parse(localStorage.getItem("token"))) {
        if (projectsaves && projectsaves.length > 0) {
          save_project = `<img src="../../images/good_check.png" style="width:20px; height: 20px;" alt="saved">`;
        } else {
          save_project = `<span class="grey font-10px" id="saveProject${id}">
                              <span class="saveProject" data-id="${id}"><i class="fa fas fa-2x fa-save"></i>
                               <span>Save</span>
                              </span>
                          </span>`;
        }
      }

      if (
        !(
          project_description == "Not-Specified" &&
          LGA == "Not-Specified" &&
          location == "Not-Specified"
        )
      ) {
        projectDOM.innerHTML += `
              <div class="col-12 projects-listed scroller">
                <div class="col-12 mb-3 project row mx-0 p-4">
                    <div style="cursor:pointer;" onclick="location.href='project.html?id=${id}'" class="col-12 col-lg-5 px-0 project-image">
                        <img src="${image_link}${wallpaper}" alt="">
                    </div>
                    <div class="col-12 col-lg-7 px-lg-3 px-0 project-details">
                        <div class="col-12 title-removefrom row mx-0 scroller" style="cursor:pointer;">
                            <h5 class="that-blue bold px-0 col-12 mt-2 hover-fly" onclick="location.href='project.html?id=${id}'">
                            ${
                              project_description
                                ? project_description
                                : "Not Specified"
                            }
                            </h5>
                        </div>
                        <div class="col-12 row pt-1 contractor-name">
                            <h6 style="font-weight: bold;" class="col-6">
                            Contrator: ${
                              contractor ? contractor : "Not Specified"
                            }
                            </h6>
                            <h6 style="font-weight: bold;" class="col-6">
                            Project Type: ${project_type}
                          </h6>
                        </div>
                        <div class="col-12 activity-status">
                            <span style="font-weight: bold;">Activity Status: </span>
                            <span style="font-weight: bold; border-radius: 3px;" class="status-designed p-1">${status}</span>
                        </div>
                        <div class="col-12 full-desc mt-2">
                            <p class="grey scroller"> ${
                              project_description
                                ? `${project_description}!`
                                : "Not Specified"
                            }</p>
                        </div>
                        <div class="col-12 project-stats row mx-0">
                            <div class="col-12 col-md-6 px-0">
                                <p style="font-weight: bold;" class=" grey mb-1">Project ID: <span class="stat-value">${unique_id}</span></p>
                            </div>
                            <div class="col-12 col-md-6 px-0">
                                <p style="font-weight: bold;" class="grey mb-1">Total Budget: <span class="stat-value">&#8358; ${Number(
                                  budget_cost
                                ).toLocaleString()}</span></p>
                            </div>
                            <div class="col-12 col-md-6 px-0">
                                <p style="font-weight: bold;"  class="grey mb-1">Start Date: <span class="stat-value">${start_date}</span></p>
                            </div>
                            <div class="col-12 col-md-6 px-0">
                                <p style="font-weight: bold;"  class="grey mb-1">End Date: <span class="stat-value">${end_date}</span></p>
                            </div>
                            <div class="col-12 col-md-6 px-0">
                                <p style="font-weight: bold;" class="grey mb-1">Community/LGA: <span class="stat-value">${location}/${LGA}</span></p>
                            </div>
                            <div class="col-12 col-md-6 px-0">
                                <p style="font-weight: bold;" class="grey mb-1">State: <span class="stat-value">${state}</span></p>
                            </div>
                        </div>
                    <div class="col-12 thumbs-comments row mx-0 mt-3">
                        <div class="col-3 px-0">
                          <span class="grey"><i class="fa fas fa-lg fa-comments mr-2"></i>
                            <span>${comments_count}</span>
                          </span>
                        </div>
                        <div class="col-3 px-0 dropup">
                          <span id="shareSpan" class="grey shareSpan" style="cursor:pointer;" data-project-id="${id}" data-project-type="${project_type}" data-project-desc="${project_description}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i title="Share this project" class="fa fas fa-lg fa-share-alt"></i>
                           <span>Share</span>
                          </span>
                          <div class="dropdown-menu col-12 px-0">
                            <div class="col-12 share-to">
                              <div class="fb-share-button" data-href="https://developnd.ng/project/project.html?id=${id}" data-layout="box_count" data-size="small">
                                <a target="_blank" style="color: none;"
                                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopnd.ng%2Fproject%2Fproject.html%3Fid%3D${id}&amp;src=sdkpreparse" 
                                  class="mr-2">
                                  <img src="../../images/facebook.png" style="width: 30px; height:30px;" alt="facebook share">
                                </a>
                                <a target="_blank" href="https://twitter.com/intent/tweet?text=Come%20check%20out%20this%20project%20and%20more%20going%20on%20near%20you%20and%20around%20Niger%20Delta%20on%20DevelopND.
                                %20https://developnd.ng/project/project.html?id=${id}&hashtags=developnd,nigerdelta" class="twitter-share-button"
                                 data-text="Come check out this project and more going on near you and around Niger Delta on DevelopND"
                                data-url="https://developnd.ng/project/project.html?id=${id}"
                                data-hashtags="developnd nigerdelta" data-show-count="false"><img src="../../images/twitter.png" style="width: 30px; height:30px;" alt="twitter share"></a>
                                <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div class="col-3 px-0" style="cursor:pointer; font-size:12px;" data-save-project>
                      ${save_project}
                    </div>     
                    <div onclick="location.href='project.html?id=${id}'" class="col-3 ml-auto px-0" style="cursor:pointer;">
                        <span class="grey">
                        <i class="fa fas fa-eye fa-sm grey" title="Total project views by users" style="cursor: pointer;"></i>
                          <span>${views} views</span>
                        </span>
                    </div>
                            <div class="col-8 px-0 text-left">
                                <p class="total-budget grey bold">
                                    <span style="font-size: 12px; font-weight: bold; color: orange;">${average_rating}</span>
                                    <span class="fa fa-star rating${id}"></span>
                                    <span class="fa fa-star rating${id}"></span>
                                    <span class="fa fa-star rating${id}"></span>
                                    <span class="fa fa-star rating${id}"></span>
                                    <span class="fa fa-star rating${id}"></span>
                                    <span style="color: #0b273d; font-size: 12px;">
                                     <i class="fa fa-user" style="color: #0b273d;"></i> (${total_raters} ratings) 
                                    </span>
                                </p>    
                            </div>
                             <div onclick="location.href='project.html?id=${id}'" class="col-4 ml-auto px-0 text-right"
                              style="cursor:pointer; font-size:20px;">
                                <span class="view-project-style">View Project</span>
                              </div>
                        </div>
                    </div>
                </div>
              </div>`;

        // <div onclick="location.href='project.html?id=${id}'"
        //                 class="col-4 ml-auto px-0 text-right" style="cursor:pointer; font-size:20px;">
        //                   <span class="view-project-style">View Project</span>
        //               </div>
        const saveProject = Array.from(
          document.querySelectorAll(`.saveProject`)
        );

        // console.log(saveProject);
        saveProject.map(x => {
          x.addEventListener("click", event => {
            saveProjectFunc(event, x);
          });
        });
        let shareSpanBtns = Array.from(document.querySelectorAll(".shareSpan"));

        // shareSpanBtns.map(shareSpanBtn => {
        //   //console.log(shareSpanBtns);
        //   shareSpanBtn.addEventListener("click", event =>
        //     getMeta(event, shareSpanBtn)
        //   );
        // });

        //This shows the rating and should be done inside the loop
        const ratings = Array.from(document.querySelectorAll(`.rating${id}`));
        // console.log(ratings, `rating${id}`);

        if (Number(average_rating) != 0) {
          let formated_average_rating = average_rating - 1;
          ratings.map((x, i) => {

            if (i <= Number(formated_average_rating)) {
              x.classList.add("checked");
            }
          });
        }
      }
    });
  } else {
    projectDOM.innerHTML = `<h3 class="mt-5" style="color: grey; text-align:center;">No Search result was found!<h3>`;
    
  }
};
fetchProjects(
  query,
  (filterState = null),
  (filterStatus = null),
  (filterProjectSector = null),
  (filterProjectLga = null),
  (filterProjectCommunity = null),
  next,
  prev,
  chosenPage
);

const customFilter = (event, x, i) => {
  if (i <= 8) {
    if (x.checked == true) {
      filterState += `,${x.value}`;
      //Show the lga and community dropdown

      //document.querySelector(`#state-lga-comm${i}`).style.display = "inline-flex";
      const checkId = stateIdTracker.indexOf(i);
      activeState = document.querySelector(`.data-lga${i}`);
      if (checkId == -1) {
        stateIdTracker.push(i);
        //Pass he value to know the lga abd community fetching out
    
        activeState.innerHTML = `<div class="mx-3 lga-spinner spinner-border spinner-border-sm" role="status">
        <span class="sr-only">Loading...</span>
        </div>`; 

        //Disable all checboxes untill after response is successfully
        const clientSearch = Array.from(document.querySelectorAll('.client-search'));
        clientSearch.map(x => {
          x.disabled = true;
        });

        fetchLgaRoute(x.value, i);
        nodeChecked = x;  
        collapseState(activeState, panelKey, x);
        x.parentNode.classList.replace('mb-3', 'mb-1');       
      }
      else {
        nodeChecked = null;
        collapseState(activeState, 1, x);
        x.parentNode.classList.replace('mb-3', 'mb-1'); 
      }
      
    } else {
      filterState = filterState.replace(`,${x.value}`, "");

      //Uncheck the lga and comunity checkboxes
      const lgaCheckBoxDOM =  document.getElementsByClassName(`lga-search${i}`) || false;
      const commCheckBoxDOM = document.getElementsByClassName(`comm-search${i}`) || false;

      //Hide the lga and community dropdown
      collapseState(document.querySelector(`.data-lga${i}`), null, x);
      x.parentNode.classList.replace('mb-1', 'mb-3');
      nodeChecked = null;

      //Uncheck the LGA checkboxes
      lgaCheckBoxDOM.length > 0 ? uncheckLGAFunc(lgaCheckBoxDOM) : null;
      //Uncheck the Community checkboxes
      commCheckBoxDOM.length > 0 ? uncheckComunityFunc(commCheckBoxDOM) : null;


    }
  } else if (i > 8 && i <= 13) {
    if (x.checked == true) {
      filterStatus += `,${x.value}`;
    } else {
      filterStatus = filterStatus.replace(`,${x.value}`, "");
    
    }
  }

  projectResults = [];
  fetchProjects(query, filterState, filterStatus, filterProjectSector, filterProjectLga, filterProjectCommunity, next, prev, chosenPage);

}

customFilterBoxs.map((x, i) => {
  x.addEventListener("change", event => customFilter(event, x, i));
});

showNextPage = () => {
  next = localStorage.getItem("next");

  fetchProjects(
    query,
    filterState,
    filterStatus,
    filterProjectSector,
    filterProjectLga,
    filterProjectCommunity,
    next,
    prev,
    chosenPage
  );
  next = null;
  prev = null;
  showPagList();
};

showPrevPage = () => {
  prev = localStorage.getItem("prev");
  
  fetchProjects(
    query,
    filterState,
    filterStatus,
    filterProjectSector,
    filterProjectLga,
    filterProjectCommunity,
    next,
    prev,
    chosenPage
  );
  next = null;
  prev = null;
  showPagList();
};

showPagList = () => {
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
    if (localStorage.getItem("currentPageNum") === 1) {
      firstPageButton.style.display = "none";
      prevPageButton.style.display = "none";
    } else if (localStorage.getItem("currentPageNum") == lastPage) {
      nextPageButton.style.display = "none";
      lastPageButton.style.display = "none";
    }
    currentPage = currentPage + 1;
    if (currentPage > lastPage) {
      console.log("greater");
      return;
    }
  }
  let pageNavs = Array.from(document.querySelectorAll(".page-nav"));

  pageNavs.map(x => {
    x.addEventListener("click", event => seekPage(event, x, pageNavs));
  });
};

seekPage = (event, x, pageNavs) => {
  chosenPageNum = x.dataset.pageNav;
  chosenPage = localStorage.getItem("path") + `?page=${chosenPageNum}`;

  fetchProjects(query, filterState, filterStatus, filterProjectSector, filterProjectLga, filterProjectCommunity, next, prev, chosenPage);
  chosenPage = "";
  showPagList();
};

showFirstPage = () => {
  firstPage = localStorage.getItem("firstPage");
  fetchProjects(query, filterState, filterStatus, filterProjectSector, filterProjectLga, 
                filterProjectCommunity, next, prev, chosenPage, firstPage, lastPage);
  firstPage = null;
  showPagList();
};
showLastPage = () => {
  lastPage = localStorage.getItem("lastPage");
  fetchProjects(query, next, prev, chosenPage, firstPage, lastPage);
  lastPage = null;
  showPagList();
};

fetchFilterNumbers = () => {
  const routes = new Routes();
  let url = `${routes.apiOrigin}${routes.fetchFilterNumbers}`;


  fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json",
      Authorization: certified ? certified : null
    }
  })
    .then(response => response.json())
    .then(result => {
      document.querySelector("[data-abia-count]").textContent =
        result.result[0].ABIA;
      document.querySelector("[data-rivers-count]").textContent =
        result.result[1].RIVERS;
      document.querySelector("[data-akwa-ibom-count]").textContent =
        result.result[2].AKWA_IBOM;
      document.querySelector("[data-imo-count]").textContent =
        result.result[3].IMO;
      document.querySelector("[data-ondo-count]").textContent =
        result.result[4].ONDO;
      document.querySelector("[data-cross-river-count]").textContent =
        result.result[5].CROSS_RIVER;
      document.querySelector("[data-bayelsa-count]").textContent =
        result.result[6].BAYELSA;
      document.querySelector("[data-delta-count]").textContent =
        result.result[7].DELTA;
      document.querySelector("[data-edo-count]").textContent =
        result.result[8].EDO;

      document.querySelector("[data-progress-count]").textContent =
        result.result[9].in_progress;
      document.querySelector("[data-completed-count]").textContent =
        result.result[9].completed;
      document.querySelector("[data-not-started-count]").textContent =
        result.result[9].not_started;
      document.querySelector("[data-abandoned-count]").textContent =
        result.result[9].abandoned;
      document.querySelector("[data-due-to-start-count]").textContent =
        result.result[9].due_to_start;
    })
    .catch(err => {
      console.log(err);
    });
};

// collapsing panel state
const collapseState = (node, key, isChecked) => {
  let father = node.parentNode;
  if (node.style.maxHeight && key == null) {      
    node.style.maxHeight = null;
  } else if(key != null && isChecked.checked == true) {      
    node.style.maxHeight = node.scrollHeight + "px";
    father.style.maxHeight = father.scrollHeight + node.scrollHeight + "px";
  }
};

//Left side collapse panel
(() => {
  const qs = element => {
    return document.querySelector(element);
  };
  const qsAll = element => {
    return document.querySelectorAll(element);
  };

  // For state
  const collapsePanel = e => {
    let panel = e.target.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      e.target.children[0].textContent = "+";
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      e.target.children[0].textContent = "-";
    }
  };


  qs(".side-bar").addEventListener("click", e => {
    if (e.target.nodeName === "BUTTON") {
      collapsePanel(e);
    }
  });

  // Keep the panel active on page load
  const activatePanel = () => {
    qsAll(".panel-btn").forEach(x => {
      x.click();
    });
  };

  if (window.innerWidth > 900) {
    activatePanel();
  }
})();

//Uncheck the LGA checkboxes when the state toogle is been closed
const uncheckLGAFunc = (lgaCheckBoxDOM) => {

  Array.from(lgaCheckBoxDOM).map(x => {
 
    //Find the value lga from the filter variable
    if(filterProjectLga){
      if(filterProjectLga.includes(x.value)){
        filterProjectLga = filterProjectLga.replace(`,${x.value}`, "");
        x.checked = false;
      }
    }

  });

}
//Uncheck the Community checkboxes when the state toogle is been closed
const uncheckComunityFunc = (commCheckBoxDOM) => {
 
  Array.from(commCheckBoxDOM).map(x => {

    //Find the value lga from the filter variable
    if(filterProjectCommunity){
      if(filterProjectCommunity.includes(x.value)){
        filterProjectCommunity = filterProjectCommunity.replace(`,${x.value}`, "");
        x.checked = false;
      }
    }
  });
}
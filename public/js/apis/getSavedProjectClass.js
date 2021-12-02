
let checkUserInfo
if(localStorage.getItem("DevelopND-user")) {
    checkUserInfo = JSON.parse(localStorage.getItem("DevelopND-user"));
}
let {user} = checkUserInfo;
let {user_type} = user;
const savedProjectDOM = document.querySelector('[data-saved-project]');
let nextBtn = null;
let like_count = 0;
let unlike_count = 0;

const savedProjectCount = document.querySelector('#savedProjectCount');

class getSavedProjectClass {
    constructor(){
        //Get the url
        this.url = null;

        //Get the Dom
        this.savedProjectDOM = savedProjectDOM;

        //Saved project Array Store
        this.savedProjectArray = [];

        //get the user type
        this.user_type = user_type;

        //image_link url
        this.image_link;
    }

    get routes(){
        return new Routes();
    }

    get token() {
        return JSON.parse(localStorage.getItem('token'));
    }
    get storagefetch() {
        return JSON.parse(localStorage.getItem('savedProject'));
    }

    apiCall() {
        this.url = `${this.routes.apiOrigin}${this.routes.getSavedProjects}`;
        console.log(this.token)
        fetch(this.url, {
              method: "GET",
              mode: "cors",
              headers: {
                  "Accept": "application/json",
                  "Authorization": this.token
                  },
              })
        .then(response => response.json())
        .then(data => {
            //use this method to split data 
            this.dataSetter(data);
        })
        .catch(err => {
            console.error(err);
        })
    }

    dataSetter(data) {        
        //Store image link globally
        this.image_link = data.image_link;
        //Insert into the localStorage for first request  
         if(this.storagefetch && nextBtn != null){
            console.log(this.storagefetch);
           // push to array to append with existing result
         }else {
            localStorage.setItem('savedProject', JSON.stringify(data.result.data));
             //Get from the localStorage and fill the array
             this.savedProjectArray.push(...this.storagefetch);
         }
         localStorage.setItem('savedProjectCount', data.count);

        //Store the next page into a variable
        nextBtn = data.result.next_page_url;
        //Declare the data loop method
        this.dataGetter()
    }

    dataGetter() {
        //Loop through to insert into the DOM
        this.savedProjectDOM.innerHTML = '';

        $('[data-save-count-spinner]').hide();
        savedProjectCount.innerHTML = Number(localStorage.getItem('savedProjectCount'));
    
        this.savedProjectArray.forEach(element => {
            console.log(element);
            //Declare the DOM Insert
            this.DOMinsert(element, element.project);
            
        });
        
        //Show the search input tab for the user to search a project if he has not saved any project
        if(this.savedProjectArray.length == 0 && this.user_type !== 'reviewer'){
            this.savedProjectDOM.innerHTML = `<p style="text-align: center; font-weight:bold;">No Saved Project Found</p>
                        <div class="special-input mb-3 mt-5 col-12 col-md-8 mx-auto row mx-0" 
                        style="border-bottom:2px solid #0b273d; background:inherit;">
                            <input id="search_value" style="border-radius: 0px; background:inherit;" type="text" class="form-control col-12 col-md-9 mt-2"
                            placeholder="Search projects e.g. location, sector, organization or keyword" autofocus>
                            <button class="btn btn-brand col-12 col-md-3 my-2 px-0" id="project_search">Search</button>
                        </div>
                        `;
         //Permit searching for a project and redirecting
         this.searchRequest();
        }
    }

    DOMinsert(
                {id, project_id, user_id, status: savedStatus}, 

                {project_type, location, LGA, state, project_description, 
                wallpaper, budget_cost, contractor, status, start_date, due_date,
                comments_count, average_rating, views, unique_id, total_raters,}
             ){
        
        //Insert the count to the DOM

        //get from localStorage and loop into the DOM
        this.savedProjectDOM.innerHTML +=`
                   <div class="col-12 col-md-12 my-3 project row mx-0 p-4" id="savedProjectBlock${id}">
                        <div class="col-12 col-lg-5 px-0 project-image">
                            <img src="${this.image_link}${wallpaper}" alt="">
                        </div>
                        <div class="col-12 col-lg-7 px-lg-3 px-0 project-details">
                            <div class="col-12 title-removefrom row mx-0 scroller" style="cursor:pointer;">
                                <h5 class="that-blue bold px-0 col-12 mt-2 hover-fly" onclick="location.href='../../project/project.html?id=${project_id}'">
                                ${ project_description ? project_description : "Not Specified"}</h5>
                            </div>
                            <div class="col-12 row pt-1 contractor-name">
                                <h6 style="font-weight: bold;" class="col-6">
                                Contrator: ${ contractor ? contractor : "Not Specified"}
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
                                <p class="grey scroller"> ${ project_description ? `${project_description}!` : "Not Specified"}</p>
                            </div>
                            <div class="col-12 project-stats row mx-0">
                                <div class="col-12 col-md-6 px-0">
                                    <p style="font-weight: bold;" class=" grey mb-1">Project ID: <span class="stat-value">${unique_id}</span></p>
                                </div>
                                
                                <div class="col-12 col-md-6 px-0">
                                <p style="font-weight: bold;" class="grey mb-1">Total Budget: <span class="stat-value">&#8358; ${Number(budget_cost).toLocaleString()}</span></p>
                                </div>
                                <div class="col-12 col-md-6 px-0">
                                    <p style="font-weight: bold;"  class="grey mb-1">Start Date: <span class="stat-value">${start_date}</span></p>
                                </div>
                                <div class="col-12 col-md-6 px-0">
                                    <p style="font-weight: bold;"  class="grey mb-1">Due Date: <span class="stat-value">${due_date}</span></p>
                                </div>
                                <div class="col-12 col-md-6 px-0">
                                    <p style="font-weight: bold;" class="grey mb-1">Location/LGA: <span class="stat-value">${location}/${LGA}</span></p>
                                </div>
                                <div class="col-12 col-md-6 px-0">
                                    <p style="font-weight: bold;" class="grey mb-1">State: <span class="stat-value">${state}</span></p>
                                </div>
                            </div>
                            <div class="col-12 thumbs-comments row mx-0 mt-3">
                                <div class="col-7 px-0 text-left">
                                    <p class="total-budget grey bold">
                                        <span class="fa fa-star rating${project_id}"></span>
                                        <span class="fa fa-star rating${project_id}"></span>
                                        <span class="fa fa-star rating${project_id}"></span>
                                        <span class="fa fa-star rating${project_id}"></span>
                                        <span class="fa fa-star rating${project_id}"></span>
                                        <span style="font-size: 12px; font-weight: bold; color: #0b273d;">${average_rating}</span>
                                        <span style="color: #0b273d; font-size: 12px;">
                                        | <i class="fa fa-user" style="color: #0b273d;"></i> (${total_raters})
                                        </span>
                                    </p>    
                                </div>
                                <div class="col-3 px-0 text-center">
                                    <span class="grey"><i class="fa fas fa-lg fa-comments mr-2"></i><span>${comments_count}<span></span>
                                </div>
                                <div class="col-2 px-0 text-center dropup">
                                    <span id="shareSpan" class="grey shareSpan" style="cursor:pointer;" data-project-id="${project_id}" data-project-type="${project_type}" data-project-desc="${project_description}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i title="share this project" class="fa fas fa-lg fa-share"></i></span>
                                    <div class="dropdown-menu col-12 px-0">
                                    <div class="col-12 share-to">
                                    <div class="fb-share-button" data-href="https://hackanthon-258716.firebaseapp.com/project/project.html?id=${project_id}" data-layout="box_count" data-size="small">
                                        <a target="_blank" style="color: none;"
                                        href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fhackanthon-258716.firebaseapp.com%2Fproject%2Fproject.html%3Fid%3D${project_id}&amp;src=sdkpreparse" 
                                        class="mr-2">
                                        <img src="../../images/facebook.png" style="width: 30px; height:30px;" alt="facebook share">
                                        </a>
                                        <a target="_blank" href="https://twitter.com/intent/tweet?text=Come%20check%20out%20this%20project%20and%20more%20going%20on%20near%20you%20and%20around%20Niger%20Delta%20on%20DevelopND.
                                        %20https://hackanthon-258716.firebaseapp.com/project/project.html?id=${project_id}&hashtags=ptracker,nigerdelta" class="twitter-share-button"
                                        data-text="Come check out this project and more going on near you and around Niger Delta on DevelopND"
                                        data-url="https://hackanthon-258716.firebaseapp.com/project/project.html?id=${project_id}"
                                        data-hashtags="ptracker nigerdelta" data-show-count="false"><img src="../../images/twitter.png" style="width: 30px; height:30px;" alt="twitter share"></a>
                                        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                                    
                                    </div>
                                    </div>
                                    </div>
                                </div>
                                <span class="grey font-10px unSaveProject text-center px-0" data-id="${id}" style="color: red; cursor:pointer;" id="unSaveProject${project_id}">
                                    Unsave
                                </span>
                            </div>
                            <div class="col-12" style="cursor:pointer; font-size:20px;">
                                <i class="fa fas fa-eye ml-2 mt-2 fa-xs" title="Total proect views by users"
                                style="cursor: pointer; color: #0b273d; right: 0; bottom: -10px; position: absolute;">
                                ${views} views
                                </i>
                            </div>
                        </div>
                    </div>`;
         //Run additional manipulation code on the DOM
         this.manipulateDOM(project_id, average_rating);
    }
    manipulateDOM(project_id, average_rating) {
            //This shows the rating and should be done inside the loop
            const ratings = Array.from(document.querySelectorAll(`.rating${project_id}`));
            console.log(ratings);
           
            if(Number(average_rating) != 0){
              let formated_average_rating = average_rating - 1;
              ratings.map((x, i) => {
                console.log(x, formated_average_rating)
  
                if(i <= Number(formated_average_rating)){
                  x.classList.add('checked');
                }
              });
            }

        const UnSaveProject = Array.from(document.querySelectorAll(`.unSaveProject`));
        
        // console.log(saveProject);
        UnSaveProject.map((x, i) => {
            x.addEventListener("click", event => {
                console.log(event, x, i);
                this.unSavedProject(event, x, i);
        });
        });
    }
    unSavedProject(event, x, i){
        const savedProjectId = x.dataset.id;
        x.innerHTML = ` <span class="spinner-border spinner-border-sm mx-0" style="color: red;" data-save-count-spinner role="status"></span>`;
       

        //Hit the api to unsave project 
        this.url = `${this.routes.apiOrigin}${this.routes.deleteSavedProject(savedProjectId)}`;
        const projectBlock = document.querySelector(`#savedProjectBlock${savedProjectId}`);

        fetch(this.url, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "Authorization": this.token
            },
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(Number(localStorage.getItem('savedProjectCount')));
            projectBlock.style.display = 'none';
            savedProjectCount.innerHTML = Number(localStorage.getItem('savedProjectCount')) - 1;

            localStorage.setItem('savedProjectCount', Number(localStorage.getItem('savedProjectCount')) - 1)

            //Notify the user in the info spot
            const infoSPot = document.querySelector('[data-info-modal]');
            infoSPot.innerHTML = 'A Project has been unsaved successfully!';

            if(savedProjectCount.innerHTML == '0'){
                this.savedProjectDOM.innerHTML = `<p style="text-align: center; font-weight:bold;">No Saved Project Found</p>
                <div class="special-input mb-3 mt-5 col-12 col-md-8 mx-auto row mx-0" 
                style="border-bottom:2px solid #0b273d; background:inherit;">
                    <input id="search_value" style="border-radius: 0px; background:inherit;" type="text" class="form-control col-12 col-md-9 mt-2"
                    placeholder="Search projects e.g. location, sector, organization or keyword" autofocus>
                    <button class="btn btn-brand col-12 col-md-3 mt-2 px-0" id="project_search">Search</button>
                </div>
                `;
            }
            //Permit searching for a project and redirecting
            this.searchRequest();

            $('#notifyModal').modal('toggle')
            console.log(data)

            setTimeout(() => {
                $('#notifyModal').modal('toggle')
            }, 3000)
        })
        .catch(err => {
            console.log(err);
        })
    }
    searchRequest(){
        const searchBtn = document.querySelector('#project_search');
        const searchInput = document.querySelector('#search_value');

        const redirectSearch = (event, searchBtn) => {
            const query = document.querySelector('#search_value').value;
            localStorage.setItem('action', 0);
            location.replace(`${window.location.origin}/project/search-results.html?query=${query}`);
        }

        searchBtn.addEventListener('click', (event) => redirectSearch(event, searchBtn));
        // This is for Enter key
        searchInput.addEventListener('keyup', (e) => {
            if(e.keyCode === 13 & e.target.value !== "") {
                redirectSearch();
            }
        });
    }
}

//Instantiate the class 
const  trigger = new  getSavedProjectClass();

trigger.apiCall();
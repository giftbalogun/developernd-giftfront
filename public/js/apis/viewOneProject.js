const parsedUrl = new URL(window.location.href);
const getUrlParam = parsedUrl.searchParams;
let track_project_id = null;
let nameSplit;

let query;
query = getUrlParam.get("id");
localStorage.setItem('projectId', query);


const projectTopic = document.querySelector("[data-project-topic]");
const projectContractor = document.querySelector("[data-project-contractor]");
const projectViews = document.querySelector('[data-project-views]');
const projectLastUpdated = document.querySelector("[data-project-last-update]");
const projectBudget = document.querySelector("[data-project-budget]");
const projectId = document.querySelector("[data-project-id]");
const projectStartDate = document.querySelector("[data-project-start-date]");
const projectStartDate2 = document.querySelector("[data-project-start-date-2]");
const projectDueDate = document.querySelector("[data-project-due-date]");
const projectDueDate2 = document.querySelector("[data-project-due-date-2]");
const projectDesc = document.querySelector("[data-project-view-desc]");
const projectLocation = document.querySelector("[data-project-location]");
const projectMap = document.querySelector("[data-project-map]");
const projectWallpaper = document.querySelector('[data-project-wallpaper]');
const projectComment = document.querySelector("[data-project-comment]");
const projectType = document.querySelector("[data-project-type]");
const projectStatus = document.querySelector("[data-project-status]");
const googleMap = document.querySelector("[data-project-location-map]");
const projectCommentBtn = document.querySelector("[data-project-comment-btn]");
const saveProjectBox = document.querySelector('[data-save-project]')
const saveProjectIcon = document.querySelector('#saveProject')
const loader = document.querySelector("[data-loader]");
const shareDropdownMenu = document.querySelector('#share-dropdown-menu');
//This shows the rating and should be done inside the loop
const ratingViewsOne = Array.from(document.querySelectorAll(`.rating-views-one`));    
const totalRaterDom = document.querySelector('[data-total-raters]');
const averageRating = Array.from(document.querySelectorAll('.average-rating'));
const projectAllocation = document.querySelector('[data-project-allocations]');
// Show Status Remark or Status Voting
const abandoned  = document.querySelector('#Abandoned');
const completed = document.querySelector('#Completed');
const notStarted = document.querySelector('#Not_Started');
const inProgress = document.querySelector('#In_Progress');

const viewOneProject = () => {
  const routes = new Routes();
  const url = `${routes.apiOrigin}${routes.viewOneProject(query)}`;

  //Hide some feautures from the unauthorize user
  const userLocalStore = JSON.parse(localStorage.getItem("DevelopND-user"));

  if (!userLocalStore) {
    //Hide the user show box
    document.querySelector("[data-user-drop-box]").style.display = "none";
    document.querySelector("[data-save-project]").style.display = "none";
  } else {
    const { user, image_link } = userLocalStore;
   
    const { image, name, email, user_mode, image_type, user_type } = user;
  

    if(image_type == 'DevelopND') {
      document.querySelector("[data-user-image]").src = `${image_link}${image}`;
      document.querySelector("[data-user-image-comment]").src = `${image_link}${image}`;
    }else {
      document.querySelector("[data-user-image]").src = `${image}`;
      document.querySelector("[data-user-image-comment]").src = `${image}`;
    }

    
   if(name){
      nameSplit = name.split(' ');
      if(nameSplit[1]){
        nameSplit = `${nameSplit[0].charAt(0).toUpperCase()} ${nameSplit[1].charAt(0).toUpperCase()}`;
      }else {
        nameSplit = `${nameSplit[0].charAt(0).toUpperCase()}`;
      }
    }
  
    if(user_type == 'admin'){
      name != null ? document.querySelector("[data-user-name]").textContent = nameSplit : document.querySelector("[data-user-name]").textContent = `Hello Admin`;
    }else {
      name != null ? document.querySelector("[data-user-name]").textContent = nameSplit : document.querySelector("[data-user-name]").textContent = `Hello Member`;
    }
    
  }
  console.log(url);
  fetch(url)
    .then(response => response.json())
    .then(data => {
     console.log(data.project)
      loader.style.display = "none";
      if (data) {
        console.log(data);
        const {
          id,
          contractor,
          budget_cost,
          commitment,
          unique_id,
          LGA,
          location,
          project_description,
          state,
          project_type,
          status,
          wallpaper,
          comments_count,
          average_rating,
          total_raters,
          views,
          allocated_amounts,
          allocated_years,
          start_date,
          end_date,
          created_at,
          projectsaves,
          updated_at,
          status_remark,
        } = data.project;

        // Hide comment container when project status is "Not-started"    
        if(status === 'Not-Started') {            
            document.querySelector('.not-started-project').classList.remove('d-none');
        }
        else {
          document.querySelector('.comments-section').classList.remove('d-none');
        }

        //Store Project Id globally 
        track_project_id = id;
        console.log(data.project)
        console.log(abandoned)
        // // Show Status Remark or Status Voting

       // status_remark ? abandoned.textContent = status_remark.Abandoned :  abandoned.textContent = 0;
        status_remark ? completed.textContent = status_remark.Completed  : completed.textContent = 0;
        status_remark ? notStarted.textContent = status_remark.Not_Started : notStarted.textContent = 0;;
        status_remark ? inProgress.textContent = status_remark.In_Progress : inProgress.textContent = 0;;

        //Show Rating Count

          if(Number(average_rating) != 0){
            let formated_average_rating = average_rating - 1;
  
            ratingViewsOne.map((x, i) => {
              if(i <= Number(formated_average_rating)){
                x.classList.add('checked');
              }
            });
          }
        //Show Total raters
        totalRaterDom.textContent = ` (${total_raters} ratings)`;
        //Show Average rating
        averageRating[0].textContent = average_rating;
        //google map
        googleMap.src = src = `https://maps.google.com/maps?q=${location}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
        projectTopic.textContent = project_description;
        projectContractor.textContent = contractor ? `Contractor: ${contractor}` : "Contractor: Not Specified";
        projectType.textContent = project_type;
        projectStartDate.textContent = start_date;
        projectDueDate.textContent = end_date;
        projectStartDate2.textContent = start_date;
        projectDueDate2.textContent = end_date;
        projectBudget.innerHTML = `&#8358; ${Number(budget_cost).toLocaleString()}`;
        projectLastUpdated.textContent = updated_at;
        projectId.textContent = `${unique_id}`;
        projectViews.textContent = `${views} views`;

        let status_format = null;

        if(status == 'In-Progress'){
          status_format = `<span style="color: #54d0ed;">${status}</sapn>`
        }else if (status == 'Completed'){
          status_format = `<span style="color: green;">${status}</sapn>`
        }else if (status == 'Abandoned'){
          status_format = `<span style="color: red;">${status}</sapn>`
        }else if (status == 'Not-Started'){
          status_format = `<span style="color: cadetblue;">${status}</sapn>`
        }else{
          status_format = `<span style="color: orange;">${status}</sapn>`
        }
        projectStatus.innerHTML = status_format;
        // projectStartDate.textContent = start_date;
        projectDesc.textContent = project_description;
        projectLocation.textContent = `${location} / ${LGA} / ${state}`;
        // projectCreated_2.textContent = start_date;
        projectComment.textContent = comments_count;
        projectWallpaper.src = `${data.image_link}${wallpaper}`;

        //Insert the allocated amount and years
        let allocated_years_format = allocated_years.split('|');
        let allocated_amounts_format = allocated_amounts.split('|');

        console.log(allocated_amounts_format, allocated_years_format)
        allocated_years_format.map((allocated_year, i) => {
          projectAllocation.innerHTML += `
              <div class="budget-data row col-12 px-2" data-allocated-data>
                  <span class="grey col-6" style="padding: 10px;">${allocated_year}</span>
                  <span class="grey col-6" style="padding: 10px;">&#8358; ${allocated_amounts_format[i]}</span>
              </div>`
        });


        shareDropdownMenu.innerHTML = `
        <div class="col-12 share-to">
          <div class="fb-share-button"
              data-href="https://developnd.ng/project/project.html?id=${id}"
              data-layout="box_count" data-size="small">
              <a target="_blank" style="color: none;"
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopnd.ng%2Fproject%2Fproject.html%3Fid%3D${id}&amp;src=sdkpreparse"
                  class="mr-2">
                  <img src="../../images/facebook.png"
                      style="width: 20px; height:20px;" alt="facebook share">
              </a>
              <a href="https://twitter.com/intent/tweet?text=Come%20check%20out%20this%20project%20and%20more%20going%20on%20near%20you%20and%20around%20Niger%20Delta%20on%20DevelopND.
              %20https://developnd.ng/project/project.html?id=${id}&hashtags=developnd,nigerdelta" class="twitter-share-button"
                                     data-text="Come check out this project and more going on near you and around Niger Delta on DevelopND"
                                    data-url="https://developnd.ng/project/project.html?id=${id}"
                                    data-hashtags="developnd nigerdelta" data-show-count="false"><img src="../../images/twitter.png" style="width: 20px; height:20px;" alt="twitter share"></a>
                                    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
            </div>
          </div>
        `
        if(projectsaves.length > 0){
          saveProjectBox.innerHTML = `<img src="../../images/good_check.png" style="width:20px; height: 20px;" alt="saved"></img>`;
        }
        //save Project Manipulation
        saveProjectIcon.addEventListener('click', (event) => saveProjectFunc(event, saveProjectBox, proect_id=id));
      }
    })
    .catch(err => {
      console.log(err);
    });
};

const commentProject = () => {};
viewOneProject();
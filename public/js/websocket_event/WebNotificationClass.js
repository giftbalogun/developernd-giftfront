class WebNotificationClass {

    constructor(routes, data){
        //Get the url
        this.url = null;
        this.data = data;
        //Notification DOM
        this.DOM = document.querySelector('[data-notification-DOM]');

        //Real Tme Notiifcation Count
        this.realTotalCount;

        this.realTimeCountDOM = document.querySelector('[data-real-time-count]');

    }

    get routes(){
        return new Routes();
    }

    get token() {
        return JSON.parse(localStorage.getItem('token'));
    }
    //this restrict auth user only event from firing out to other user
    checkEventAuth(to, from){
        let login_user = JSON.parse(localStorage.getItem('DevelopND-user'));
        if(Number(login_user.user.id) === to && Number(login_user.user.id) === from){
            return true;
        } 
    }

    get typeFilter(){
        return [
            'App\\Notifications\\ProjectNotification',
            "App\\Notifications\\AdminMessageNotification",
        ]
    }

    get typeEvent(){
        return [
            "project-notify",
            "message-notify",
        ]
    }

    storeRealTimeCount(){
        if(localStorage.getItem('realtime-notifcation-count')){
            localStorage.setItem('realtime-notifcation-count', Number(localStorage.getItem('realtime-notifcation-count')) + 1);
        }else {
            localStorage.setItem('realtime-notifcation-count', 1);
        }
    }

    realTimeEvent(type, data){
        this.realTimeCountDOM.classList.remove('animated', 'flash');
        switch(type) {
            case this.typeEvent[0]://App\Notifications\ProjectNotification
               //Store into LocalStorage to hold user session
               if( this.checkEventAuth(data.message.to, data.message.from)){
                this.storeRealTimeCount();
                let key = 'real'; 
                this.displayProjectNotification(key, data.message, data.message.time_ago, data.message.image_link) 
               }
              break;
            case this.typeEvent[1]:
              // code block
              break;
            default:
              // code block
        }
        
    }

    fetchAllNotifications(){
        //Hit the api to unsave project 
        this.url = `${this.routes.apiOrigin}${this.routes.getNotifications}`;

        fetch(this.url, {
            method: "GET",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "Authorization": this.token
            },
        })
        .then(resp => resp.json())
        .then(result => {
            this.loopNotification(result.image_link, result.notifications);
        })
        .catch(err => {
            console.log(err);
        })
    }

    loopNotification(image_link, notifications){
       
        this.DOM.innerHTML = '';
        console.log(notifications);
        
        notifications.map((x, i) => {
        
            const {type, data, time_ago} = x;

            switch(type) {
                case this.typeFilter[0]:
                  // code block
                  if( this.checkEventAuth(data.to, data.from)){
                    let key = 'not-real'; 
                    this.displayProjectNotification(key, data, time_ago, image_link);
                   }
                  break;
                case this.typeFilter[1]:
                  // code block
                  break;
                default:
                  // code block
            }
           
        })
    }

    displayProjectNotification(key, data, time_ago, image_link){
        const {message, wallpaper, project_id, project_description} = data;

       if(key == 'real'){
        this.realTimeCount();
        //Shoe real time count
        this.realTimeCountDOM.classList.add('animated', 'flash');
        $( "[data-notification-DOM]" ).prepend(`
        <a href="${window.location.origin}/project/project.html?id=${project_id}" style="color: #212529;">
            <div class="col-12 indiv-info row mx-0">
                <span class="badge" data-toggle="dropdown" style="font-size: 6px; padding:3px; z-index: 999; top:0px;">New</span>
                <div class="col-2 px-2 info-img-con">
                    <div class="info-img border mt-1">
                        <!-- <i class="fa fas fa-check ml-1"></i> -->
                        <img src="${image_link}${wallpaper}" alt="">
                    </div>
                </div>
                <div class="info-actual-con col-10">
                        <p  title="${message} with [Project title: ${project_description}]" class="info-words mb-0 mt-2" style="font-size: 10px; font-weight:normal; text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;">
                        <span style="font-weight:bold;">${message}</span> with [Project title:</span> ${project_description}]</p>
                
                    <span class="info-time mt-2">${time_ago}</span>
                </div>
            </div>
        </a>`);

       }else {
           const div = document.createElement('div');
           div.innerHTML = `
           <a href="${window.location.origin}/project/project.html?id=${project_id}" style="color: #212529;">
                <div class="col-12 indiv-info row mx-0">
                    <div class="col-2 px-2 info-img-con">
                        <div class="info-img border mt-1">
                            <!-- <i class="fa fas fa-check ml-1"></i> -->
                            <img src="${image_link}${wallpaper}" alt="">
                        </div>
                    </div>
                    <div class="info-actual-con col-10">
                            <p title="${message} with [Project title: ${project_description}]" class="info-words mb-0 mt-2" style="font-size: 10px; font-weight:normal; text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;">
                            <span style="font-weight:bold;">${message}</span> with [Project title:</span> ${project_description}]</p>
                        <span class="info-time mt-2">${time_ago}</span>
                    </div>
                </div>
            </a>`;
          this.DOM.appendChild(div);
            // this.DOM.innerHTML += `
            
            // `;
       }
    }

    realTimeCount(){
       if(localStorage.getItem('realtime-notifcation-count')){
           this.realTimeCountDOM.innerHTML = localStorage.getItem('realtime-notifcation-count');
       }
    }
}

if(localStorage.getItem('token')){
    $displayNotifcation = new WebNotificationClass(data = null);
    $displayNotifcation.fetchAllNotifications();
    $displayNotifcation.realTimeCount();
}

const markAsRead = () => {
    const realTimeCountDOM = document.querySelector('[data-real-time-count]');
    realTimeCountDOM.innerHTML = '';
    localStorage.removeItem('realtime-notifcation-count');
}

const notifyBtn = document.querySelector('#notificationsDropdown');
notifyBtn.addEventListener('click', event => markAsRead(event, notifyBtn));

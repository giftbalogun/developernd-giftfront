


class CommentNotificationClass{

     constructor(){

        //Get the DOM for the comment section
        this.DOM = document.querySelector('#view-comments');
    }

    get routes(){
        return new Routes();
    }

    get token() {
        return JSON.parse(localStorage.getItem('token'));
    }
    //this restrict auth user only event from firing out to other user
    get typeEvent(){
        return [
            "comment-notify",
            "comment-reply-notify"
        ]
    }

    realTimeEvent(type, data){
       
        switch(type) {
            case this.typeEvent[0]:

                if(Number(data.message.project_id) === track_project_id){
                    console.log(data.message);
                    const offlineDOM = document.querySelector(`[data-offline${data.message.token}]`) || false;
                    if(offlineDOM){
                        offlineDOM.style.display = 'none';
                    }
                    this.displayCommentNotification(data.message) 
                }
            
              break;
            case this.typeEvent[1]:
              // code block
              if(Number(data.message.comment.project_id) === track_project_id){
                  
                  this.displayCommentReplyNotification(data.message)
              }
              break;
            default:
              // code block
        }
        
    }

    displayCommentNotification(data){
        const {to, from, message, image, image_link, comment} = data;
        let {user_name, user_mode, user_type, anonymous, user_image, project_id, id, time_ago, comment: comment_info} = comment;
        let files = '';
        let img;

        if (user_mode == 'DevelopND' || user_mode == 'default') {
            img = `${image_link}${user_image}`;
        } else {
            img = user_image;
        }

        if(anonymous){
            user_name = 'Anonymous';
            img = "../images/noimage.png";
        }

        let comment_message  = comment_info != 'no-comment' ? comment_info : '';

        // Check for comment files if present
        if(comment.files){
            Object.keys(comment.files).map(i => {
                console.log(i)
                if(comment.files[i].file_type == "image"){
                    console.log('i')
                    files += ` 
                            <div class="col-6 px-1">
                                <img style="object-fit: cover;" src="${comment.files[i].file_path}${comment.files[i].filename}" alt="comment images">
                            </div>`;
                } else if(comment.files[i].file_type == "video"){
                    console.log('v')
                    files += `  <div class="col-6 px-1">
                                    <video style="object-fit: cover;"  src="${comment.files[i].file_path}${comment.files[i].filename}" type="video/mp4" controls></video>
                                </div>`;
                }
            })
          
        }

        $( "#view-comments" ).prepend(`
            <div class="media mt-3 mb-5 row">
                <div class="col-12 col-md-2 col-lg-1 row mx-0 mb-2 px-0">
                    <div class="comment-image border animated flash">
                        <img style="object-fit: cover;" src="${img}" class="mr-3" alt="...">
                    </div>
                    <p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size:12px;" class="comment_entity mt-2 mb-1 that-blue commenter-name bold col-10 px-0 animated flash" id="commenter-name">${user_name}</p>
                    <span class="col-12 px-0 user_type">${user_type}</span>
                    <br>
                    <span class="comment_entity col-12 animated flash" style="font-size: 10px; color:grey;">${time_ago}</span>
                </div>
                <div class="media-body col-12 col-md-10 col-lg-7 pl-5 animated flash">
                    <span class="col-12 px-0 that-blue-filtered comment-actual" id="comment=actual" style="font-size: 15px; text-align: justify;color: black;">${comment_message}</span>
                    <div class="col-12 comment-media row mx-0 mb-3 px-0" id="file-block${id}">
                         ${files}  
                    </div>
                    <div class="col-12 col-md-7 comment-activity my-2 row mx-0 px-0">

                        <!-- <div class="col px-0">
                            <span class="that-blue-filtered font-12px"><i class="fa fas fa-lg fa-thumbs-up"></i>
                                0</span>
                        </div>
                        <div class="col px-0">
                            <span class="that-blue-filtered font-12px"><i class="fa fas fa-lg fa-thumbs-down"></i>
                                0</span>
                        </div> -->
                        <div class="col px-0 reply-btn" data-reply-id="${id}" style="cursor:pointer;">
                            <span class="that-blue-filtered font-12px"><i class="fa fas fa-lg fa-reply"></i> Reply</span>
                        </div>
                        <div class="col px-0">
                            <span class="that-blue-filtered font-12px">Replies <span data-reply-count${id}>${0}</span></span>
                        </div>
                    </div>
                    <div class="border col-12 reply-input-con reply-input-off" id="reply-input${id}">
                        <span title="close reply message" data-reply-id="${id}" id="reply-input${id}" class="mr-2 reply-btn-close" style="color: white; position: absolute;
                            font-size:18px; right: 0; cursor: pointer; padding: 5px; z-index: 99;">
                            &times;</span>
                        <form data-project-comment class="row mt-3">
                            <div class="form-group col-12 mb-2">
                                <textarea data-comment-box${id} data-comment-id="${id}" 
                                name="reply" maxlength="250" style="font-size: 12px; resize:none"
                                class="col-12 dataCommentBox scroller placeholder-sty-font" placeholder="Reply to this comment"></textarea>
                            </div>
                            <div class="col-6 col-md-6 comment-utilities px-0 row mx-0 mb-1">
                                <div class="select-anonymous ml-1">
                                    <label for="myAnonymousCheck${id}" data-anonymous-block${id} >
                                        <i class="fa fas fa-eye-slash ml-2 mt-2 fa-xs"
                                            title="You are commenting as an anonymous user"
                                            style="cursor: pointer;"></i>
                                    </label>
                                    <input class="d-none anonymousReplies"  data-comment-id="${id}" 
                                    type="checkbox" id="myAnonymousCheck${id}" checked disabled>
                                </div>

                                <div class="select-comment-image ml-1">
                                    <label for="myFileCommentReply${id}" data-file-block>
                                            <i class="fa fas fa-image ml-1 mt-2 fa-xs" title="You are commenting as an anonymous user" style="cursor: pointer;"></i>
                                            <span class="badge mr-2 comment-file-notify" data-file-notify${id} style="background: white; color: green; font-weight: bold;"><span> 
                                    </label>
                                    <input class="d-none replyFiles" data-comment-id="${id}" type="file" id="myFileCommentReply${id}" data-file-spot
                                            accept=".jpg, .jpeg, .png, .mp4, .avi" multiple>
                                </div>
                                <div class="select-comment-image ml-1 fileDelete" data-comment-id="${id}" data-comment-delete${id}>
                                    <i title="Clear all selected files" data-comment-delete-icon${id}  class="fa fa-trash-o mt-2 fa-xs comment-files-delete"></i>                                      
                                </div>
                            </div>
                            <div class="col-6 col-md-6 text-align">
                                <button style="float: right; padding: 1px 6px !important; font-size:13px; height: 5vh" data-comment-btn${id} data-comment-id="${id}" data-project-id="${project_id}"
                                data-comment-reply-btn type="submit" class="btn btn-brand br-10px py-0 border commentReplyBtn">Reply</button>
                            </div>
                        </form>
                        <div class="mx-0 px-0 mt-2" data-comment-info${id} 
                        style="color:#0b273d; font-weight: bold; position: absolute; font-size: 10px; margin-left: 75px !important;">
                            
                        </div>
                    </div>
                     <span class="bold font-12px my-3 view-all-replies view-reply-btn" id="view-reply-btn${id}"  data-reply-id="${id}" style="cursor:pointer;">View all replies</span>
                     <span class="bold font-12px my-3 view-all-replies hide-reply-btn" id="hide-reply-btn${id}" 
                        data-reply-id="${id}" style="cursor:pointer;">Hide all replies</span>
                    <div class="all-comment mt-4" id="view-reply${id}">
                       
                    </div>
                </div>
            </div>
        `);
           //Check if the user if login and make him not anonymous
        if(localStorage.getItem('token')){
            const anonymousBlock = document.querySelector(`[data-anonymous-block${id}]`)
            
            //Remove the checked and disable atrribute from the anonymous icon
            const anonymous_input = document.querySelector(`#myAnonymousCheck${id}`);
            anonymous_input.removeAttribute('disabled');
            anonymous_input.removeAttribute('checked');
            //Update the Dom to visible user icon
            
            anonymousBlock.innerHTML = `<i class="fa fa-eye ml-2 mt-2 fa-xs" style="cursor:
                                             pointer;" data-anonymous-icon${id} title="You are not commenting as an anonymous user"></i>`;

            reply_anonymous_form = 'no';

           document.querySelector(`[data-anonymous-icon${id}]`).classList.add('custom-lightgreen');
        }

      //This function handles all the commenting and replying sementrics
    commentManipulationEngine(); //this function is found inside js/manipulation/commentManipulationEngine.js

    }

    displayCommentReplyNotification(data){
        let img;
        let dataFiles = '';
        const {message, comment} = data;
        let {comment_reply, id, image_link, project_id, comment_id, user_mode, user_type, anonymous, user_id, files, user_image, user_name, created_at_for_humans} = comment;

        console.log(comment_reply)

        if (user_mode == 'DevelopND' || user_mode == 'default') {
            img = `${image_link}${user_image}`;
        } else {
            img = user_image;
        }
        if(anonymous){
            user_name = 'Anonymous';
            img = "../images/noimage.png";
        }
        //Check if there is comment message 
       const comment_message  = comment_reply != 'no-comment' ? comment_reply : '';
       // Check for comment files if present
        if(files){
            
            Object.keys(files).map(i => {
                console.log(files[i])

                if(files[i].file_type == "image"){
                    console.log('i')
                    dataFiles += ` 
                          <div class="col-6 px-1">
                             <img style="object-fit: cover;" src="${files[i].file_path}${files[i].filename}" alt="comment images">
                          </div>`
                } else if(files[i].file_type == "video"){
                    console.log('v')
                    dataFiles += `<div class="col-6 px-1">
                                <video style="object-fit: cover;"  src="${files[i].file_path}${files[i].filename}" type="video/mp4" controls></video>
                              </div>`
                }
            })
          
        }
    
        $(`#view-reply${comment_id}`).prepend(`
            <div class="media mb-2 row">
                <div class="col-12 col-md-2 col-lg-2 row mx-0 mb-2 px-0">
                    <div class="comment-image border animated flash">
                        <img style="object-fit: cover;" src="${img}" class="mr-3" alt="user-image">
                    </div>
                    <p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size:12px;" class="comment_entity mt-2 mb-1 that-blue commenter-name bold col-10 px-0 animated flash" id="commenter-name">${user_name}</p>
                    <span class="col-12 px-0 user_type">${user_type}</span>
                    <br>
                    <span class="comment_entity col-12 animated flash" style="font-size: 10px; color:grey;">${created_at_for_humans}</span>
                </div>
                <div class="media-body col-12 col-md-10 col-lg-10 pl-5 animated flash">
                    <span style="font-size: 15px; text-align: justify; color: black;" 
                    class="font-12px that-blue-filtered col-12 px-0 comment-actual animated flash">
                        ${comment_message}
                    </span>
                        <div class="col-12 comment-media row mx-0 mb-3 mt-2 px-0" id="file-block${id}">
                            ${dataFiles}
                        </div>
                </div>
            </div>
        `);

        $(`#view-reply${comment_id}`).show();// Show the reply container

        $(`#view-reply-btn${comment_id}`).hide();// Hide the view reply btn

        $(`#hide-reply-btn${comment_id}`).show();//Show Hide Btn

    }
}





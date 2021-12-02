viewComment = (commentDatas, image_link) => {

    let img;
    commentsContainer.innerHTML = '';

    let comment_message;
    let files = '';

    commentsContainer.innerHTML = '';

    commentDatas.map(commentData => {
        let { id, comment, user_image, user_name, project_id, user_mode, user_type, anonymous, commentfiles, commentreplies, created_at_for_humans } = commentData;

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
        comment_message  = comment != 'no-comment' ? comment : '';
       // Check for comment files if present
        if(commentfiles.length > 0){
            
            commentfiles.map(file => {
                if(file.file_type == "image"){
                
                    files += ` 
                          <div class="col-6 px-1">
                             <img style="object-fit: cover;" src="${file.file_path}${file.filename}" alt="comment images">
                          </div>`
                } else if(file.file_type == "video"){
                
                    files += `<div class="col-6 px-1">
                                <video style="object-fit: cover;"  src="${file.file_path}${file.filename}" type="video/mp4" controls></video>
                              </div>`
                }
            })
          
        }
        commentsContainer.innerHTML += `
        <div class="media mb-3 row">
            <div class="col-12 col-md-2 col-lg-1 row mx-0 mb-2 px-0">
                <div class="comment-image border">
                    <img style="object-fit: cover;" src="${img}" class="mr-3" alt="...">
                </div>
                <p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size:12px;" class="comment_entity mt-2 mb-1 that-blue commenter-name bold col-10 px-0" id="commenter-name">${user_name}</p>
                <span class="col-12 px-0 user_type">${user_type}</span>
                <br>
                <span class="comment_entity col-12" style="font-size: 10px; color:grey;">${created_at_for_humans}</span>
            </div>
        <div class="media-body col-12 col-md-10 col-lg-7 pl-5">
            <span class="col-12 px-0 that-blue-filtered comment-actual"
             id="comment=actual" style="font-size: 15px; text-align: justify; color: black;">${comment_message}</span>
            <div class="col-12 comment-media row mx-0 mb-3 mt-2 px-0" id="file-block${id}">
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
                    <span class="that-blue-filtered font-12px">Replies <span>${commentreplies.length}</span></span>
                </div>
            </div>
            <div class="border col-12 reply-input-con reply-input-off" id="reply-input${id}">
                <span title="close reply message" data-reply-id="${id}" id="reply-input${id}" class="mr-2 reply-btn-close" style="color: white; position: absolute;
                 font-size:18px; right: 0; cursor: pointer; padding: 5px; z-index: 99; font-weight:bold;">
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
        `
        files = '';//This prevent the default variable content from showing and clear exiting content

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
        displayRepliesFunc(id, commentreplies, image_link);

    })
    //This function handles all the commenting and replying sementrics
    commentManipulationEngine(); //this function is found inside js/manipulation/commentManipulationEngine.js
 
    getDataFromIDB();
}



const fetchAllComment = (query) => {
    const routes = new Routes();
    const url = `${routes.apiOrigin}${routes.fetchProjectComments(query)}`;

    fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
            "Accept": "aplication/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            //Push the comment data to a temporary array
            allCommentHolder.push(...data.comments.data);
            viewComment(data.comments.data, data.image_link);
        })
        .catch(err => {
            console.error(err)
        })
}

fetchAllComment(query);

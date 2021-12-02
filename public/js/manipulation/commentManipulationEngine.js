

const commentManipulationEngine = () => {
       //Toggle the reply modal 
       const replyBtn = Array.from(document.querySelectorAll(`.reply-btn`));
       replyBtn.map(x => {
           x.addEventListener('click', (event) => {
               const comment_id = Number(x.dataset.replyId);

               const replyBtnInput = document.querySelector(`#reply-input${comment_id}`);
               replyBtnInput.style.display = 'block';
           });
       })
       //Toggle the reply modal 
       const replyBtnClose = Array.from(document.querySelectorAll(`.reply-btn-close`));
       replyBtnClose.map(x => {
           x.addEventListener('click', (event) => {
               const comment_id = Number(x.dataset.replyId);

               const replyBtnInput = document.querySelector(`#reply-input${comment_id}`);
               replyBtnInput.style.display = 'none';
           });
       })
   //Toggle the view all reply btn 
   const viewReplyBtn = Array.from(document.querySelectorAll(`.view-reply-btn`));
   viewReplyBtn.map(x => {
       x.addEventListener('click', (event) => {
           const comment_id = Number(x.dataset.replyId);
           const allReply = document.querySelector(`#view-reply${comment_id}`);
           const hideReplyBtn = document.querySelector(`#hide-reply-btn${comment_id}`);
           
           x.style.display = 'none';
           hideReplyBtn.style.display = 'block';
           allReply.style.display = 'block';

         });
     })

    const hideReplyBtn = Array.from(document.querySelectorAll(`.hide-reply-btn`));
    hideReplyBtn.map(x => {
        x.addEventListener('click', (event) => {
            const comment_id = Number(x.dataset.replyId);

            const allReply = document.querySelector(`#view-reply${comment_id}`);
            const viewReplyBtn = document.querySelector(`#view-reply-btn${comment_id}`);
            
            
            x.style.display = 'none';
            viewReplyBtn.style.display = 'block';
            allReply.style.display = 'none';
        });
    })

    
    //Reply Comment Engine
   //Listen for a file change from the file input
   const anonymousReplies = Array.from(document.querySelectorAll('.anonymousReplies'));
 
   anonymousReplies.map(anonymousReply => {
  
       anonymousReply.addEventListener('change', (event) => controlAnonymousReply(event, anonymousReply))
   })

   //Get the anonymous button
   const replyFiles = Array.from(document.querySelectorAll('.replyFiles'));
   replyFiles.map(replyFile => {
       replyFile.addEventListener('change', (event) => replycommentFileFunc(event, replyFile))
   })

   //Trigger the comment reply submission
   const commentReplyBtns = Array.from(document.querySelectorAll('.commentReplyBtn'));
   commentReplyBtns.map(commentReplyBtn => {
       
       commentReplyBtn.addEventListener('click', (event) => commentReply(event, commentReplyBtn));
   })

   //Get the comment textarea 
   const commentBoxs = Array.from(document.querySelectorAll('.dataCommentBox'));
   commentBoxs.map(commentBox => {
       
       commentBox.addEventListener('focus', (event) => {
           
           const commentId = Number(commentBox.dataset.commentId);
           const infoSPot = document.querySelector(`[data-comment-info${commentId}]`);
           infoSPot.innerHTML = '';
           commentBox.placeholder = 'Reply to this comment';
           commentBox.classList.remove('placeholder-sty');
       })
   })

   //Delete a particular file per reply box
   const fileDeletes = Array.from(document.querySelectorAll('.fileDelete'));
   fileDeletes.map(fileDelete => {

       fileDelete.addEventListener('click', (event) => {
        const commentId = Number(fileDelete.dataset.commentId);
       
        const infoSPot = document.querySelector(`[data-comment-info${commentId}]`);
           replyCommentStorage = [];
           const fileNotifyIcon = document.querySelector(`[data-file-notify${commentId}]`);
           const fileDeleteIcon = document.querySelector(`[data-comment-delete-icon${commentId}]`);
           
           infoSPot.innerHTML = `Your selected Files has removed!`;
           document.querySelector(`#myFileCommentReply${commentId}`).value = '';
           fileNotifyIcon.innerHTML = "";
           fileNotifyIcon.style.display = "none";
           fileDeleteIcon.style.display = "none";
       });

   })

}

const displayRepliesFunc = (comment_id, commentreplies, image_link) => {

    //Get the replies DOM and run a check to know if it empty before inserting into it
    const repliesDOM = document.querySelector(`#view-reply${comment_id}`);

    let files = '';

    if(commentreplies.length > 0){
        commentreplies.map(commentreply => {
            let {id, user_id, project_id, user_name, user_mode, user_type, anonymous, user_image, comment_reply, created_at_for_humans, commentreplyfiles} = commentreply;
    
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
            if(commentreplyfiles.length > 0){
                
                commentreplyfiles.map(file => {
                    
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
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="media mb-2 row">
                    <div class="col-12 col-md-2 col-lg-2 row mx-0 mb-2 px-0">
                        <div class="comment-image border">
                            <img style="object-fit: cover;" src="${img}" class="mr-3" alt="...">
                        </div>
                        <p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size:12px;" class="comment_entity mt-2 mb-1 that-blue commenter-name bold col-10 px-0" id="commenter-name">${user_name}</p> 
                        <span class="col-12 px-0 user_type">${user_type}</span>
                        <br>
                        <span class="comment_entity col-12" style="font-size: 10px; color:grey;">${created_at_for_humans}</span>
                    </div>
                    <div class="media-body col-12 col-md-10 col-lg-10 pl-5">
                        <span style="font-size: 15px; text-align: justify; color: black;" class="font-12px that-blue-filtered col-12 px-0 comment-actual">
                            ${comment_message}
                        </span>
                            <div class="col-12 comment-media row mx-0 mb-3 mt-2 px-0" id="file-block${id}">
                                ${files}
                            </div>

                            <div class="col-5 col-md-5 comment-activity my-2 row mx-0 px-0">
                            <!--
                                <div class="col px-0">
                                    <span class="that-blue-filtered font-12px"><i class="fa fas fa-lg fa-thumbs-up"></i>
                                        0</span>
                                </div>
                                <div class="col px-0">
                                    <span class="that-blue-filtered font-12px"><i class="fa fas fa-lg fa-thumbs-down"></i>
                                        0</span>
                                </div>
                            -->
                            </div>
                    </div>
                </div>
                `;
                repliesDOM.appendChild(div);
                files = '';//This prevent the default variable content from showing and clear exiting content
        });
    }
       
}

const offlineInserter = (comment, user_name, media, mediaType, offLineToken) => {
    let uploadedMedia;
    if(media) {
        uploadedMedia = (mediaType.split('/')[0] == 'video')
        ? `<video controls><source src="${media}" type="video/mp4"></video>`
        : `<img src="${media}" alt="">`;
    }    
    let mediaFile = (media) ? uploadedMedia : "";
    let commenHolder = document.querySelector('#view-comments');
    let div = document.createElement('div');
    div.setAttribute('class', 'media mb-3 row');
    div.setAttribute(`data-offline${offLineToken}`, "");
    
    let child = `<div class="col-12 col-md-2 col-lg-1 row mx-0 mb-2 px-0">
        <div class="comment-image border d-flex justify-content-center align-items-center">
            <div>
                <span class="text-center text-secondary">OFFLINE</span>
            </div>            
        </div>
        <p class="comment_entity mt-2 mb-1 that-blue commenter-name bold col-10 px-0" id="commenter-name">${user_name}</p> <br>
        <span class="comment_entity col-12" style="font-size: 10px; color:grey;">offline mode</span>
    </div>
    <div class="media-body col-12 col-md-10 col-lg-7 pl-5">
    <span class="col-12 px-0 that-blue-filtered comment-actual" id="comment=actual" style="font-size: 15px; text-align: justify; color: black;">${comment.charAt(0).toUpperCase() + comment.substring(1)}</span>
    <div class="col-6 px-1 comment-media row mx-0 mb-3 mt-2 px-0" id="file-block229">
        ${mediaFile}
    </div>
    <div class="col-12 col-md-7 comment-activity my-2 row mx-0 px-0">
        <div class="col px-0">
            <span class="that-blue-filtered font-12px"><i class="fa fas fa-lg fa-thumbs-up"></i>
                0</span>
        </div>
        <div class="col px-0">
            <span class="that-blue-filtered font-12px"><i class="fa fas fa-lg fa-thumbs-down"></i>
                0</span>
        </div>
        <div class="col px-0 reply-btn" data-reply-id="229">
            <span class="that-blue-filtered font-12px"><i class="fa fas fa-lg fa-reply"></i>
                0</span>
        </div>
        <div class="col px-0">
            <span class="that-blue-filtered font-12px">Replies <span>0</span></span>
        </div>
    </div>
    <div class="border col-12 reply-input-con reply-input-off" id="reply-input229">
        <span title="close reply message" data-reply-id="229" id="reply-input229" class="mr-2 reply-btn-close" style="color: white; position: absolute;
         font-size:18px; right: 0; cursor: pointer; padding: 5px; z-index: 99; font-weight:bold;">
        ×</span>
        <form data-project-comment="" class="row mt-3 mb-2">
            <div class="form-group col-12 mb-2">
                <textarea data-comment-box229="" data-comment-id="229" name="reply" maxlength="250" style="font-size: 12px; resize:none" class="col-12 dataCommentBox scroller placeholder-sty-font" placeholder="Reply to this comment"></textarea>
            </div>
            <div class="col-12 col-md-6 comment-utilities row mx-0 mb-2 pl-3">
                <div class="select-anonymous">
                    <label for="myAnonymousCheck229" data-anonymous-block229=""><i class="fa fa-eye ml-2 mt-2 fa-xs custom-lightgreen" style="cursor:
                                     pointer;" data-anonymous-icon229="" title="You are not commenting as an anonymous user"></i></label>
                    <input class="d-none anonymousReplies" data-comment-id="229" type="checkbox" id="myAnonymousCheck229">
                </div>
    
                <div class="select-comment-image ml-3">
                   <label for="myFileCommentReply229" data-file-block="">
                        <i class="fa fas fa-image ml-2 mt-2 fa-xs" title="You are commenting as an anonymous user" style="cursor: pointer;"></i>
                        <span class="badge mr-2 comment-file-notify" data-file-notify229="" style="background: white; color: green; font-weight: bold;"><span> 
                   </span></span></label>
                    <input class="d-none replyFiles" data-comment-id="229" type="file" id="myFileCommentReply229" data-file-spot="" accept=".jpg, .jpeg, .png, .mp4, .avi" multiple="">
                </div>
                <div class="select-comment-image ml-2 fileDelete" data-comment-id="229" data-comment-delete229="">
                    <i title="Clear all selected files" data-comment-delete-icon229="" class="fa fa-trash-o mt-2 fa-xs comment-files-delete"></i>                                      
                </div>
            </div>
            <div class="col-12 col-md-2 ml-auto px-0 mr-4">
                <button data-comment-btn229="" data-comment-id="229" data-project-id="1439" data-comment-reply-btn="" type="submit" class="btn btn-brand br-10px font-12px border commentReplyBtn">Comment</button>
            </div>
        </form>
        <div class="mx-0 px-0 mt-2" data-comment-info229="" style="color:#0b273d; font-weight: bold; position: absolute; font-size: 10px; margin-left: 75px !important;">
            
        </div>
    </div>
    <span class="bold font-12px my-3 view-all-replies view-reply-btn" id="view-reply-btn229" data-reply-id="229" style="cursor:pointer;">View all replies</span>
    <span class="bold font-12px my-3 view-all-replies hide-reply-btn" id="hide-reply-btn229" data-reply-id="229" style="cursor:pointer;">Hide all replies</span>
    <div class="all-comment" id="view-reply229">
        
    </div>
    </div>`;
    
    div.innerHTML += child;
    commenHolder.insertBefore(div, commenHolder.childNodes[0]);
}

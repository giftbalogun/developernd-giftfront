let replyBoardTracker = null;
let replyCommentStorage = [];
let reply_anonymous_tracker = null;
let reply_anonymous_form = 'yes';
let anonymous_filter = null;



const replycommentFileFunc = (event, replyFile) => {
    //Notify the user with icon that a file has been selected
    const commentId = Number(replyFile.dataset.commentId);
    const files = Array.from(replyFile.files);
    console.log(replyFile.value)

    const infoSPot = document.querySelector(`[data-comment-info${commentId}]`);
    const fileNotifyIcon = document.querySelector(`[data-file-notify${commentId}]`);
    const fileDeleteIcon = document.querySelector(`[data-comment-delete-icon${commentId}]`);
    infoSPot.innerHTML = "";

    //Push file to an array for later use
    //We need to track what comment has this reply so we can send the file to the right comment
    console.log(replyBoardTracker)
    if (replyBoardTracker == null || replyBoardTracker === commentId) {
        console.log('l')
        replyBoardTracker = commentId
        replyCommentStorage.push(...files);
    } else {
        console.log('v')
        replyCommentStorage = [];
        document.querySelector(`#myFileCommentReply${replyBoardTracker}`).value = '';
        document.querySelector(`[data-file-notify${replyBoardTracker}]`).innerHTML = '';
        document.querySelector(`[data-file-notify${replyBoardTracker}]`).style.display = "none";
        document.querySelector(`[data-comment-delete-icon${replyBoardTracker}]`).style.display = "none";
        replyBoardTracker = commentId
        replyCommentStorage.push(...files);
    }

    //Check if the array is less than three or three 
    if (replyCommentStorage.length > 0 && replyCommentStorage.length <= 2) {
        fileNotifyIcon.innerHTML = replyCommentStorage.length;
        fileNotifyIcon.style.display = "block";
        fileDeleteIcon.style.display = "block";

        validationReplyCommentFiles(infoSPot, fileNotifyIcon, fileDeleteIcon);
    } else if (replyCommentStorage.length == 0) {
        console.log('j')
        replyCommentStorage = [];
        infoSPot.innerHTML = `<span style="color:tomato;">No file selected!</span>`;
        fileNotifyIcon.innerHTML = "";
        fileNotifyIcon.style.display = "none";
        fileDeleteIcon.style.display = "none";
    } else {
        replyCommentStorage = [];
        infoSPot.innerHTML = `<span style="color:tomato;">Only 2 files are allowed per comment reply!</span>`;
        fileNotifyIcon.innerHTML = "";
        fileNotifyIcon.style.display = "none";
        fileDeleteIcon.style.display = "none";
    }

}



const validationReplyCommentFiles = (infoSPot, fileNotifyIcon, fileDeleteIcon) => {
    //Validation of all files
    let fileSize;
    replyCommentStorage.map(x => {
        // Convert file size from byte to MB
        fileSize = x.size / 1024 / 1024;
        console.log(fileSize)

        if (x.type == "image/png" || x.type == "image/jpg" || x.type == "image/jpeg") {  //Check image file format
            if (fileSize > 2) {
                replyCommentStorage = [];
                infoSPot.innerHTML = `<span style="color:tomato; font-size: 10px;">File name <span style="font-style: italic;">-${x.name}-</span>
                                            with size <span style="font-style: italic;">-${fileSize}-</span>
                                            is greater than 2MB!
                                     </span>`;
                fileNotifyIcon.innerHTML = "";
                fileNotifyIcon.style.display = "none";
                fileDeleteIcon.style.display = "none";
            }

        } else if (x.type == "video/mp4" || x.type == "video/avi" || x.type == "video/mov" || x.type == "video/wmv" || x.type == "video/webm") {  //Check video file format

            if (fileSize > 20) {
                replyCommentStorage = [];
                infoSPot.innerHTML = `<span style="color:tomato; font-size: 10px;">File name <span style="font-style: italic;">-${x.name}-</span>
                                            with size <span style="font-style: italic;">-${fileSize}-</span>
                                            is greater than 10MB!
                                     </span>`;
                fileNotifyIcon.innerHTML = "";
                fileNotifyIcon.style.display = "none";
                fileDeleteIcon.style.display = "none";
            }

        } else {
            replyCommentStorage = [];
            infoSPot.innerHTML = `<span style="color:tomato; font-size: 10px;">File name 
                                       <span style="font-style: italic;">-${x.name}-</span> with format <span style="font-style: italic;">-${x.type}-<span> 
                                   is not supported!
                                 </span>`;
            fileNotifyIcon.innerHTML = "";
            fileNotifyIcon.style.display = "none";
            fileDeleteIcon.style.display = "none";
        }
    });
}


const controlAnonymousReply = (event, anonymousReply) => {
    let title;
    console.log(event);
    console.log(anonymousReply);

    const commentId = Number(anonymousReply.dataset.commentId);
    const anonymousBlock = document.querySelector(`[data-anonymous-block${commentId}]`);
    const infoSPot = document.querySelector(`[data-comment-info${commentId}]`);;

    if (anonymousReply.checked == true) {
        title=`Your identity have been set to anonymous`;

        //Check if it is checked and the make comment anonymous 
        if(anonymous_filter == null){
            anonymous_filter = commentId;
        }else if (anonymous_filter !== commentId){

            const anonymousBlock = document.querySelector(`[data-anonymous-block${anonymous_filter}]`)

            const anonymous_input = document.querySelector(`#myAnonymousCheck${anonymous_filter}`);
            anonymous_input.checked = false;

            title=`Your identity have been set to anonymous`;
            anonymousBlock.innerHTML = `<i class="fa fa-eye rounded-circle ml-2 mt-2 fa-xs" style="cursor:
                                        pointer;" data-anonymous-icon${anonymous_filter} title="You are not commenting as an anonymous user"></i>`;

            document.querySelector(`[data-anonymous-icon${anonymous_filter}]`).classList.add('custom-lightgreen');
           anonymous_filter = commentId;
        }

        console.log(anonymous_filter)

        anonymousBlock.innerHTML = `<i class="fa fas fa-eye-slash rounded-circle ml-2 mt-2 fa-xs" 
                                    title="You are commenting as an anonymous user" style="cursor: pointer;"
                                     data-anonymous-icon${commentId} name="anonymous" value="no" type="checkbox"></i>`;

        document.querySelector(`[data-anonymous-icon${commentId}]`).classList.remove('custom-lightgreen');


    } else {
        anonymous_filter = null;
    
        title=`Comment identity have been removed from anonymous`;

        anonymousBlock.innerHTML = `<i class="fa fa-eye  rounded-circle ml-2 mt-2 fa-xs" style="cursor:
                                     pointer;" data-anonymous-icon${commentId} title="You are not commenting as an anonymous user"></i>`;

        document.querySelector(`[data-anonymous-icon${commentId}]`).classList.add('custom-lightgreen');

        console.log(anonymous_filter)

    }

    infoSPot.innerHTML = title;

    setTimeout(() => {
        infoSPot.innerHTML = "";
    }, 2000)
}




const commentReply = (event, commentReplyBtn) => {
    event.preventDefault();

    const userLocalStore = JSON.parse(localStorage.getItem('DevelopND-user'));
    //Notify the user with icon that a file has been selected
    const commentId = Number(commentReplyBtn.dataset.commentId);
    const projectId = Number(commentReplyBtn.dataset.projectId);

    const infoSPot = document.querySelector(`[data-comment-info${commentId}]`);
    const fileNotifyIcon = document.querySelector(`[data-file-notify${commentId}]`);
    const fileDeleteIcon = document.querySelector(`[data-comment-delete-icon${commentId}]`);
    const commentBox = document.querySelector(`[data-comment-box${commentId}]`);

    const routes = new Routes();
    const formData = new FormData();
    let url;

    //Return error if input is empty
    if (commentBox.value === "" && replyCommentStorage.length <= 0) {
        commentBox.placeholder = 'Please comment field or file upload cannot be empty!';
        commentBox.classList.add('placeholder-sty')
        return false;
    }

    //Show spinner if everything is fine
    commentReplyBtn.innerHTML = '<span class="spinner-border spinner-border-sm" style="width: 1.3em; height: 1.3em;" role="status" aria-hidden="true"></span>'
    commentReplyBtn.setAttribute('disabled', true);
    commentReplyBtn.style.cursor = 'not-allowed';
    //Get the user from localStorage if found

    if (userLocalStore) {
        const { user } = userLocalStore;
        user_com_id = user.id
    } else {
        user_com_id = null;
    }
    console.log(anonymous_filter, commentId)
    //This check should run when a user on session
    if(localStorage.getItem('token')){
        if(anonymous_filter === commentId){
            reply_anonymous_form = 'yes';
        }else {
            reply_anonymous_form = 'no';
        }
    }

    console.log(reply_anonymous_form);
    console.log(url)

    //Append the image to formdata Object
    if (replyCommentStorage.length > 0 && replyCommentStorage.length <= 3) {
        replyCommentStorage.map(function (file) {
            formData.append('filename[]', file);
        });
        console.log(formData.getAll('filename[]'))
    }
    if (commentBox.value !== '') {
        formData.append('comment_reply', commentBox.value);
    }

    url = `${routes.apiOrigin}${routes.createReplyComment(projectId, commentId, reply_anonymous_form)}`;
    console.log(url)

    console.log(formData.getAll('comment'))


    fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
            "Accept": "application/json",
            "Authorization": localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null
        },
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            commentReplyBtn.innerHTML = 'Reply';
            commentReplyBtn.removeAttribute('disabled');
            commentReplyBtn.style.cursor = 'pointer';
            commentBox.value = '';

            replyCommentStorage = [];
            fileNotifyIcon.innerHTML = "";
            fileNotifyIcon.style.display = "none";
            fileDeleteIcon.style.display = "none";

            console.log(data);
            infoSPot.innerHTML = '<p style="color: green;">Reply created Successfully!</p>';

        })
        .catch(err => {
            commentReplyBtn.innerHTML = 'Reply';
            commentReplyBtn.removeAttribute('disabled');
            commentReplyBtn.style.cursor = 'pointer';
            commentBox.innerHTML = '';

            replyCommentStorage = [];
            fileNotifyIcon.innerHTML = "";
            fileNotifyIcon.style.display = "none";
            fileDeleteIcon.style.display = "none";
            console.error(err)
            $('#notifyModal').modal('toggle');
            $('#info_content').html(`
                <p style="color:red; font-size:14px; font-weight: bold;">An error occured, 
                this could be a network failure, please try again!
                </p>`);
            setInterval(() => {
                $('#notifyModal').modal('toggle');
            }, 3000)

        })

        setTimeout(() => {
            infoSPot.innerHTML = "";
        }, 2000)

}
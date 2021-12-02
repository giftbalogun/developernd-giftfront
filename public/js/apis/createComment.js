
const commentBox = document.querySelector('[data-comment-box]');
const anonymous = document.querySelector('[data-anonymous-spot]');
const anonymousBlock = document.querySelector('[data-anonymous-block]');
const commentBtn = document.querySelector('[data-comment-btn]');
const commentReplyBtn = document.querySelector('[data-comment-reply-btn]');
const commenterName = document.querySelector('#commenter-data');
const commentsContainer = document.querySelector('#view-comments');
const commentFiles = document.querySelector('#myFileComment');
//Notify the user in the info spot
const infoSPot = document.querySelector('[data-comment-info]');
const fileDelete = document.querySelector('[data-comment-delete]');

let user_com_id;
let anonymous_form = 'yes';
let commentFileStorage = [];
let allCommentHolder = [];

const comment = (event, commentBtn, project_id) => {
    if (!JSON.parse(localStorage.getItem('token'))) {
        document.querySelector('.non-user-warning').classList.remove('d-none');
        event.preventDefault();
        return;
    }
    event.preventDefault();
    const userLocalStore = JSON.parse(localStorage.getItem('DevelopND-user'));
    const fileNotifyIcon = document.querySelector('[data-file-notify]');
    const fileDeleteIcon = document.querySelector('[data-comment-delete-icon]');

    const routes = new Routes();
    const formData = new FormData();
    let url;

    url = `${routes.apiOrigin}${routes.createComment(project_id, anonymous_form)}`;

    //Return error if input is empty
    if (commentBox.value === "" && commentFileStorage.length <= 0 && commentBox.value !== '\n') {
        commentBox.placeholder = 'Please comment field or file upload cannot be empty!';
        commentBox.classList.add('placeholder-sty')
        return false;
    }

    //Show spinner if everything is fine
    commentBtn.innerHTML = '<span class="spinner-border spinner-border-sm" style="width: 1.3em; height: 1.3em;" role="status" aria-hidden="true"></span>'
    commentBtn.setAttribute('disabled', true);
    commentBtn.style.cursor = 'not-allowed';
    //Get the user from localStorage if found

    let offlineUser;
    if (userLocalStore) {
        const { user } = userLocalStore;
        const { name } = user;
        offlineUser = name;
        user_com_id = user.id;
    } else {
        user_com_id = null;
    }

    console.log(anonymous_form);
    console.log(url);

    //Append the image to formdata Object
    let offlineFile;
    if (commentFileStorage.length > 0 && commentFileStorage.length <= 3) {
        commentFileStorage.map(function (file) {
            formData.append('filename[]', file);
        });
        console.log(formData.getAll('filename[]'));
        offlineFile = commentFileStorage;
    }
    if (commentBox.value !== '') {
        formData.append('comment', commentBox.value);
    }
    console.log(formData.getAll('comment'))

    // Offline functionality
    if (!navigator.onLine) {
        let user_name = offlineUser || "Anonymous";
        offlineCommentStorage(commentBox.value, offlineFile, project_id, url, user_name, commentFileStorage);
        return;
    }
    // End of Offline functionality 

    fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
            "Accept": "application/json",
            "Authorization": JSON.parse(localStorage.getItem('token'))
        },
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            commentBtn.innerHTML = 'Comment';
            commentBtn.removeAttribute('disabled');
            commentBtn.style.cursor = 'pointer';
            commentBox.value = '';

            commentFileStorage = [];
            fileNotifyIcon.innerHTML = "";
            fileNotifyIcon.style.display = "none";
            fileDeleteIcon.style.display = "none";

            console.log(data);
            infoSPot.innerHTML = '<p style="color: green;">Comment created Successfully!</p>';
            setTimeout(() => {
                infoSPot.innerHTML = "";
            }, 2000);
        })
        .catch(err => {
            commentBtn.innerHTML = 'Comment';
            commentBtn.removeAttribute('disabled');
            commentBtn.style.cursor = 'pointer';

            commentFileStorage = [];
            fileNotifyIcon.innerHTML = "";
            fileNotifyIcon.style.display = "none";
            fileDeleteIcon.style.display = "none";
            console.error(err)
            $('#notifyModal').modal('toggle');
            $('#info_content').html(`
            <p style="color:red; font-size:14px; font-weight: bold;">An error occured,
            this could be a network failure, please try again!
            </p>`);
        })
}

const controlAnonymous = () => {
    let title;

    if (anonymous.checked == true) {
        //Check if it is checked and the make comment anonymous 
        anonymous_form = 'yes';
        title = `Comment identity have been set to anonymous`;

        anonymousBlock.innerHTML = `<i class="fa fas fa-eye-slash ml-2 mt-2 rounded-circle fa-xs" 
                                    title="You are commenting as an anonymous user" style="cursor: pointer;"
                                     data-anonymous-icon name="anonymous" value="no" type="checkbox"></i>`;

        document.querySelector('[data-anonymous-icon]').classList.remove('custom-lightgreen');


    } else {


        anonymous_form = 'no';

        title = `Comment identity have been removed from anonymous`;

        anonymousBlock.innerHTML = `<i class="fa fa-eye rounded-circle ml-2 mt-2 fa-xs" style="cursor:
                                     pointer;" data-anonymous-icon title="You are not commenting as an anonymous user"></i>`;

        document.querySelector('[data-anonymous-icon]').classList.add('custom-lightgreen');


    }

    infoSPot.innerHTML = title;

    setTimeout(() => {
        infoSPot.innerHTML = "";
    }, 2000)
}







const commentFileFunc = (event) => {
    //Notify the user with icon that a file has been selected
    infoSPot.innerHTML = "";
    const fileNotifyIcon = document.querySelector('[data-file-notify]');
    const fileDeleteIcon = document.querySelector('[data-comment-delete-icon]');
    //Get the file from the input 
    //Convert to array for easy flexibility
    const files = Array.from(document.querySelector('#myFileComment').files);
    //Push file to an array for later use
    commentFileStorage.push(...files);
    //Check if the array is less than three or three 
    if (commentFileStorage.length > 0 && commentFileStorage.length <= 2) {
        fileNotifyIcon.innerHTML = commentFileStorage.length;
        fileNotifyIcon.style.display = "block";
        fileDeleteIcon.style.display = "block";

        validationCommentFiles(fileNotifyIcon, fileDeleteIcon);
    } else if (commentFileStorage.length == 0) {
        commentFileStorage = [];
        infoSPot.innerHTML = `<span style="color:tomato;">No file selected!</span>`;
        fileNotifyIcon.innerHTML = "";
        fileNotifyIcon.style.display = "none";
        fileDeleteIcon.style.display = "none";
    } else {
        commentFileStorage = [];
        infoSPot.innerHTML = `<span style="color:tomato;">Only 2 files are allowed per comment!</span>`;
        fileNotifyIcon.innerHTML = "";
        fileNotifyIcon.style.display = "none";
        fileDeleteIcon.style.display = "none";
    }
}


const validationCommentFiles = (fileNotifyIcon, fileDeleteIcon) => {
    //Validation of all files
    console.log(commentFileStorage)
    let fileSize;
    commentFileStorage.map(x => {
        // Convert file size from byte to MB
        fileSize = x.size / 1024 / 1024;
        console.log(fileSize)

        if (x.type == "image/png" || x.type == "image/jpg" || x.type == "image/jpeg") {  //Check image file format
            if (fileSize > 2) {
                commentFileStorage = [];
                infoSPot.innerHTML = `<span style="color:tomato; font-size: 13px;">File name <span style="font-style: italic;">-${x.name}-</span>
                                             with size <span style="font-style: italic;">-${fileSize}-</span>
                                             is greater than 2MB!
                                      </span>`;
                fileNotifyIcon.innerHTML = "";
                fileNotifyIcon.style.display = "none";
                fileDeleteIcon.style.display = "none";
            }

        } else if (x.type == "video/mp4" || x.type == "video/avi" || x.type == "video/mov" || x.type == "video/wmv" || x.type == "video/webm") {  //Check video file format

            if (fileSize > 20) {
                commentFileStorage = [];
                infoSPot.innerHTML = `<span style="color:tomato; font-size: 13px;">File name <span style="font-style: italic;">-${x.name}-</span>
                                             with size <span style="font-style: italic;">-${fileSize}-</span>
                                             is greater than 10MB!
                                      </span>`;
                fileNotifyIcon.innerHTML = "";
                fileNotifyIcon.style.display = "none";
                fileDeleteIcon.style.display = "none";
            }

        } else {
            commentFileStorage = [];
            infoSPot.innerHTML = `<span style="color:tomato; font-size: 13px;">File name 
                                        <span style="font-style: italic;">-${x.name}-</span> with format <span style="font-style: italic;">-${x.type}-<span> 
                                    is not supported!
                                  </span>`;
            fileNotifyIcon.innerHTML = "";
            fileNotifyIcon.style.display = "none";
            fileDeleteIcon.style.display = "none";
        }
    });
}


fileDelete.addEventListener('click', (event) => {
    console.log(event);
    commentFileStorage = [];
    const fileNotifyIcon = document.querySelector('[data-file-notify]');
    const fileDeleteIcon = document.querySelector('[data-comment-delete-icon]');

    infoSPot.innerHTML = `Your selected Files has removed!`;
    fileNotifyIcon.innerHTML = "";
    fileNotifyIcon.style.display = "none";
    fileDeleteIcon.style.display = "none";
});

//Listen for a file change in the input form
commentFiles.addEventListener('change', (event) => commentFileFunc(event))

commentBtn.addEventListener('click', (event) => comment(event, commentBtn, query));

//For Enter key
const commEnterKey = document.querySelector('[data-comment-box]');
commEnterKey.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && e.target.value !== "" && e.target.value !== '\n') {
        comment(event, commentBtn, query);
    }
    e.preventDefault();
});

commentBox.addEventListener('focus', (event) => {
    infoSPot.innerHTML = '';
    commentBox.placeholder = 'Add a public comment';
    commentBox.classList.remove('placeholder-sty')
})

anonymous.addEventListener('change', (event) => controlAnonymous());
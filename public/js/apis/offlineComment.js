
// In the following line, you should include the prefixes of implementations you want to test.
let indexedDB = window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
let dbVersion = 1;
let dbBusy = false;

// This handles offline comment
let getPageId = window.location.href
getPageId = getPageId.split('=')[1];
let currentProJId = getPageId;

let db;
if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
}

(() => {
    let dbComment = indexedDB.open('nddc-tracker', dbVersion);

    dbComment.onerror = function (e) {
        console.error('Unable to open database.');
    }

    dbComment.onsuccess = function (e) {
        db = e.target.result;
        console.log('db opened');
    }

    dbComment.onupgradeneeded = function (e) {
        let db = e.target.result;
        db.createObjectStore('offlineComment', { keyPath: 'commentToken' });
        console.log('creating object store');
    }
})();

let mediaContent = [];
const mediaManipulator = (media) => {
    media.forEach((element) => {
        let reader = new FileReader()
        reader.readAsBinaryString(element);
        reader.onload = (e) => {
            mediaContent.push(e.target.result);
        }
    });
}

const offlineToken = (token) => {
    let getToken = JSON.parse(localStorage.getItem('offline-token')) || [];
    let offlineTracker = JSON.parse(localStorage.getItem('tracking-offline-comment')) || [];
    getToken.push(token);
    offlineTracker.push(token);
    localStorage.setItem('offline-token', JSON.stringify(getToken));
    localStorage.setItem('tracking-offline-comment', JSON.stringify(offlineTracker));
}

const offlineCommentStorage = (comBox, file, projectId, commentUrl, user, commentFileStorage) => {
    dbBusy = false;
    mediaContent = [];
    currentProJId = projectId;
    let token = Math.floor(Math.random() * 4999) + 4000;
    function addData() {
        if (file) {
            let mimeType = file[0].type;
            let fileExt = file[0].type.split('/')[1];
            mediaManipulator(file);
            setTimeout(() => {
                let ob = {
                    appUser: user,
                    proj_id: projectId,
                    comment: comBox,
                    url: commentUrl,
                    mime_type: mimeType,
                    mediaExt: fileExt,
                    media: mediaContent[0],
                    commentToken: token
                };
                let trans = db.transaction(['offlineComment'], 'readwrite');
                let addReq = trans.objectStore('offlineComment').add(ob);
                trans.oncomplete = function (e) {
                    console.log('data stored');
                    let media = `data:${mimeType};base64,` + btoa(mediaContent[0]);
                    offlineInserter(comBox, user, media, mimeType, token);
                    offlineToken(token);
                }
            }, 100);
        }
        else {
            let ob = {
                appUser: user,
                proj_id: projectId,
                comment: comBox,
                url: commentUrl,
                commentToken: token
            };
            let trans = db.transaction(['offlineComment'], 'readwrite');
            let addReq = trans.objectStore('offlineComment').add(ob);
            trans.oncomplete = function (e) {
                console.log('data stored');
                let media = null;
                let mimeType = null;
                offlineInserter(comBox, user, media, mimeType, token);
                offlineToken(token);
            }
        }
    }
    addData();
    commentBtn.innerHTML = 'Comment';
    commentBtn.removeAttribute('disabled');
    commentBtn.style.cursor = 'pointer';
    commentBox.value = '';

    fileDelete.click();
    infoSPot.innerHTML = "";
}

const getDataFromIDB = () => {
    let trans;
    try {
        trans = db.transaction(['offlineComment'], 'readonly')
    }
    catch (err) {
        return;
    }
    let req = trans.objectStore('offlineComment').getAll();
    req.onsuccess = (e) => {
        let record = e.target.result;
        if (record.length !== 0) {
            console.log('get data was success', record);
            record.forEach(x => {
                let imageUrl;
                if (currentProJId == x.proj_id) {
                    if (x.media) {
                        imageUrl = `data:${x.mime_type};base64,` + btoa(x.media);
                    }
                    offlineInserter(x.comment, x.appUser, imageUrl, x.mime_type, x.commentToken);
                }
            });
        }
        else {
            return;
        }
    }
    req.onerror = (e) => {
        console.log('No result found');
    }
}

let originalDBFile;
const offlineFrame = () => {

    const deleteData = () => {
        let offline = JSON.parse(localStorage.getItem('tracking-offline-comment'));
        let dataKey = offline.shift();

        let transaction = db.transaction(["offlineComment"], "readwrite");
        let objectStore = transaction.objectStore("offlineComment");
        let objectStoreRequest = objectStore.delete(dataKey);
        objectStoreRequest.onsuccess = () => {
            localStorage.setItem('tracking-offline-comment', JSON.stringify(offline));
            console.log('Deleted comment id of:', dataKey);
            setTimeout(() => {
                dbBusy = false;
            }, 1000);
        };
    };

    const letsCallFetch = (data) => {
        let formData = new FormData();
        formData.append('comment', data.comment);
        if (data.mediaFile) {
            formData.append('filename[]', data.mediaFile);
        }
        formData.append('offline_token', data.token);

        fetch(data.url, {
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
                if (data && !data.error) {
                    deleteData();
                    console.log('Offline comment sent successful');
                }
                else if (data.error) {
                    dbBusy = false;
                    console.log('Erro: Offline comment could not send');
                }
                console.log('Response', data);
            })
            .catch(err => {
                console.log(err);
                dbBusy = false;
            })
    }

    // convert the base64 image back to file object
    const urltoFile = (url, filename, mimeType) => {
        return (fetch(url)
            .then((res) => { return res.arrayBuffer(); })
            .then((buf) => { return new File([buf], filename, { type: mimeType }); })
        );
    }

    let trans;
    try {
        trans = db.transaction(['offlineComment'], 'readwrite');
    }
    catch (err) {
        console.log('Error:', err);
        return;
    }
    let tempkey = JSON.parse(localStorage.getItem('tracking-offline-comment')) || [];
    if (tempkey.length !== 0) {
        dbBusy = true;
        let req = trans.objectStore('offlineComment').get(tempkey[0]);
        req.onsuccess = (e) => {
            let record = e.target.result;
            if (record) {
                console.log('get success', record);
                (async () => {
                    let mediaUpload;
                    if (record.media !== undefined) {
                        await urltoFile(`data:${record.mime_type};base64,` + btoa(record.media), `media.${record.mediaExt}`, `${record.mime_type}`)
                            .then((file) => {
                                mediaUpload = file;
                            });
                    }
                    else {
                        mediaUpload = null;
                    }
                    let useObj = {
                        comment: record.comment,
                        url: record.url,
                        mediaFile: mediaUpload,
                        token: record.commentToken
                    }
                    letsCallFetch(useObj);
                })();
            }
            else {
                return;
            }
        }
    }
    else {
        return;
    }
}

//Latest version
let offline_id = setInterval(() => {
    if (navigator.onLine) {
        if (dbBusy === false) {
            offlineFrame();
        }
    }
}, 2000);

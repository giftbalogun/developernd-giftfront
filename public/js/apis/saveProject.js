
saveProjectFunc = (event, x, project_id = null) => {
//Preloder for the save sp
let saveBtn;
if(project_id == null){
    project_id = x.dataset.id;
    saveBtn = document.querySelector(`#saveProject${project_id}`)
}else {
    project_id = project_id;
    saveBtn = x;
}
console.log(saveBtn, project_id);

saveBtn.innerHTML =  `
    <div class="spinner-border spinner-border-sm" role="status">
        <span class="sr-only">Loading...</span>
    </div>
    `;


const routes = new Routes();
let url = `${routes.apiOrigin}${routes.saveProject(project_id)}`;

fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
        "Accept": "application/json",
        "Authorization": certified[0]
    },
})
.then(response => response.json())
.then(data => {
    saveBtn.innerHTML = `<img src="../../images/good_check.png" style="width:20px; height: 20px;" alt="saved"></img>`;
    console.log(data);
     //Notify the user in the info spot

    if(data){
        const infoSPot = document.querySelector('[data-info-modal]');
        infoSPot.innerHTML = '<span style="color:green;">A Project has been saved successfully!</span>';
        $('#notifyModal').modal('toggle')
        console.log(data)
   
        setTimeout(() => {
            $('#notifyModal').modal('toggle')
        }, 3000)
    }
}).catch(err => {
    if(err){
        const infoSPot = document.querySelector('[data-info-modal]');
        infoSPot.innerHTML = '<span style="color:tomato;">An unexpected error occured, please try again!</span>';
        if(project_id == null){
            saveBtn.innerHTML = `<span class="grey font-12px" data-id="${project_id}" id="saveProject${project_id}">
                                    <span class="saveProject"><i class="fa fas fa-2x fa-save"></i> Save</span>
                                </span>`;
        }else {
            saveBtn.innerHTML = `<span class="grey font-12px" id="saveProject" data-project-save><i class="fa fas fa-lg fa-save"></i>
                                 </span>`;
        }
        
        $('#notifyModal').modal('toggle')
        console.log(data)
    
        setTimeout(() => {
            $('#notifyModal').modal('toggle')
        }, 3000)
    }
    console.log(err)
})

  const saveProject = document.querySelector(`#saveProject`);
  console.log(saveProject);
};

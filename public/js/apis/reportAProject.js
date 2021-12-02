const reportBtn = document.querySelector('#passBtn');

reportBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const routes = new Routes();
    console.log(track_project_id)
    let url = `${routes.apiOrigin}${routes.reportAProject(track_project_id)}`;
    const infoSPot = document.querySelector('[data-info-modal]');

    const name = document.querySelector('#name');
    const email = document.querySelector('#email');
    const phone = document.querySelector('#phone');
    const location = document.querySelector('#location');
    const report = document.querySelector('#report-project');
    const file =  document.querySelector('#reportFile').files[0] || false;

    const formData = new FormData();
    
    if(location.value == ""){
        $('#responseModal').modal('toggle');
        $('#response').html(`Your location cannot be empty!`);
        setTimeout(() => {
            $('#responseModal').modal('toggle');
        }, 3000)
        reportBtn.innerHTML = `Try Again`;
        return false;
    }
    if(report.value == ""){
        $('#responseModal').modal('toggle');
        $('#response').html(`Report Field cannot be empty!`);
        setTimeout(() => {
            $('#responseModal').modal('toggle');
        }, 3000)
        reportBtn.innerHTML = `Try Again`;
        return false;
    }
    console.log(file)
    
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('phone', phone.value)
    formData.append('location', location.value);
    formData.append('report', report.value);
    if(file) {
        formData.append('image', file);
        console.log(formData.getAll('image'));
    }

    reportBtn.innerHTML = `
        <div class="spinner-border spinner-border-sm" role="status">
        </div>
        `;
    
    fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Authorization": localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null
        },
        redirect: 'follow',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        reportBtn.innerHTML = `Report Again`;
        console.log(data);
         //Notify the user in the info spot
        if(data.success){
            infoSPot.innerHTML = 'Your Report has been submitted succesfully!';
            document.querySelector('#report-project').value = ``;
            $('#notifyModal').modal('toggle')
            console.log(data)
       
            setTimeout(() => {
                $('#notifyModal').modal('toggle')
            }, 3000)
        }else {
            $('#responseModal').modal('toggle');
            $('#response').html(`<span style="color: red;">${data.message}</span>`);
            setTimeout(() => {
                $('#responseModal').modal('toggle');
            }, 8000)
        }
    }).catch(err => {
        if(err){
            reportBtn.innerHTML = `Try Again`;
            $('#responseModal').modal('toggle');
            $('#response').html(`
                <p style="color:red; font-size:14px;">An unexpected error occured, please try again!
                </p>`);
  
            setTimeout(() => {
                $('#responseModal').modal('toggle');
            }, 3000)
        }
        console.log(err)
    })
});
const importProject = document.querySelector('#import-project');
const infoSpan = document.querySelector('#info-span');
const importProjectBtn = document.querySelector('#importProjectBtn');
const importLoader = document.querySelector('#import-preloader');
let formData;




const getResponse = (data, status) => {
    console.log(data);
    console.log(status)
    switch (status) {
        case 422:
            $('#responseModal').modal('toggle');
            $('#response').html(`
                    <p style="color:red; font-size:14px;">Import failed:
                    ${JSON.stringify(data.errors).split('"').join('').split('{').join('').split('}').join('')}
                    </p>`);
            break;
        case 400:
            $('#responseModal').modal('toggle');
            $('#response').html(`
                    <p style="color:red; font-size:14px; text-align:center;">ImporFailed: ${data.error}<br>
                    <span style="color: #0b273d;">Next Range: ${data.next_range}</span>
                    </p>`);
            const next_range = data.next_range.split('-');
            document.getElementById('start_row').value = Number(next_range[0]);
            document.getElementById('end_row').value = Number(next_range[1]);
            formData.set('start_row', Number(next_range[0]));
            formData.set('end_row', Number(next_range[1]))
            break;
        case 401:
            $('#responseModal').modal('toggle');
            $('#response').html(`
                    <p style="color:red; font-size:14px;">Import failed: Invalid access, you need to be login!
                    </p>`);
            break;
        default:

        //Give a success message 
        infoSpan.style.color = 'green';
        infoSpan.textContent = data.success;
        //Update the row input for next row
        document.getElementById('start_row').value = Number(data.last_count_row.next_start_range);
        document.getElementById('end_row').value = Number(data.last_count_row.next_end_range);
        formData.set('start_row', Number(data.last_count_row.next_start_range));
        formData.set('end_row', Number(data.last_count_row.next_end_range));
        importProjectBtn.innerHTML = 'Continue Import';
    }
}



const validateImportForm = (event, importProject) => {
    event.preventDefault();
    infoSpan.style.color = 'red';
    //Convert form to formData
    formData = new FormData(importProject);

    const import_file = formData.get('import_file');
    const project_owner  = formData.get('project_owner');
    const sheet_name  = formData.get('sheet_name');
    const start_row  = formData.get('start_row');
    const end_row  = formData.get('end_row');
    const approved_year_one  = formData.get('approved_year_one');
    const approved_year_two  = formData.get('approved_year_two');

    console.log(formData.get('start_row'))
    if(formData.get('start_row') == 1){
        formData.set('start_row', 0);
    }

    formData.set('end_row', Number(formData.get('start_row')) + 499);
    document.getElementById('end_row').value = formData.get('end_row');
    formData.set('start_row', document.getElementById('start_row').value);

    formData.append('start_row', formData.get('start_row'));
    formData.append('end_row', formData.get('end_row'));

    console.log(formData.get('start_row'), formData.get('end_row'))

    if(import_file.name == ""){
        console.log(import_file.name)
        infoSpan.textContent = 'Import file is empty';
    }else if(project_owner == ""){
        infoSpan.textContent = 'Project Owner is needed';
    }else if(project_owner != project_owner.toLocaleUpperCase()){
        infoSpan.textContent = 'Project Owner field must be in UpperCase eg: [NDDC, NNPC]';
    }else if(sheet_name == ""){
        infoSpan.textContent = 'Sheet name is empty';
    }else if(start_row == ""){
        infoSpan.textContent = 'Start row is empty';
    }else if(end_row == ""){
        infoSpan.textContent = 'End row is empty';
    }else if(approved_year_one == ""){
        infoSpan.textContent = 'First approved year is empty';
    }else if(approved_year_two == ""){
        infoSpan.textContent = 'Second approved year is empty';
     }else {
        infoSpan.style.color = 'green';
        infoSpan.textContent = 'Form ready for import';
        importProjectBtn.removeAttribute('disabled');
    }

    console.log(formData.get('approved_year_one'));
    console.log(formData.get('approved_year_two'));

   
}

// importProject.addEventListener('keyup', (event) => validateImportForm(event, importProject))
importProject.addEventListener('change', (event) => validateImportForm(event, importProject))


const importProjectApi = (event, importProject) => {
    event.preventDefault();
    const routes = new Routes();
    const url = `${routes.apiOrigin}${routes.uploadExcel}`;
    console.log(url);
    let = status;
    
    //Catch error status code
    const errorHandling = (response) => {
        status = response.status;
        console.log(status)
        return response.json();
        
    }

    const data = JSON.parse(localStorage.getItem('DevelopND-user'));
    const {token} = data;
    console.log(token)

    const approved_year_one  = document.querySelector('#approved_year_one').value;
    const approved_year_two  = document.querySelector('#approved_year_two').value;

    console
    if(approved_year_one == approved_year_two){
        infoSpan.style.color = 'red';
         importLoader.style.display = 'none';
        infoSpan.textContent = 'Project Year cannot be thesame!';
        return false;
    }else if(Number(approved_year_one) > Number(approved_year_two)){
        infoSpan.style.color = 'red';
         importLoader.style.display = 'none';
        infoSpan.textContent = 'First Project year should be less than Second Project Year!';
        return false;
    }else if(Number(approved_year_two) - Number(approved_year_one) != 1){
        infoSpan.style.color = 'red';
         importLoader.style.display = 'none';
        infoSpan.textContent = 'Project year difference is far late!';
        return false;
    }

    //Start the preloder screen
    importLoader.style.display = 'block';
    importProjectBtn.innerHTML = 'Processing...';
    
    const allocated_years =  document.querySelector('#approved_year_one').value +'|'+ document.querySelector('#approved_year_two').value 
    formData.append('allocated_years', allocated_years);

    fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
            "Accept": "application/json",
            "Authorization": token
        },
        body: formData
    })
        .then(response => errorHandling(response))
        .then(data => {
            console.log(data);
            if(data){
                importLoader.style.display = 'none';
                importProjectBtn.innerHTML = 'Import'
                getResponse(data, status);
            }
        })
        .catch(err => {
            if(err) {
                importLoader.style.display = 'none';
                importProjectBtn.innerHTML = 'Import'
                // $('#responseModal').modal('toggle');
                // $('#response').html(`
                //     <p style="color:red; font-size:14px;">An unexpected error occured, please try again!
                //     </p>`);
            }
         
        })

}



importProject.addEventListener('submit', (event) => importProjectApi(event, importProject));


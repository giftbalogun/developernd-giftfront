const importProjectBtn = document.querySelector('#import-project');

importProjectRedirect = (event, simportProjectBtn) => {
    event.preventDefault();

    //Call an auth popup
    window.open(`${window.location.origin}/account/admin/import-project.html`, "Import Project", "height=700,width=600, resizable=yes");
}

importProjectBtn.addEventListener('click', (event) => importProjectRedirect(event, importProjectRedirect));


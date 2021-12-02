const searchBtn = document.querySelector('#project_search');
const searchInput = document.querySelector('#search_value');

redirectSearch = () => {
    console.log('open')
    const query = document.querySelector('#search_value').value;
    localStorage.setItem('action', 0);
    location.replace(`${window.location.origin}/project/search-results.html?query=${query}`);
}

searchBtn.addEventListener('click', () => redirectSearch());

// This is for Enter key
searchInput.addEventListener('keyup', (e) => {
    if(e.keyCode === 13 & e.target.value !== "") {
        redirectSearch();
    }
});


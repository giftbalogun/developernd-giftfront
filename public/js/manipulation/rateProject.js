
const ratedStars = Array.from(document.querySelectorAll('.rate'));
const starInfo = document.querySelector('[data-star-info]');
const submit_cancle_btn = Array.from(document.querySelectorAll('.strike'));
const loginInfo = document.querySelector('[data-login-commnd]');
let ratedValue = null;

console.log(ratedStars);
const trackClickedStar = (event, x, i, ratedStars) => {

    const currentUser = localStorage.getItem('DevelopND-user') || false;
    if(currentUser){
            
        ratedStars[0].classList.remove('checked', 'animated', 'fadIn'); ratedStars[1].classList.remove('checked', 'animated', 'fadIn');
        ratedStars[2].classList.remove('checked', 'animated', 'fadIn'); ratedStars[3].classList.remove('checked', 'animated', 'fadIn');
        ratedStars[4].classList.remove('checked', 'animated', 'fadIn');

        ratedStars.map((x, v) => {
            if(v <= i){
                x.classList.add('checked', 'animated', 'fadIn');
                if(v == 0){
                    starInfo.textContent = 'Very Bad';
                }else if(v == 1){
                    starInfo.textContent = 'Poor Outcome';
                }else if(v == 2){
                    starInfo.textContent = 'Trying';
                }else if(v == 3) {
                    starInfo.textContent = 'Good Job';
                }else if(v == 4){
                    starInfo.textContent = 'Awesome Job';
                }
            }
        });
        //Call the api to submit request
        ratedValue = i+1;//Check the api folder in the StoreRatingApi file
        console.log(ratedValue)
        submit_cancle_btn[0].style.display = 'block';
        submit_cancle_btn[1].style.display = 'block';
    }else {
        loginInfo.style.display = 'block';
    }

}

ratedStars.map((x, i) => {
    x.addEventListener('click', (event) => trackClickedStar(event, x, i, ratedStars));
    x.addEventListener('mouseover', (event) => trackClickedStar(event, x, i, ratedStars))
});

submit_cancle_btn[1].addEventListener('click', (event) => {
    ratedStars[0].classList.remove('checked'); ratedStars[1].classList.remove('checked');
    ratedStars[2].classList.remove('checked'); ratedStars[3].classList.remove('checked');
    ratedStars[4].classList.remove('checked');

    submit_cancle_btn[0].style.display = 'none';
    submit_cancle_btn[1].style.display = 'none';
    starInfo.textContent = '';
});
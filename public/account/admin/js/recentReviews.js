const reviewHolder = document.querySelector('#review-holder')
const spinnerReviews = document.querySelector('#spinner-reviews')
const getRecentReviews = () => {
  const routes = new Routes();
  const url = `${ routes.apiOrigin}${ routes.recentReviews }`;
  const data = JSON.parse(localStorage.getItem('DevelopND-user'));
  const {
    token
  } = data;
  console.log(certified)
  fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Accept": "aplication/json",
        "Authorization": token
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(url);
      console.log(data);
      spinnerReviews.style.display = 'none';
      let recentReviewsObject = data.recent_reviews;
      let imageSrc = '';
      if (recentReviewsObject.length > 0) {
        recentReviewsObject.map(recentReview => {
          console.log(recentReview);
          if (recentReview.user.user_mode == "DevelopND") {
            imageSrc = `${data['image_link']}${recentReview.user.image}`;
            console.log(imageSrc);
          } else {
            imageSrc = `${recentReview.user.image}`;
            console.log(imageSrc);
          }
          reviewHolder.innerHTML += `
              <div class="recent-review-info col-12 border-bottom mt-3 row mx-0 px-0">
              <div class="user-image col-2 px-0">
                  <div class="image-con border ml-1 mt-1">
                      <img src="${imageSrc}" alt="">
                  </div>
              </div>
              <div class="review-details col-6 px-2">
                  <p class="mb-0 mt-1">${
                    recentReview.user.name
                      ? recentReview.user.name
                      : "Name Not Set"
                  }</p>
                  <span>${
                    recentReview.review_description
                  }
                  <!-- <a href="">read more...</a> -->
                  </span>
              </div>
              <div class="project-title col-4 px-0">
                  <p class="mt-2 mb-0 font-12px">${recentReview.project.project_description} <span>ID: ${recentReview.project.unique_id}</span></p>
              </div>
          </div>
                  `;
          imageSrc = ''
        });
      } else {
        reviewHolder.innerHTML = `
            <div class="col-12">
                <div class="mt-5" role="status">
                  <p style="color: center; color: grey; font-weight: bold; text-align: center;">No Recent  Reviews</p>
                </div>
            </div>`;
      }
    })
    .catch(err => console.error(err))
}
getRecentReviews();
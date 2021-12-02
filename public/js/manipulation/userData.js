displayUserData = () => {
  let nameSplit;
  const userInfo = JSON.parse(localStorage.getItem("DevelopND-user"));
  console.log(userInfo);
  const { user, image_link } = userInfo;
  console.log(user);
  let {
    name,city,user_mode,phone,
    image,bio,email,state,gender,lga, 
    user_type,created_at_for_humans, image_type
  } = user;

  console.log(city);
  if (city == null) {
    city = "Location: Not set yet";
  }
  if (bio == null) {
    bio = "Bio: Not set, set a bio now";
  }
  if (city == null) {
    city = "City: Not set";
  }
  if (state == null) {
    state = "State: Not set";
  }
  if (lga == null) {
    lga = "L.G.A: Not set";
  }
  if (gender == null) {
    gender = "Gender: Not set";
  }
  if (email == null) {
    email= "Email: Not set";
  }
  if (phone == null) {
    phone= "Phone: Not set";
  }
  const dataConName = document.querySelector("#data-con-name") || false;
  const dataConCity = document.querySelector("#data-con-city") || false;
  const dataUserImage = document.querySelector("#user-image");
  const navUserImage = document.querySelector("#nav-user-image");
  const navName = document.querySelector("#nav-name");
  const puName = document.querySelector("#pu-name");
  const puEmail = document.querySelector("#pu-email");
  console.log(window.location.pathname);

  if (window.location.pathname === "/account/user/profile-settings.html" || window.location.pathname === "/account/user/profile-settings") {
    const nameListed = document.querySelector("#name-listed");
    const cityListed = document.querySelector("#city-listed");
    const bioListed = document.querySelector("#bio-listed");
    const phoneListed = document.querySelector("#phone-listed");
    const emailListed = document.querySelector("#email-listed");
    const stateListed = document.querySelector("#state-listed");
    const lgaListed = document.querySelector("#lga-listed");
    const genderListed = document.querySelector("#gender-listed");
    const userTypeListed = document.querySelector("#user-type-listed");
    const imageListed = document.querySelector("#image-listed");
    const accountCreated = document.querySelector("#accountCreated");
    console.log(user_type, image_link, image)
    image_type == "DevelopND" ? imageListed.src = `${image_link}${image}`: imageListed.src = `${image}`

    nameListed.textContent = name;
    bioListed.textContent = bio;
    phoneListed.textContent = phone;
    emailListed.textContent = email;
    stateListed.textContent = state;
    cityListed.textContent = city;
    lgaListed.textContent = lga;
    genderListed.textContent = gender;
    userTypeListed.textContent = user_type;
    accountCreated.textContent = created_at_for_humans;
    

    dataConName.innerHTML = name;
    dataConCity.innerHTML = city;
  }
  console.log(name);
  if(name){
    nameSplit = name.split(' ');
    if(nameSplit[1]){
      nameSplit = `${nameSplit[0].charAt(0).toUpperCase()} ${nameSplit[1].charAt(0).toUpperCase()}`;
    }else {
      nameSplit = `${nameSplit[0].charAt(0).toUpperCase()}`;
    }
  }


  if(user_type == 'admin'){
    name != null ? navName.textContent = nameSplit : navName.textContent = `Hello Admin`;
    if (dataConName) {
       name != null ? dataConName.textContent = name : dataConName.textContent = `Hello Admin`;
    }
  } else {
    name != null ? navName.textContent = nameSplit : navName.textContent = `Hello Member`;
    if (dataConName){
      name != null ? dataConName.textContent = name : dataConName.textContent = `Hello Member`;
    }
  }
  
  if (dataConCity){
  dataConCity.textContent = `${city} / ${state}`;

  if (image_type == "DevelopND") {
    dataUserImage.src = `${image_link}${image}`;
    navUserImage.src = `${image_link}${image}`;
  }else {
    dataUserImage.src = `${image}`;
    navUserImage.src = `${image}`;
  }
}
};
displayUserData();

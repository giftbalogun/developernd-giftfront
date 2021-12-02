const insertToEditForm = () => {

    const userData = JSON.parse(localStorage.getItem('DevelopND-user'));
    console.log(userData);

    const {user, image_link} = userData;

    const {name, email, bio, phone, city, state, lga, image, user_type, gender, user_mode} = user;

    console.log(name)
    document.querySelector('#pu-name').value = name;
    document.querySelector('#pu-email').value = email;
    document.querySelector('#bio').value = bio ? bio : null;
    console.log(phone)
    document.querySelector('#pu-phone').value = phone ? phone : null;

    if(state){
        var x = document.getElementById("state");
        var option = document.createElement("option");
        option.text = state;
        option.value = state;

        x.add(option, x[0]);
        x.selectedIndex = "0";
    }
    if(city){
        var x = document.getElementById("city");
        var option = document.createElement("option");
        option.text = city;
        option.value = city;
    
        x.add(option, x[0]);
        x.selectedIndex = "0";
    }
    if(lga){
        document.querySelector('#lga').value = lga ? lga : null;
    }
    if(gender){
        var x = document.getElementById("gender");
        var option = document.createElement("option");
        option.text = gender.charAt(0).toUpperCase() + gender.slice(1);
        option.value = gender.charAt(0).toUpperCase() + gender.slice(1);            
    
        x.add(option, x[0]);
        x.selectedIndex = "0";
    }



}

insertToEditForm();
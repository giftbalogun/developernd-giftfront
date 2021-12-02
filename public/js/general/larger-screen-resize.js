const contianerDOM = document.querySelector('#containerDOM');

function myFunction(x) {
    if (x.matches) { // If media query matches
      contianerDOM.classList.remove('container-fluid')
      contianerDOM.classList.add('container');
    } else {
     contianerDOM.classList.remove('container');
     contianerDOM.classList.add('container-fluid')
    }
  }
  
//   var x = window.matchMedia("(max-width: 700px)")
  var x = window.matchMedia("(min-width: 1400px)")
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes
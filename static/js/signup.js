function on() {
    // $("overlay-background").fadeIn();
    document.getElementById("overlay-background").style.display = "block";
  }
  
  function off() {
    document.getElementById("overlay-background").style.display = "none";
  }
  
var first_name;
var last_name;
var email;
var year;
var committeeArr = [];
var clearance;

  async function sendForm2(){
    first_name = document.getElementById("first_name2").value
    last_name = document.getElementById("last_name2").value
    email = document.getElementById("email").value
    year = document.getElementById('year').value
    committee = document.getElementById('committee')
    clearance = document.getElementById('clearance').value
    for ( var i = 0; i < committee.selectedOptions.length; i++) {
        var val = committee.selectedOptions[i].value
        committeeArr.push(val)
        console.log("VAL" +val);
    }
    console.log(first_name)
    console.log(last_name)
    console.log(email)
    console.log(year)
    console.log(committeeArr)
    console.log(clearance)

    let csrftoken = getCookie('csrftoken');

    var formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("year", year)
    formData.append("committee", committeeArr)
    formData.append("clearance", clearance)
    const resp = await fetch("http://18.216.97.68/signup-submit/",{
        method:"POST",
        body: formData,
        headers: { "X-CSRFToken": csrftoken },
    });
    response = await resp.json();
    response = response.form_error
    console.log("Response: "+response)
    if(response == "Submission successful"){
      console.log("reached")
      submitSuccess2()
    }else {
        formFailEmpty2(response);
    }
}

function submitSuccess2(){
    console.log("reached")
    document.getElementById("first_name2").value = ""
    document.getElementById("last_name2").value = ""
    document.getElementById("email").value = ""
    document.getElementById('year').value = ""
    document.getElementById('committee').value = ""
    document.getElementById('clearance').value = ""
    let submitBtn = document.getElementById('submit-btn');
    window.location.href = "#success-msg"
    let btn = document.getElementsByClassName("hidden-link") 
    $(btn).trigger('click'); 
    // Please check your email for a verification email from us. :)
}

function formFailEmpty2(message){
    let msg =  document.getElementById("form-msg")
    console.log(message)
    if(first_name == ""){
        document.getElementById('first_name2_req').innerHTML = "*";
    }
    if(last_name == ""){
        document.getElementById('last_name2_req').innerHTML = "*";
    }
    if(email == ""){
        document.getElementById('email2Req').innerHTML = "*";
    }
    msg.innerHTML = "** "+message+" **";
    msg.style = "color: white;";
}

// The following function are copying from 
// https://docs.djangoproject.com/en/dev/ref/csrf/#ajax
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

  // do a check to make sure that the email is accurate!

//   function increaseSize(){
//     document.getElementById("close-button").style.height = "2.5em";
//     document.getElementById("close-button").style.width = "2.5em" ; 
//     document.getElementById("close-button").style.marginTop = "5px";
//   }

//   function decreaseSize(){
//     document.getElementById("close-button").style.height = "2em";
//     document.getElementById("close-button").style.width = "2em" ; 
//   }
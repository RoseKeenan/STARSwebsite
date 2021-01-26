
scroll()

window.location.href = "http://ec2-18-216-97-68.us-east-2.compute.amazonaws.com/"
let didScroll = false;
function scroll(){
    console.log('works')
    window.onscroll = () => didScroll = true;
    setInterval(() => {
        if ( didScroll ) {
            didScroll = false;
            console.log('Someone scrolled me!')
            isInViewport(document.getElementById("announcements"))
        }
    }, 350);
}


isInViewport(document.getElementById("announcements"))

function isInViewport(element) {
    console.log(element)
    const rect = element.getBoundingClientRect();
    var bool = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
    console.log(bool);
    return bool;
}

function glow(){
    
}


async function sendForm(){
    var first_name = document.getElementById("first_name").value
    console.log(first_name)
    var last_name = document.getElementById("last_name").value
    console.log(last_name)
    var email = document.getElementById("email").value
    console.log(email)
    var relation = document.getElementById('relation').value
    console.log(relation)
    let csrftoken = getCookie('csrftoken');

    var formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("relation", relation)
    const resp = await fetch("http://3.14.10.39/mailinglist/",{
        method:"POST",
        body: formData,
        headers: { "X-CSRFToken": csrftoken },
    });
    response = await resp.json();
    response = response.form_error
    console.log(response)
    if(response == "Submission successful"){
        submitSuccess()
    }else {
        formFailEmpty(response);
    }
}

function submitSuccess(){
    document.getElementById("first_name").value = ""
    document.getElementById("last_name").value = ""
    document.getElementById("email").value = ""
    document.getElementById('relation').value = ""
    let msg =  document.getElementById("form-message")
    msg.innerHTML = "Submission successful! "
    // Please check your email for a verification email from us. :)
    msg.style = "color: white;";
}

function formFailEmpty(message){
    let msg =  document.getElementById("form-message")
    console.log(message)
    msg.innerHTML = message;
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
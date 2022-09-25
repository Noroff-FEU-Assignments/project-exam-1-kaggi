let contactLink = document.querySelector( "#contact_link" );
contactLink.classList.add( "current_page" );

const mightandmagicworldsContactURL = "https://mightandmagicworlds.lolalohne.com/wp-json/wp/v2/pages/68";

const form = document.querySelector(".contactForm");

const yourName = document.querySelector("#name");
const subject = document.querySelector("#subject");
const email = document.querySelector("#email");
const address = document.querySelector("#address");
const message = document.querySelector("#message");
const submittingSuccess = document.querySelector("#successSubmittingForm");

const nameError = document.querySelector("#nameError");
const subjectError = document.querySelector("#subjectError");
const emailError = document.querySelector("#emailError");
const addressError = document.querySelector("#addressError");
const messageError = document.querySelector("#messageError");

const emailTest = /\S+@\S+\.\S+/;

let nameOK = false;
let subjectOK = false;
let emailOK = false;
let messageOK = false;


function checkForm(event) {
    event.preventDefault();
    
     if (testLength(yourName.value, 5)) {
        nameOK = true;
        nameError.style.display = "none";     }
    else {
        nameError.style.display = "block";                 
    }

    if (testLength(subject.value, 15)) {
        subjectOK = true;
        subjectError.style.display = "none";               
    }
    else {
        subjectError.style.display = "block";               
    }

    if (emailTest.test(email.value)) {
        emailOK = true;
        emailError.style.display = "none";        
    }
    else {
        emailError.style.display = "block";                     
    }
   

    if (testLength(message.value, 25)) {
        messageOK = true;
        messageError.style.display = "none";        
    }
    else {
        messageError.style.display = "block";               
    }  

    if(nameOK && subjectOK && emailOK && messageOK){
        submittingSuccess.innerHTML = `<div id="messageSent"><p>Thank you for contacting me. Your message has been sent.</p></div>`;
        form.reset();
        nameOK = false;
        subjectOK = false;
        emailOK = false;        
        messageOK = false;       
        
    }  
    else {
        submittingSuccess.innerHTML = "";
        
    } 
          
}

function testLength(value, testValue) {
    if (value.trim().length > testValue) {        
        return true;
    }
    else {        
        return false;
    }
}


form.addEventListener("submit", checkForm);

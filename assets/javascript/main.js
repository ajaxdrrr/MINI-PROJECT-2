//modals
var loginModal = document.getElementById("login-modal");
var registerModal = document.getElementById('register-modal');
var logoutModal = document.getElementById('logout-modal');

//nav register / login
var loginBtn = document.querySelector("#login-btn");
var registerBtn = document.querySelector('#register-btn');

//modal close buttons
var closeBtn = loginModal.getElementsByClassName("close")[0];
var closeBtn2 = registerModal.getElementsByClassName("close")[0];
var closeBtn3 = logoutModal.getElementsByClassName("close")[0];

//modal show vice versa
var registerShow = loginModal.querySelector('#registerShow');
var loginShow = registerModal.querySelector('#loginShow');

//login form inputs
let username = document.querySelector('#useremail');
let userpass = document.querySelector('#userpass');

//error msg display span
let resSpan = document.querySelector('#msg');
let resSpan2 = document.querySelector('#msg2');

//login button in login modal
let loginMeBtn = document.querySelector('#login');

//register inputs
let fname = registerModal.querySelector('#firstname');
let lname = registerModal.querySelector('#lastname');
let email = registerModal.querySelector('#remail');
let rpass = registerModal.querySelector('#rpass');
let rpassc = registerModal.querySelector('#confirmpass');
let create = registerModal.querySelector('#create');

//local storage
let loginState = JSON.parse(localStorage.getItem("loginState"));
let credentialStore = JSON.parse(localStorage.getItem("credentials"));

//error styles stored in variables
let err_border = "2px solid #aa3939";
let no_err_border = "1px solid gray";
//error message array
let msg = [];

// user logged name and image
let uImage = document.querySelector('#accountDropdown');
let uName = document.querySelector('#userlogged');

//logout btn
let logoutz = document.querySelector('#logoutz');

//Jobs

let jobGridDiv = document.querySelector('#job-grid');

//landing buttons
let getstarted1 = document.querySelector('#get-started1');
let getstarted2 = document.querySelector('#get-started2');

function loggedInState() {

    if(loginState == null) {
    
        loginState = [];
    
    }

    if (loginState.length === 0) {

        

    } else {

        registerBtn.classList.add("d-none");

        loginBtn.classList.add("d-none");

        var userIsLogged = document.querySelector('#show');

        userIsLogged.classList.remove("d-none");

        uImage.src = loginState[0].img;
        uName.innerHTML = loginState[0].name;

        logoutz.onclick = () => {

            destroySession();

        }

    }
    
}
createJobCards();
loggedInState();

loginBtn.onclick = () => {
  loginModal.classList.add("show");
}

registerBtn.onclick = () => {
    registerModal.classList.add("show");
  }

closeBtn.onclick = () => {
  loginModal.classList.remove("show");
}

closeBtn3.onclick = () => {
    logoutModal.classList.remove("show");
  }
closeBtn2.onclick = () => {
  registerModal.classList.remove("show");
}

getstarted1.onclick = () => {
    loginModal.classList.add("show");
}

getstarted2.onclick = () => {
    loginModal.classList.add("show");
}

registerShow.onclick = () => {
    registerModal.classList.add("show");
    loginModal.classList.remove("show");
}

loginShow.onclick = () => {
    loginModal.classList.add("show");
    registerModal.classList.remove("show");
}


loginMeBtn.onclick = e => {

    e.preventDefault();
    // authenticateCredentials();
    scanPayload();

};

fname.onclick = () => {
    fname.style.border = no_err_border;
    fname.value = "";
}
lname.onclick = () => {
    lname.style.border = no_err_border;
    lname.value = "";
}
email.onclick = () => {
    email.style.border = no_err_border;
    email.value = "";
}
rpass.onclick = () => {
    rpass.style.border = no_err_border;
}
rpassc.onclick = () => {
    rpassc.style.border = no_err_border;
}

create.onclick = e => {

    e.preventDefault();

    let msg2 = [];

    if (credentialStore == null) {
        credentialStore = [];
    }
    let matchit = rpass.value;
    let matchit2 = rpassc.value;

    userpass.style.border = err_border;
      username.style.border = err_border;

    if(fname.value === "") {
        fname.style.border = err_border;
        msg2.push("First name is required");
        fname.style.color = "#aa3939";
    }
    if(lname.value === "") {
        lname.style.border = err_border;
        msg2.push("Last name is required");
        lname.style.color = "#aa3939";
    }
    if(email.value === "") {
        email.style.border = err_border;
        email.style.color = "#aa3939";
    }
    if(rpass.value === "") {
        rpass.style.border = err_border;
    }
    if(rpassc.value === "") {
        rpassc.style.border = err_border;
    }

    if (rpass.value !== rpassc.value || rpass.value == "") {
        rpass.style.border = err_border;
        rpassc.style.border = err_border;
    } else {
        rpass.style.border = no_err_border;
        rpassc.style.border = no_err_border;
    }

    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regular expression to match valid email addresses
    
    if (email_regex.test(email.value)) {
    } else {
        msg2.push("Email bad format");
        email.style.border = err_border;
    }

      if (!/(?=.*[a-z])/.test(matchit)) {
        msg2.push("Password must contain at least one lowercase letter");
      }
      if (!/(?=.*[A-Z])/.test(matchit)) {
        msg2.push("Password must contain at least one uppercase letter");
      }
      if (!/(?=.*\d)/.test(matchit)) {
        msg2.push("Password must contain at least one digit");
      }
      if (!/[a-zA-Z\d]{8,10}/.test(matchit)) {
        msg2.push("Password must be between 8-10 characters in length");
      }
      if (matchit !== matchit2) {
        msg2.push("Passwords do not match");
        rpass.style.border = err_border;
        rpassc.style.border = err_border;
      }
      if (msg2.length === 0) {
        
        let userInfo = {
            firstname: fname.value,
            lastname: lname.value,
            email: email.value,
            password: rpass.value,
            img : "assets/images/user.png"
        }
    
        credentialStore.push(userInfo);
    
        localStorage.setItem("credentials", JSON.stringify(credentialStore));

        
        loginModal.classList.add("show");
        registerModal.classList.remove("show");

      } else {
        console.log("Error.");
      }
      resSpan2.innerHTML = msg2.join("<br>");
    
    


}

username.onkeyup = () => {

    username.length >= 1 ? username.style.border = err_border : username.style.border = no_err_border ; resSpan.innerHTML = "";

};

userpass.onkeyup = () => {

    userpass.length >= 1 ? userpass.style.border = err_border : userpass.style.border = no_err_border ; resSpan.innerHTML = "";

};
//local storage registration onle :D
function authenticateCredentials() {

    if (!username.value.length >= 1 && !userpass.value.length >= 1) {

        username.style.border = err_border;
        userpass.style.border = err_border;
        resSpan.classList.toggle('error');
        msg.push("Email and Password is required");
        resSpan.innerHTML = msg;
        msg.pop();

    } else if (!username.value.length >= 1) {

        username.style.border = err_border;
        resSpan.classList.toggle('error');
        msg.push("Email is required");
        resSpan.innerHTML = msg;
        msg.pop();

    } else if (!userpass.value.length >= 1) {

        userpass.style.border = err_border;
        resSpan.classList.toggle('error');
        msg.push("Password is required");
        resSpan.innerHTML = msg;
        msg.pop();

    } else {

        if(credentialStore == null) {

            userpass.style.border = err_border;
            username.style.border = err_border;
            resSpan.classList.toggle('error');
            msg.push("Credentials doesn't match our record");
            resSpan.innerHTML = msg;
            msg.pop();

        } else {

            let foundMatch = false; // flag to keep track if match is found
            for (let i = 0; i < credentialStore.length; i++) {
                if (username.value === credentialStore[i].email && userpass.value === credentialStore[i].password) {
                    
                    registerBtn.classList.add("d-none");

                    loginBtn.classList.add("d-none");

                    var userIsLogged = document.querySelector('#show');

                    userIsLogged.classList.remove("d-none");

                    uImage.src = `${credentialStore[i].img}`;
                    uName.innerHTML = `${credentialStore[i].firstname}\ ${credentialStore[i].lastname}`;

                    if (loginState == null) {
                        loginState = [];
                    }

                    let state = {

                        name: `${credentialStore[i].firstname}\ ${credentialStore[i].lastname}`,
                        img: `${credentialStore[i].img}`,
                        status: true
                
                    }    

                    loginState.push(state);

                    localStorage.setItem("loginState", JSON.stringify(loginState));

                    logoutz.onclick = () => {
                        destroySession();
                    }

                    foundMatch = true;
                    
                    
                    loginModal.classList.remove("show");
                    window.location.href = "./index.html";
                    break;
                    
                }
            }
                if (!foundMatch) {
                    userpass.style.border = err_border;
                    username.style.border = err_border;
                    resSpan.classList.toggle('error');
                    const msg = "Credentials don't match our records";
                    resSpan.innerHTML = msg;
                }

        }

    }

}

function scanPayload() {

fetch("https://raw.githubusercontent.com/ajaxdrrr/MINI-PROJECT-2/dev/payloads/user.JSON").then(response => response.json()).then(data => {

    let matchFound = false;
    data.users.forEach(user => {

      if (user.email === username.value && user.password === userpass.value) {

        registerBtn.classList.add("d-none");

        loginBtn.classList.add("d-none");

        var userIsLogged = document.querySelector('#show');

        userIsLogged.classList.remove("d-none");

        uImage.src = `${user.img}`;
        uName.innerHTML = `${user.firstname}\ ${user.lastname}`;

        if (loginState == null) {
            loginState = [];
        }

        let state = {

            name: `${user.firstname}\ ${user.lastname}`,
            img: `${user.img}`,
            status: true
    
        }    

        loginState.push(state);

        localStorage.setItem("loginState", JSON.stringify(loginState));

        logoutz.onclick = () => {
            destroySession();
        }

        matchFound = true;
        loginModal.classList.remove("show");
        window.location.href = "./index.html";
        return false;
        
      }

    });

    if (!matchFound) {

        authenticateCredentials();

    }

}).catch(error => console.error(error));

  

}

function destroySession() {

    localStorage.removeItem("loginState");

    while(loginState.length > 0) {

        loginState.shift();

    }

    localStorage.setItem("loginState", JSON.stringify(loginState));

    registerBtn.classList.remove("d-none");

    loginBtn.classList.remove("d-none");

    var userIsLogged = document.querySelector('#show');

    userIsLogged.classList.add("d-none");

    logoutModal.classList.add("show");

}


function createJobCards() {

    fetch("https://raw.githubusercontent.com/ajaxdrrr/MINI-PROJECT-2/dev/payloads/jobs.JSON").then(response => response.json()).then(data => {

        data.jobs.forEach(job => {

            let mainContainer = document.createElement('div');
            let cardContainer = document.createElement('div');
            let jobType = document.createElement('p');
            let strong = document.createElement('strong');
            let jobImg = document.createElement('img');
            let cardBody = document.createElement('div');
            let jobTitle = document.createElement('h4');
            let jobLocation = document.createElement('p');
            let browseBtn = document.createElement('a');

            jobGridDiv.appendChild(mainContainer);
            mainContainer.appendChild(cardContainer);
            cardContainer.appendChild(jobType);
            jobType.appendChild(strong);
            cardContainer.appendChild(jobImg);
            cardContainer.appendChild(cardBody);
            cardBody.appendChild(jobTitle);
            cardBody.appendChild(jobLocation);
            cardBody.appendChild(browseBtn);

            mainContainer.classList.add(`col-sm-6`);
            mainContainer.classList.add(`col-md-4`);
            mainContainer.classList.add(`col-lg-4`);

            cardContainer.classList.add("card");
            cardContainer.classList.add("p-3");
            cardContainer.classList.add("text-center");
            cardContainer.classList.add("mb-3");

            jobType.classList.add("card-text");
            jobType.classList.add("text-right");
            jobType.classList.add("text-center");

            if (`${job.type}` === "Internship") {

                jobType.classList.add("text-primary");
                jobType.classList.add("border-primary");
                jobType.classList.add("border");
                strong.classList.add("border-success");

            } else if (`${job.type}` === "Full-Time") {

                jobType.classList.add("text-success");
                jobType.classList.add("border-success");
                jobType.classList.add("border");
                jobType.classList.add("border-success");

            } else {

                jobType.classList.add("text-danger");
                jobType.classList.add("border-danger");
                jobType.classList.add("border");
                jobType.classList.add("border-danger");

            }
            

            strong.classList.add("border");
            strong.classList.add("border-primary");
            strong.classList.add("p-2");

            jobImg.classList.add("card-img-top");
            jobImg.classList.add("img-fluid");

            jobImg.src = `${job.img}`;

            cardBody.classList.add("card-body");

            jobTitle.classList.add("card-title");
            jobTitle.classList.add("text-center");
            jobTitle.innerHTML = `${job.position}`;

            jobLocation.classList.add("card-text");
            jobLocation.innerHTML = `<i class="bi bi-geo-alt-fill"></i>${job.address}`

            browseBtn.classList.add("btn");
            browseBtn.classList.add("btn-outline-success");
            browseBtn.innerHTML = "Browse Job";


            jobType.innerHTML = `${job.type}`;

    
        });
    
    }).catch(errno => console.error(errno));

}



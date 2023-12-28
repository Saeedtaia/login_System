var noAcount =document.querySelector('#noAcount');
var login = document.querySelector('#login');
var loginBtn = document.querySelector('#loginBtn');
var registerSwitch = document.querySelector('#registerSwitch');
var loginSwitch = document.querySelector('#loginSwitch');
var register = document.querySelector('#register');
var firstName = document.querySelector('#firstName');
var regexFirstName = /^[A-Za-z'-]{3,12}$/;
var lastName = document.querySelector('#lastName');
var regexLastName = /^[A-Za-z'-]{3,12}$/;
var userPassword = document.querySelector('#userPassword');
var regexpassword = /^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
var userEmail = document.querySelector('#userEmail');
var regexMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\S$/;
var passwordResult;
var firstNameResult;
var lastNameResult;
var mailResult;
var showPassword = document.querySelector('#showPassword');
var bar = document.querySelectorAll('#login .bar');
var usersContainer;
if(localStorage.getItem('users')){
    usersContainer = JSON.parse(localStorage.getItem('users'));
    console.log('added');
}else{
    usersContainer = [];
    console.log('no users');
}
var currentRandom;
var keyTest;
var wave = document.querySelectorAll('.wave-group');
var loginMailResult;
var loginPassResult;
var boxshadow = `3px 3px 10px rgba(0,0,0,1), -1px -1px 6px rgba(255, 255, 255, 0.4), inset 3px 3px 10px rgba(0,0,0,1), inset -1px -1px 6px rgba(255, 255, 255, 0.4) `;
var boxshadowleave = `3px 3px 10px rgba(0,0,0), -1px -1px 6px rgba(255, 255, 255, 0.4)`;
//!animation add to divs of login and register
noAcount.addEventListener('mouseenter', function(eventInfo){
    noAcount.style.boxShadow = boxshadow;
});
noAcount.addEventListener('mouseleave', function(eventInfo){
    noAcount.style.boxShadow = boxshadowleave;
});
login.addEventListener('mouseenter', function(eventInfo){
    login.style.boxShadow = boxshadowleave;
});
login.addEventListener('mouseleave', function(eventInfo){
    login.style.boxShadow = boxshadow;
});
//! switch from login to register
registerSwitch.addEventListener('click', function(eventInfo){
    login.classList.add('d-none');
    noAcount.classList.remove('d-none');
    clearForm(wave[4].firstElementChild );
    clearForm( wave[5].firstElementChild);
});
//!switch from registration to login
loginSwitch.addEventListener('click', function(eventInfo){
    login.classList.remove('d-none');
    noAcount.classList.add('d-none');
    clearForm(firstName);
    clearForm(lastName);
    clearForm(userEmail);
    clearForm(userPassword);
});
//! chick regex of first name
firstName.addEventListener('keyup', function(eventInfo){
    firstNameResult = regexTest(firstName , regexFirstName , this.value);
});
//!check regex of last name
lastName.addEventListener('keyup', function(eventInfo){
    lastNameResult = regexTest(lastName , regexLastName , this.value);
});
//!chick regex of email
userEmail.addEventListener('keyup', function(eventInfo){
    mailResult = regexTest(userEmail , regexMail , this.value);
});
//!take password and chick
userPassword.addEventListener('keyup', function(eventInfo){
    passwordResult = regexTest(userPassword ,regexpassword ,this.value);
});
//! show or hide password
showPassword.addEventListener('click', function(eventInfo){
    if(showPassword.classList.contains('fa-eye')){
        showPassword.classList.remove('fa-eye');
        showPassword.classList.add('fa-eye-slash');
        userPassword.removeAttribute('type')
        userPassword.setAttribute('type', 'password');
    }else if(showPassword.classList.contains('fa-eye-slash')){
        showPassword.classList.add('fa-eye');
        showPassword.classList.remove('fa-eye-slash');
        userPassword.removeAttribute('type')
        userPassword.setAttribute('type', 'text');
    }
});
wave[5].firstElementChild.nextElementSibling.addEventListener('click', function(e) {
    if(wave[5].firstElementChild.nextElementSibling.classList.contains('fa-eye')){
        wave[5].firstElementChild.nextElementSibling.classList.remove('fa-eye');
        wave[5].firstElementChild.nextElementSibling.classList.add('fa-eye-slash');
        wave[5].firstElementChild.removeAttribute('type')
        wave[5].firstElementChild.setAttribute('type', 'password');
    }else if(wave[5].firstElementChild.nextElementSibling.classList.contains('fa-eye-slash')){
        wave[5].firstElementChild.nextElementSibling.classList.add('fa-eye');
        wave[5].firstElementChild.nextElementSibling.classList.remove('fa-eye-slash');
        wave[5].firstElementChild.removeAttribute('type')
        wave[5].firstElementChild.setAttribute('type', 'text');
    }
});
//! test regex pattern of lastname and email and password and password
function regexTest(inputData , regexPattern ,ValueOFThis){
    if(regexPattern.test(ValueOFThis)){
        inputData.classList.add('text-success');
        inputData.classList.remove('text-danger');
        return true;
    }else{
        inputData.classList.remove('text-success');
        inputData.classList.add('text-danger');
        return false;
    }
}
//! check if the user already register by this email address
function userTest(index){
    var term = index.value;
    if(localStorage.getItem('users')){
        for(var i = 0; i < usersContainer.length; i++){
            if(usersContainer[i].Email.includes(term)){

                return false;
            }else if(index.value ===''){
                console.log('empty');
                return false;
            }
            else{
                console.log('done');
                return true;
            }
        }
    }else if(usersContainer=[]){
        console.log('no users ');
        return true;
    }
}
//! rigester btn func to add new users
register.addEventListener('click', function(eventInfo){
    if(userTest(userEmail)){
        if(firstNameResult === true && passwordResult === true && mailResult === true && lastNameResult === true && userPassword.value !== ''){
            login.classList.remove('d-none');
            noAcount.classList.add('d-none');
            roundomdata ();
            var user = {
                firstName: firstName.value,
                lastName: lastName.value,
                Email: userEmail.value,
                password: userPassword.value,
                key: keyTest,
            }
            console.log(user);
            usersContainer.push(user);
            console.log(usersContainer.length);
            console.log(JSON.stringify(user));
            localStorage.setItem('users', JSON.stringify(usersContainer));
            console.log(localStorage.getItem('users'));
            clearForm(firstName);
            clearForm(lastName);
            clearForm(userEmail);
            clearForm(userPassword);
            setTimeout(function() {messageAppear(`Sign up done` , true)}, 4000);
            setTimeout(function() {var apeear = document.querySelector('.appear'); apeear.classList.add('d-none',) ;apeear.classList.remove('appear');}, 8000);
        }
    }else if(userTest(userEmail) === false && lastName.value !== '' && firstName.value !== '' && userPassword.value !== '') {
        console.log(`this acount ${userEmail.value} is aready exist`);
        setTimeout(function() {messageAppear(`this account ${userEmail.value} is aready exist` , false)}, 600);
        setTimeout(function() {var apeear = document.querySelector('.appear'); apeear.classList.add('d-none',) ;apeear.classList.remove('appear') ;}, 4000);
    }
    else if (passwordResult !== true && userPassword.value !== '' && userTest(userEmail) !== false){
        setTimeout(function() {messageAppear(`weake password try to use uppercase and number with at least one special character` , false)}, 600);
        setTimeout(function() {var apeear = document.querySelector('.appear'); apeear.classList.add('d-none',) ;apeear.classList.remove('appear') ;}, 4000);
    }else if(firstName.value==='' || lastName.value === '' || userEmail.value === '' ||userPassword.value === ''){
        console.log('fill data');
        setTimeout(function() {messageAppear(`Please fill uncompleted data` , false)}, 600);
        setTimeout(function() {var apeear = document.querySelector('.appear'); apeear.classList.add('d-none',) ;apeear.classList.remove('appear') ;}, 4000);
    }
});
//! make roundom key
function roundomdata (){
    do {
        currentRandom = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));
        keyTest = parseInt(currentRandom.join(''));
    console.log(keyTest);
    } while (chickKey(keyTest));
//!display i key of user
    setTimeout(function() {messageAppear(`Remmber this key : ${ keyTest } you will use it when you forget your pssword .` , true)}, 500);
    setTimeout(function() {var apeear = document.querySelector('.appear'); apeear.classList.add('d-none',) ;apeear.classList.remove('appear') ;}, 3000); 
}
//!chick if the key is not repeated
function chickKey(params) {
    for(var i = 0; i < usersContainer.length; i++){
        if(usersContainer[i].key == (params)){
            console.log('repeated key');
            return true;
        }else{
            console.log('not repeated key');
            return false;
        }
    }
}
function clearForm(input){
    input.value = '';
}
//! logging
wave[4].firstElementChild.addEventListener('keyup', function(eventInfo){
    loginMailResult = regexTestLogin( regexMail , this.value);
});
wave[5].firstElementChild.addEventListener('keyup', function(eventInfo){
    loginPassResult = regexTestLogin(regexpassword ,this.value);
});
wave[5].nextElementSibling.addEventListener('click', function(eventInfo){
        if(wave[4].firstElementChild.value === ''){
                    if(wave[5].firstElementChild.value === '' && wave[4].firstElementChild.value === ''){
                        console.log('please fill password  and email');
                        setTimeout(function() {messageAppear('please fill password  and email' , false)}, 800);
                        setTimeout(function() {var apeear = document.querySelector('.appear'); apeear.classList.add('d-none',) ;apeear.classList.remove('appear') ;
                        }, 4000); 
                    }else{
                    console.log('please fill Email ');
                    setTimeout(function() {messageAppear('please fill Email' , false)}, 800);
                        setTimeout(function() {var apeear = document.querySelector('.appear'); apeear.classList.add('d-none',) ;apeear.classList.remove('appear') ;}, 4000); 
                    }
        }else if(wave[5].firstElementChild.value === ''){
            console.log('please fill password ');
            setTimeout(function() {messageAppear('please fill password' , false)}, 800);
            setTimeout(function() {var apeear = document.querySelector('.appear'); apeear.classList.add('d-none',) ;apeear.classList.remove('appear') ;}, 4000); 
        }
        // else if(loginPassResult === false && loginMailResult === false){
        //     console.log('pass and mail failed');
        //     setTimeout(function() {messageAppear('pass and mail failed' , false)}, 800);
        //     setTimeout(function() {var apeear = document.querySelector('.appear'); apeear.classList.add('d-none',) ; apeear.classList.remove('appear') ; }, 4000); 
        // }
        // else if(loginPassResult === false ){
        //     console.log('pass failed');
        //     setTimeout(function() {messageAppear('pass failed' , false)}, 800);
        //     setTimeout(function() {var apeear = document.querySelector('.appear'); apeear.classList.add('d-none',) ;apeear.classList.remove('appear') ; }, 4000); 
        // }
        // else if(loginMailResult === false){
        //     console.log('mail failed');
        //     setTimeout(function() {messageAppear('mail failed' , false)}, 800);
        //     setTimeout(function() {var apeear = document.querySelector('.appear'); apeear.classList.add('d-none',) ;apeear.classList.remove('appear') ;}, 4000); 
        // }
        else if (loginPassResult ===true && loginMailResult === true){
            if(userTestLogin(wave[4].firstElementChild.value , wave[5].firstElementChild.value) === true){
                    console.log('user passed');
                    
                    setTimeout(function() {messageAppear('login success' , true)}, 600);
                    setTimeout(function() {var apeear = document.querySelector('.appear'); apeear.classList.add('d-none',) ;apeear.classList.remove('appear') ;}, 4000); 
                    console.log(noAcount.parentElement.parentElement);
                    noAcount.parentElement.parentElement.classList.add('d-none');
                    noAcount.parentElement.parentElement.parentElement.classList.remove('container');
                    noAcount.parentElement.parentElement.nextElementSibling.classList.remove('d-none');
                    clearForm(wave[4].firstElementChild );
                    clearForm( wave[5].firstElementChild);
                }
        }
        
});
//!test user
function userTestLogin(index1 ,index2){
    var term = index1;
    var term2 = index2;
        for(var i = 0; i < usersContainer.length; i++){
            if(usersContainer[i].Email.includes(term) && usersContainer[i].password.includes(term2)){
                console.log('user passed');
                noAcount.parentElement.parentElement.nextElementSibling.firstElementChild.lastElementChild.lastElementChild.innerHTML =`${usersContainer[i].firstName }  ${usersContainer[i].lastName}`
                noAcount.parentElement.parentElement.nextElementSibling.lastElementChild.firstElementChild.innerHTML =`wellcom ${usersContainer[i].firstName }  ${usersContainer[i].lastName} `
                return true;
            }
            else if(usersContainer[i].Email.includes(term)===false){
                console.log('mail undefined');
                setTimeout(function() {messageAppear('mail failed' , false)}, 800);
                setTimeout(function() {var apeear = document.querySelector('.appear'); apeear.classList.add('d-none',) ;apeear.classList.remove('appear') ;}, 4000); 
            }
            else if(usersContainer[i].Email.includes(term) && usersContainer[i].password.includes(term2)===false){
                    console.log('pass failed');
                    setTimeout(function() {messageAppear('pass failed' , false)}, 800);
                    setTimeout(function() {var apeear = document.querySelector('.appear'); apeear.classList.add('d-none',) ;apeear.classList.remove('appear') ; }, 4000); 
            }
            else{
                setTimeout(function() {messageAppear('pass or mail failed' , false)}, 800);
                setTimeout(function() {var apeear = document.querySelector('.appear'); apeear.classList.add('d-none',) ; apeear.classList.remove('appear') ; }, 4000); 
            }
        }
}
//!animate log out
noAcount.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild.lastElementChild.addEventListener(
    'click', function(){
        noAcount.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild.classList.add('movetoright');
        setTimeout(function(){
                    noAcount.parentElement.parentElement.classList.remove('d-none');
                    noAcount.parentElement.parentElement.parentElement.classList.add('container');
                    noAcount.parentElement.parentElement.nextElementSibling.classList.add('d-none');
                    noAcount.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild.classList.remove('movetoright');
                    wave[5].firstElementChild.nextElementSibling.classList.remove('fa-eye');
                    wave[5].firstElementChild.nextElementSibling.classList.add('fa-eye-slash');
                    wave[5].firstElementChild.removeAttribute('type')
                    wave[5].firstElementChild.setAttribute('type', 'password');
                    setTimeout(function() {messageAppear('logout sucsses', true)}, 100);
                    setTimeout(function() {var apeear = document.querySelector('.appear'); apeear.classList.add('d-none',) ;apeear.classList.remove('appear') ;}, 2000); 
        }, 600);
    }
);

function regexTestLogin( regexPattern ,ValueOFThis){
    if(regexPattern.test(ValueOFThis)){
        return true;
    }else{
        return false;
    }
}

function messageAppear(message , state){
    var text = message;
    var icon;
var newDiv = document.createElement("div");
newDiv.setAttribute("class","py-3 bg-info start-0  border-0 rounded-end-pill text-light d-block z-3 px-3 appear text-center position-absolute" );
if(state ==true){
    icon =`
    <i class="fa-solid fa-circle-check ps-2 text-success"></i>
    `;
}else if(state ==false){
    icon = `<i class="fa-solid fa-triangle-exclamation ps-2 text-danger fa-fade"></i>`;
}
newDiv.innerHTML = `${text} ${icon}`;
document.body.appendChild(newDiv);
}
// console.log(usersContainer[3].Email.includes('tahamohamed@gmail.com') , usersContainer[3].password.includes('taha2002@S'));
// localStorage.removeItem('users')
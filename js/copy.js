
var noAcount =document.querySelector('#noAcount');
var login = document.querySelector('#login');
var loginBtn = document.querySelector('#loginBtn');
var registerSwitch = document.querySelector('#registerSwitch');
var loginSwitch = document.querySelector('#loginSwitch');
var register = document.querySelector('#register');
var firstName = document.querySelector('#firstName');
var regexFirstName = /^[A-Za-z'-]{3,12}$/;
var lastName = document.querySelector('#lastName');
var regexLastName = /^[A-Za-z'-]{3,12}$/
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


var boxshadow = `3px 3px 10px rgba(0,0,0,1), -1px -1px 6px rgba(255, 255, 255, 0.4), inset 3px 3px 10px rgba(0,0,0,1), inset -1px -1px 6px rgba(255, 255, 255, 0.4) `;
var boxshadowleave = `3px 3px 10px rgba(0,0,0), -1px -1px 6px rgba(255, 255, 255, 0.4)`;
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
registerSwitch.addEventListener('click', function(eventInfo){
    login.classList.add('d-none');
    noAcount.classList.remove('d-none');
});
loginSwitch.addEventListener('click', function(eventInfo){
    login.classList.remove('d-none');
    noAcount.classList.add('d-none');
});
firstName.addEventListener('keyup', function(eventInfo){
    firstNameResult = regexTest(firstName , regexFirstName , this.value)
});
lastName.addEventListener('keyup', function(eventInfo){
    lastNameResult = regexTest(lastName , regexLastName , this.value)
});
userEmail.addEventListener('keyup', function(eventInfo){
    mailResult = regexTest(userEmail , regexMail , this.value)
});
userPassword.addEventListener('keyup', function(eventInfo){
    passwordResult = regexTest(userPassword ,regexpassword ,this.value);
});
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
function userTest(index){
    var term = index.value
    if(localStorage.getItem('users')){
        for(var i = 0; i < usersContainer.length; i++){
            if(usersContainer[i].Email.toLowerCase().includes(term.toLowerCase())){
                return false;
            }else{
                return true;
            }
        }
    }else if(usersContainer=[]){
        console.log('no users ');
        return true;
    }
}
register.addEventListener('click', function(eventInfo){
    if(userTest(userEmail)){
        if(firstNameResult === true && passwordResult === true && mailResult === true && lastNameResult === true  ){
            login.classList.remove('d-none');
            noAcount.classList.add('d-none');
            roundomdata ();
            var user = {
                firstName: firstName.value,
                lastName: lastName.value,
                Email: userEmail.value,
                password: userPassword.value,
                key: key,
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
        }
    }else if(userTest(userEmail) === false && userEmail.value !== '') {
        console.log(`this acount ${userEmail.value} is aready exist`)
    }else{
        console.log('error in user');
    }
});

function roundomdata (){
    do {
        currentRandom = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));
        keyTest = parseInt(currentRandom.join(''));
    console.log(keyTest);
    } while (chickKey(keyTest));
}
function chickKey(params) {
    var params = params;
    for(var i = 0; i < usersContainer.length; i++){
        if(usersContainer[i].key.includes(params)){
            console.log('repeated key');
            return true;
            
        }else{
            console.log('not repeated key');
            return false;
        }
    }
}
console.log( 
    usersContainer[0].key.includes(2820199548)
);
function clearForm(input){
    input.value = '';
}
// localStorage.removeItem('users');




// function userTestLoginPass(index ){
//     var term = index.value
//         for(var i = 0; i < usersContainer.length; i++){
//             if(usersContainer[i].password.includes(term)){
//                 return true;
//             }else{
//                 return false;
//             }
//         }
// }

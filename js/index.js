/* -----------GLOBAL VARIABLES-------------*/
const documentHTML = document,
inputs = documentHTML.querySelectorAll('input'),
btnLogin = documentHTML.getElementById('btnLogin'),
formData = documentHTML.getElementById('login');
const mode = documentHTML.querySelector('#mode');
let isValid = false;
/* -----------EVENTS-------------*/
if (localStorage.getItem('theme') !=null){
    const themeData = localStorage.getItem('theme');
    if(themeData == 'light'){
       mode.classList.replace('fa-sun','fa-moon')
    }else {
       mode.classList.replace('fa-moon','fa-sun')
    }
    documentHTML.querySelector('html').setAttribute('data-theme',themeData);
 }
formData.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(isValid === true){
        setForm();
    }
});
formData.addEventListener('input',()=>{
    if(validationEmail() && validationPass()){
        isValid = true;
    } else {
        isValid = false;
    };
});
mode.addEventListener('click',()=>{
    if(mode.classList.contains('fa-sun')){
       mode.classList.replace('fa-sun','fa-moon');
       documentHTML.querySelector('html').setAttribute('data-theme','light')
    }else {
       mode.classList.replace('fa-moon','fa-sun');
       documentHTML.querySelector('html').setAttribute('data-theme','dark')
    };
 });
/* -----------FUNCTIONS-------------*/
function setForm(){
    let user = {
        email : inputs[0].value,
        password : inputs[1].value,

    };
    logInForm(user);
};
async function logInForm(userData){
    const api = await fetch(`https://movies-api.routemisr.com/`,
    {
        method: 'POST',
        body: JSON.stringify(userData),
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const apiResponse = await api.json();
    console.log(apiResponse);


    if(apiResponse.message === 'success'){
        localStorage.setItem('uToken', apiResponse.token)
        location.href = './home.html'
    } else {
        documentHTML.getElementById('msg').innerHTML = apiResponse.message;
    };
}
/* -----------VALIDATION-------------*/
function validationEmail(){

    const regexStyle = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    
    if (regexStyle.test(inputs[0].value)){
        inputs[0].classList.add('is-valid');
        inputs[0].classList.remove('is-invalid');
        return true;
    } else {
        inputs[0].classList.add('is-invalid');
        inputs[0].classList.remove('is-valid');
        return false;
    };
};
function validationPass(){

    const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
    if (regexStyle.test(inputs[1].value)){
        inputs[1].classList.add('is-valid');
        inputs[1].classList.remove('is-invalid');
        return true;
    } else {
        inputs[1].classList.add('is-invalid');
        inputs[1].classList.remove('is-valid');
        return false;
    };
};


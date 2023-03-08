const documentHTML = document;
const serchParams = location.search;
const params = new URLSearchParams(serchParams);
const id = params.get('id');
const mode = documentHTML.querySelector('#mode');

if (localStorage.getItem('theme') !=null){
   const themeData = localStorage.getItem('theme');
   if(themeData == 'light'){
      mode.classList.replace('fa-sun','fa-moon')
   }else {
      mode.classList.replace('fa-moon','fa-sun')
   }
   documentHTML.querySelector('html').setAttribute('data-theme',themeData);
}

(async function(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd1a219ba3cmshdf6874913834beap1b364djsnaa390f74a430',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
    const apiResponse = await api.json();
    showData(apiResponse)
})();


function showData(data) {
    const detailsbox = `
    
    <div class="col-md-4">
<figure>
   <img src="${data.thumbnail}" class="w-100" alt="details image" />
</figure>
</div>
<div class="col-md-8">

<div>
   <nav aria-label="breadcrumb">
      <ol class="breadcrumb" class="text-light">
         <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
         <li class="breadcrumb-item text-info" aria-current="page">${data.title}</li>
      </ol>
   </nav>

   <h1>${data.title}</h1>

   <h3>About ${data.title}</h3>
   <p>${data.description}</p>

   
</div>
</div>

    `;
    const backgroundImage = data.thumbnail.replace('thumbnail','background');

    documentHTML.getElementById('detailsData').innerHTML = detailsbox;
    documentHTML.body.style.cssText = `
    background-image : url(${backgroundImage});
    background-size : cover;
    background-position : center;
    
    `

};
mode.addEventListener('click',()=>{
    if(mode.classList.contains('fa-sun')){
       mode.classList.replace('fa-sun','fa-moon');
       documentHTML.querySelector('html').setAttribute('data-theme','light')
    }else {
       mode.classList.replace('fa-moon','fa-sun');
       documentHTML.querySelector('html').setAttribute('data-theme','dark')
    };
 });




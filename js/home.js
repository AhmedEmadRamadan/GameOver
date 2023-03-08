/* -----------GLOBAL VARIABLES-------------*/
const documentHTML = document,
loader = documentHTML.querySelector('.loading');
const mode = documentHTML.querySelector('#mode');
/* -----------WHEN STARTS-------------*/
getGames('mmorpg')
if (localStorage.getItem('theme') !=null){
   const themeData = localStorage.getItem('theme');
   if(themeData == 'light'){
      mode.classList.replace('fa-sun','fa-moon')
   }else {
      mode.classList.replace('fa-moon','fa-sun')
   }
   documentHTML.querySelector('html').setAttribute('data-theme',themeData);
}
/* -----------EVENTS-------------*/
documentHTML.querySelectorAll('.menu a').forEach(link=>{
   link.addEventListener('click',()=>{
      documentHTML.querySelector('.menu .active').classList.remove('active');
      link.classList.add('active');
      const category = link.getAttribute('data-category');
      getGames(category);
   })
});
documentHTML.querySelector('.logout-btn').addEventListener('click',()=>{
   localStorage.removeItem('uToken');
   location.href = './index.html'
});
mode.addEventListener('click',()=>{
   if(mode.classList.contains('fa-sun')){
      mode.classList.replace('fa-sun','fa-moon');
      documentHTML.querySelector('html').setAttribute('data-theme','light');
      localStorage.setItem('theme','light');
   }else {
      mode.classList.replace('fa-moon','fa-sun');
      documentHTML.querySelector('html').setAttribute('data-theme','dark');
      localStorage.setItem('theme','dark');
   };
});
/* -----------FUNCTIONS-------------*/
async function getGames(item){
   loader.classList.remove('d-none');
   const options = {
      method: 'GET',
      headers: {
            'X-RapidAPI-Key': 'd1a219ba3cmshdf6874913834beap1b364djsnaa390f74a430',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
   };
   const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${item}`, options);
   const apiResponse = await api.json();
   displaydata(apiResponse);
   loader.classList.add('d-none');
};
function displaydata(games){
   let gamesBox = ``;
   for(let i=0 ; i<games.length; i++) {
      //   let videoPath = games[i].thumbnail.replace('thumbnail.jpg','videoplayback.webm')
      gamesBox += `
      <div class="col">
      <div onclick="showDetails(${games[i].id})" class="card h-100 bg-transparent" role="button">
         <div class="card-body">
            <figure class="position-relative">
               <img class="card-img-top object-fit-cover h-100" src="${games[i].thumbnail}" />
               <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
                  <source src="">
               </video>
            </figure>
            <figcaption>
               <div class="hstack justify-content-between">
                  <h3 class="h6 small">${games[i].title}</h3>
                  <span class="badge text-bg-primary p-2">Free</span>
               </div>
               <p class="card-text small text-center opacity-50">
               ${games[i].short_description}
               </p>
            </figcaption>
         </div>
         <footer class="card-footer small hstack justify-content-between">
            <span class="badge badge-color">${games[i].genre}</span>
            <span class="badge badge-color">${games[i].platform}</span>
         </footer>
      </div>
   </div>
   `
   };
   documentHTML.getElementById('gameData').innerHTML = gamesBox;
};

function showDetails(id) {
   location.href = `./details.html?id=${id}`;
};



// function startVideo(event) {
//     const videoEl = event.target.querySelector('video');
//     videoEl.classList.remove('d-none');
//     videoEl.muted = true;
//     videoEl.play();
// };

// function stopVideo(event) {
//     const videoEl = event.target.querySelector('video');
//     videoEl.classList.add('d-none');
//     videoEl.muted = true;
//     videoEl.pause();

// }




/*---------------APIS GAME-------------*/
// Api game

// Api Game :
// https://www.freetogame.com/api-doc


// Api Game By Rapid

// https://rapidapi.com/digiwalls/api/free-to-play-games-database






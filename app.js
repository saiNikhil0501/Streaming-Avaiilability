 
    const API_KEY = 'api_key=24567a64c97f49e6649c5b963be33fc4';
    const base_url = 'https://api.themoviedb.org/3/';
    const search_url = base_url + '/search/movie?' + API_KEY + '&query=';
    const image_url = 'https://image.tmdb.org/t/p/w500';
    const provider_url = base_url+'movie/';

   const body = document.querySelector('.background');
   const main = document.querySelector(".main");
   const button = document.querySelector(".mybutton");
   const search = document.querySelector(".userInput");
   button.addEventListener("click", (e)=>{
    e.preventDefault();
    getMovies(search_url+search.value);
   });

   
function getMovies(url){
    fetch(url).then(Response=>Response.json()).then(data=>showMovies(data.results));
}

function showMovies(dta){
    body.innerHTML = '';
    const head = document.createElement('header');
    const form2 = document.createElement('form');

    head.innerHTML = `
    <span style='color:black; font-family: "Trebuchet MS"; font-size: 200%;margin-left:350px'> Streaming </span> <span class = "headingB" style='margin-right:450px'> Availability </span> ` 
    head.append(form2);
    form2.innerHTML=  `<class="form2">`;
    form2.appendChild(search);
    form2.appendChild(button)
    body.appendChild(head);
    
    dta.forEach(movie => {
        const {title, poster_path, vote_average, overview, id} = movie;
        const watchData = fetch(provider_url+id +'/watch/providers?'+API_KEY).then(Response=>Response.json()).then(data=>data.results);
        let us = watchData.then(res=>{return res['US']});
        let buy = us.then(b=>b['buy'][1]);
        const p_name = buy.then(o=>{let b = o['provider_name'];

        //const name = Promise.all(p_name);
        const m1 = document.createElement('div');
        m1.classList.add('movie');
        m1.innerHTML = ` 
            <img src="${image_url+poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
             </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
                <h3> Stream On: </h3>
                    ${b}
            </div>`
         body.appendChild(m1);
    });
})
}



function getColor(avg){
    if(avg>=7){
        return 'green'
    } else if (avg>=5){
        return 'yellow';
    } else{
        return 'red';
    }
}
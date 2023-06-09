"use strict";
(function () {

    fetch("https://splendid-ginger-boat.glitch.me/movies").then(resp => resp.json()).then(data => {
        movieListGen(data)
    });

function movieListGen(data){
    let movieCard = ""
    for(let i = 0; i < 24; i++){
        movieCard += `<div class="card col-3" style="width: 18rem;">
                           <img class="card-img-top movie-pic" src="images/${i}.jpg">
                            <div class="card-body row">
                                <h5 class="movie-title">${data[i].title}</h5>
                                <p class="movie-text">${data[i].info}</p>
                                <a href="${data[i].link}" class="btn btn-warning movie-button fw-bold">IMDb</a>
                            </div>
                        </div>
                     `

    }
    $("#movies").html(movieCard);
}


})();

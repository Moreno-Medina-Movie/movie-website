"use strict";

(function () {
    fetch("https://splendid-ginger-boat.glitch.me/movies")
        .then(resp => resp.json())
        .then(data => {
            movieListGen(data);
        });

    function movieListGen(data) {
        let movieCard = "";
        for (let i = 0; i < 24; i++) {
            movieCard += `
                <div class="card col-3 p-4" style="">
                    <img class="card-img-top movie-pic" src="images/${i}.jpg">
                    <div class="card-body row">
                        <h5 class="movie-title">${data[i].title}</h5>
                       <div class = "movie-info-container"><p class="movie-text">${data[i].info}</p></div>
                        <a href="${data[i].link}" target="_blank" class=" btn btn-warning movie-button d-flex justify-content-center align-items-center align-content-center fw-bold w-50 h-25">IMDb</a>
                    </div>
                </div>
            `;
        }
        $("#movies").html(movieCard);
    }
})();

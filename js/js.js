"use strict";

(function () {
    let movieURL = "https://splendid-ginger-boat.glitch.me/movies";

    fetch(movieURL)
        .then(resp => resp.json())
        .then(data => {
            movieListGen(data);
            movieDropList(data)
        });

    /* GENERATES THE CARDS BY INFORMATION IN THE DATABASE */

    function movieListGen(data) {
        let movieCard = "";
        for (let i = 0; i < data.length; i++) {
            movieCard += `
                <div class="card col-3 p-4 bg-transparent text-light" style="" id="${data[i].id}">
                    <img class="card-img-top movie-pic" src="images/${i}.jpg" alt="error" onerror="this.src='images/newMovie.jpeg';">
                    <div class="card-body row">
                        <h5 class="movie-title">${data[i].title}</h5>
                       <div class = "movie-info-container"><p class="movie-text">${data[i].info}</p></div>
                    </div>
                    <div class="card-footer">
                        <a href="${data[i].link}" target="_blank" class=" btn btn-warning movie-button d-flex justify-content-center align-items-center align-content-center fw-bold ">IMDb</a>
                    </div>
                </div>
            `;
        }
        $("#movies").html(movieCard);
    }

    /* ADDS MOVIE FROM FORM TO DATABASE */

    $("#submitButton").on("click", addMovieButton)

    function addMovieButton(event){
        event.preventDefault()

        const newMovie = {title: $("#movieTitle").val(), link: "https://www.youtube.com/watch?v=o-YBDTqX_ZU", info : $("#movieInfo").val()};
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovie)
        }

        fetch(movieURL, options).then(() => fetch(movieURL)).then(resp => resp.json()).then(data => {
            movieDropList(data)
            location.reload();
        })
    }

    // fetch(movieURL, {
    //     method: 'DELETE',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({title: "I Am Legend"})
    // }).then(resp => resp.json()).then(data => console.log(data))

    // ${"#addMovie"}

/* POPULATES THE MOVIES INTO THE DROPDOWN MENU */
    function movieDropList(data) {
        let movieOption = "";
        for (let i = 0; i < data.length; i++) {
            movieOption += `
                <option>${data[i].title}</option>
            `;
        }
        $("#movieList").html(movieOption);
    }

})();


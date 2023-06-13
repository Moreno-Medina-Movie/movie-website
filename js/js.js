"use strict";
(function () {

	/* LOADING SPINNER */
	$("#loader").show();
	setTimeout(function (){
		$("#loader").hide();
	}, 500);

	/* API VARIABLE*/
	let movieURL = "https://splendid-ginger-boat.glitch.me/movies";
	/* GLOBAL VARIABLE FOR ACCESS*/
	let data;

	/* TURNS DATA FROM API INTO VARIABLE */
	fetch(movieURL)
		.then(resp => resp.json())
		.then(movieData => {
			data = movieData;
			movieListGen(data);
			movieDropList(data);
		});

	/* GENERATES THE CARDS BY INFORMATION IN THE DATABASE */

	function movieListGen(movieData){
		let movieCard = "";
		for (let i = 0; i < movieData.length; i++){
			movieCard += `
				<div class="card col-3 p-4 bg-transparent text-light" style="" id="${movieData[i].id}">
					  <img class="card-img-top movie-pic" src="images/${movieData[i].id}.jpg" alt="error" onerror="this.src="images/newMovie.jpeg";">
					  <div class="card-body row">
						  <h5 class="movie-title">${movieData[i].title}</h5>
						 <div class="movie-info-container"><p class="movie-text">${movieData[i].info}</p></div>
					  </div>
					  <div class="card-footer row justify-content-around">
						  <a href="${movieData[i].link}" target="_blank" class="col-5 btn btn-warning movie-button d-flex justify-content-around fw-bold">IMDb</a>
						  
						  <button type="button" class="col-5 btn btn-warning movie-button d-flex justify-content-around fw-bold movie-edit-btn" data-bs-toggle="modal" data-bs-target="#movieModal" data-movie-id="${movieData[i].id}">Edit</button>
					  </div>
				  </div>
    		`;
		}
		$("#movies").html(movieCard);
	}

	/* SUBMIT, SEARCH, AND DELETE EVENTS */
	$("#submitButton").on("click", addMovieButton);
	$("#deleteButton").on("click", deleteMovieButton);
	$("#searchForm").on("submit", searchMovie);

	$(document).on("click", ".movie-edit-btn", openEditModal);
	$("#editCancel").on("click", function (event){
		$("#movieModal").modal("hide");
	});

	/* ADD MOVIE FUNCTION */

	function addMovieButton(event){
		event.preventDefault();

		const newMovie = { title: $("#movieTitle").val(), link: "https://www.youtube.com/watch?v=o-YBDTqX_ZU", info: $("#movieInfo").val() };
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newMovie)
		};

		fetch(movieURL, options)
			.then(() => fetch(movieURL))
			.then(resp => resp.json())
			.then(data => {
				movieDropList(data);
				location.reload();
			});
	}

	/* DELETE MOVIE FUNCTION */

	function deleteMovieButton(event){
		event.preventDefault();

		const selectedMovieTitle = $("#movieList option:selected").text();

		fetch(movieURL)
			.then(resp => resp.json())
			.then(data => {

				let selectedMovie = data.find(movie => movie.title === selectedMovieTitle);
				let selectedMovieId = selectedMovie.id;
				let deleteMovieUrl = `https://splendid-ginger-boat.glitch.me/movies/${selectedMovieId}`;

				fetch(deleteMovieUrl, {
					method: "DELETE"
				})
					.then(response => {
						location.reload();
					})
					.catch(error => console.error);
			});
	}

	/* MODAL ACCESS FUNCTION */
	function openEditModal(event){
		const movieId = $(event.currentTarget).data("movie-id");
		const selectedMovie = data.find(movie => movie.id === movieId);

		$("#dropdown").val("option1");

		$("#movieSave").off("click").on("click", function(){
			movieEdit(movieId);
		});

		$("#movieModal").modal("show");
	}

	/* MOVIE EDIT FUNCTION */
	function movieEdit(movieId){
		const selectedAttribute = $("#dropdown").val();
		const newValue = $("#textbox").val();

		const selectedMovie = data.find(movie => movie.id === movieId);

		if (selectedAttribute === "option1"){
			selectedMovie.title = newValue;
		} else if (selectedAttribute === "option2"){
			selectedMovie.info = newValue;
		}

		const updateMovieUrl = `https://splendid-ginger-boat.glitch.me/movies/${selectedMovie.id}`;
		const options = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(selectedMovie),
		};

		fetch(updateMovieUrl, options)
			.then(response => {
				if (response.ok){
					$("#movieModal").modal("hide");
					location.reload();
				}
				else{
					console.error;
				}
			});
	}

	/* MOVIE SEARCH FUNCTION */
	function searchMovie(event){
		event.preventDefault();
		const searchTerm = $("#searchInput").val().toLowerCase();

		fetch(movieURL)
			.then(resp => resp.json())
			.then(data => {
				const filteredMovies = data.filter(movie => movie.title.toLowerCase().includes(searchTerm));
				movieListGen(filteredMovies);
			})
			.catch(error => {
				console.log(error);
			});
	}

	/* POPULATES THE MOVIES INTO THE DROPDOWN MENU */
	function movieDropList(data){
		let movieOption = "";
		for (let i = 0; i < data.length; i++){
			movieOption += `
                <option>${data[i].title}</option>
            `;
		}
		$("#movieList").html(movieOption);
	}




})();
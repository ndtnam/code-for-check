export const TMDB_API_KEY="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDJiZWNkNTM0YmFiYjUxOTM4NTU1MTBlODY2NzBiYiIsIm5iZiI6MTczOTk4Mzk0OC41MjYsInN1YiI6IjY3YjYwYzRjZDI4ZTg3ZTBlNWUzZTE3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eFzofQcXDS15kmhqdUl1U2fpkBp9HHbQmP6nuRJn9uw"

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_API_KEY}`
    }
  };

const URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}`

async function loading() {
    // async <-> await 
    const res = await fetch(URL, options);
    const data = await res.json();
    console.log(data.results);
    // paste 
    let movies = data.results;
    const movieList = document.getElementById("list-movie");
    movieList.innerHTML = ""; // Xóa nội dung cũ

    movies.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");

        movieElement.innerHTML = `
            <a href=""> <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}"></a>
            
            <div class="movie-title">${movie.title}</div>
        `;

        movieList.appendChild(movieElement);
    });

} 
loading()
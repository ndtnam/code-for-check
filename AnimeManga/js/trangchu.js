const animeList = [
    { title: "One Piece", image: "one-piece.jpg" },
    { title: "Pokémon Horizons", image: "pokemon.jpg" },
    { title: "Solo Leveling", image: "solo-leveling.jpg" },
    { title: "Demon Slayer", image: "demon-slayer.jpg" },
    { title: "Attack on Titan", image: "attack-on-titan.jpg" }
];

const animeGrid = document.getElementById("anime-list");
const searchBox = document.querySelector(".search-box");

function displayAnimeList(filteredAnime = animeList) {
    animeGrid.innerHTML = "";
    filteredAnime.forEach(anime => {
        const animeItem = document.createElement("div");
        animeItem.classList.add("anime-item");
        animeItem.innerHTML = `
            <img src="${anime.image}" alt="${anime.title}">
            <p>${anime.title}</p>
        `;
        animeGrid.appendChild(animeItem);
    });
}

displayAnimeList();

searchBox.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredAnime = animeList.filter(anime => 
        anime.title.toLowerCase().includes(searchTerm)
    );
    displayAnimeList(filteredAnime);
});

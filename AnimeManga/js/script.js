
// Hàm lấy dữ liệu từ API Jikan
async function fetchAnimeData(url, containerId) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.data) {
            console.error("Không tìm thấy dữ liệu anime!");
            return;
        }

        // Hiển thị danh sách anime
        const animeList = document.getElementById(containerId);
        animeList.innerHTML = "";

        data.data.forEach(anime => {
            const animeCard = document.createElement("div");
            animeCard.classList.add("anime-card");
            animeCard.dataset.id = anime.mal_id; // Lưu ID để điều hướng

            animeCard.innerHTML = `
                <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
                <h3>${anime.title}</h3>
                <p>⭐ ${anime.score || "N/A"}</p>
                <p>🎬 ${anime.episodes || "?"} tập</p>
            `;

            // Xử lý sự kiện click vào anime
            animeCard.addEventListener("click", () => {
                window.location.href = `details.html?id=${anime.mal_id}`;
            });

            animeList.appendChild(animeCard);
        });

    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
    }
}

// Gọi API lấy top anime và phim phổ biến
fetchAnimeData("https://api.jikan.moe/v4/top/anime", "top-anime");
fetchAnimeData("https://api.jikan.moe/v4/top/anime?filter=bypopularity", "popular-anime");

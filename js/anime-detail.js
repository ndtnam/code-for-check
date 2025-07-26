// anime-detail.js
import {
    getAnimeDetails,
    getAnimeEpisodes,
    getAnimeCharacters
} from './jikanApi.js';

const animeId = new URLSearchParams(window.location.search).get("id");

async function renderAnimeDetails() {
    const detailContainer = document.getElementById("anime-detail");

    if (!animeId) {
        detailContainer.innerHTML = "<p>Không tìm thấy anime!</p>";
        return;
    }

    try {
        const anime = await getAnimeDetails(animeId);
        const episodes = await getAnimeEpisodes(animeId);
        const characters = await getAnimeCharacters(animeId);

        const trailer = anime.trailer && anime.trailer.youtube_id
            ? `<iframe src="https://www.youtube.com/embed/${anime.trailer.youtube_id}" frameborder="0" allowfullscreen></iframe>`
            : "<p>Không có trailer</p>";

        const episodeList = episodes.map(ep => `<li>Tập ${ep.mal_id}: ${ep.title}</li>`).join("");

        const characterList = characters.slice(0, 5).map(char => {
            const voice = char.voice_actors.find(v => v.language === "Japanese");
            return `<li>${char.character.name} – 🗣️ ${voice ? voice.person.name : "Không rõ"}</li>`;
        }).join("");

        detailContainer.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <h2>${anime.title}</h2>
            <p><strong>Mô tả:</strong> ${anime.synopsis}</p>
            <p><strong>Trạng thái:</strong> ${anime.status}</p>
            <h3>🎬 Trailer</h3>
            ${trailer}
            <h3>📺 Danh sách tập</h3>
            <ul>${episodeList}</ul>
            <h3>🎙️ Diễn viên lồng tiếng</h3>
            <ul>${characterList}</ul>
        `;

    } catch (err) {
        detailContainer.innerHTML = "<p>Lỗi khi tải dữ liệu</p>";
        console.error(err);
    }
}

renderAnimeDetails();

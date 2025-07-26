// jikanApi.js
const API_BASE = "https://api.jikan.moe/v4";

// Lấy thông tin chi tiết anime
export async function getAnimeDetails(id) {
    const response = await fetch(`${API_BASE}/anime/${id}/full`);
    const data = await response.json();
    return data.data;
}

// Lấy danh sách tập
export async function getAnimeEpisodes(id) {
    const response = await fetch(`${API_BASE}/anime/${id}/episodes`);
    const data = await response.json();
    return data.data;
}

// Lấy danh sách nhân vật + diễn viên lồng tiếng
export async function getAnimeCharacters(id) {
    const response = await fetch(`${API_BASE}/anime/${id}/characters`);
    const data = await response.json();
    return data.data;
}

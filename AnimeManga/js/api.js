// ID của anime (VD: One Piece = 21, Naruto = 20, Attack on Titan = 16498)
const animeId = 21; // Đổi sang ID anime bạn muốn

// Hàm lấy thông tin anime từ API Jikan
async function getAnimeDetails(id) {
    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
        const data = await response.json();

        if (!data.data) {
            console.log("Không tìm thấy anime!");
            return;
        }

        // Hiển thị thông tin anime
        const anime = data.data;
        console.log(`📌 Tiêu đề: ${anime.title} (${anime.title_japanese})`);
        console.log(`📝 Mô tả: ${anime.synopsis}`);
        console.log(`⭐ Đánh giá: ${anime.score} (${anime.scored_by} lượt)`);
        console.log(`🎬 Số tập: ${anime.episodes || "Chưa cập nhật"}`);
        console.log(`📅 Ngày phát sóng: ${anime.aired.string}`);
        console.log(`🎭 Thể loại: ${anime.genres.map(g => g.name).join(", ")}`);
        console.log(`📺 Trạng thái: ${anime.status}`);
        console.log(`🖼 Ảnh bìa: ${anime.images.jpg.image_url}`);
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
    }
}

// Gọi API để lấy thông tin anime
getAnimeDetails(animeId);
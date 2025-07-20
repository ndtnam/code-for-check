document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const topAnimeContainer = document.getElementById('top-anime');
    const popularAnimeContainer = document.getElementById('popular-anime');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        // Get all anime cards
        const allAnimeCards = document.querySelectorAll('.anime-card');
        
        allAnimeCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Search when button is clicked
    searchButton.addEventListener('click', performSearch);

    // Search when Enter key is pressed
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Live search as user types (optional)
    searchInput.addEventListener('input', function() {
        performSearch();
    });
}); 
document.addEventListener('DOMContentLoaded', function() {
    const headerAvatar = document.getElementById('header-avatar');
    const headerLogout = document.getElementById('header-logout');

    // Load user data and update avatar
    function loadUserProfile() {
        const currentUser = localStorage.getItem('currentUser');
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userData = users.find(u => u.username === currentUser) || {};
        // Update avatar if exists
        if (userData.avatar) {
            headerAvatar.src = userData.avatar;
        } else {
            headerAvatar.src = '../images/default-avatar.png';
        }
    }

    // Handle logout
    headerLogout.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
            localStorage.removeItem('userSession');
            localStorage.removeItem('userData');
            window.location.href = 'index.html';
        }
    });

    // Initialize
    loadUserProfile();
}); 
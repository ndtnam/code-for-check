// profile.js
document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    // Kiểm tra trạng thái đăng nhập
    if (!isLoggedIn || !user) {
        alert('Vui lòng đăng nhập để xem thông tin tài khoản!');
        window.location.href = 'dangnhap.html';
        return;
    }

    // Hiển thị thông tin người dùng
    document.getElementById('username').textContent = user.username || 'Không có dữ liệu';
    document.getElementById('email').textContent = user.email || 'Không có dữ liệu';
    document.getElementById('joinDate').textContent = user.joinDate 
        ? new Date(user.joinDate).toLocaleDateString('vi-VN') 
        : 'Không có dữ liệu';

    // Hiển thị avatar (nếu có, hiện tại dùng mặc định)
    const avatarElement = document.getElementById('user-avatar');
    if (user.avatar) {
        avatarElement.src = user.avatar; // Nếu có avatar trong localStorage
    } else {
        avatarElement.src = '../images/default-avatar.png'; // Avatar mặc định
    }

    // Xử lý nút đăng xuất
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
            alert('Đã đăng xuất!');
            window.location.href = 'dangnhap.html';
        });
    }
});
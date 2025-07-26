// dangnhap_dangky.js
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Lấy danh sách user từ localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                // Lưu trạng thái đăng nhập
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', username);
                localStorage.setItem('userSession', 'true');
                localStorage.setItem('userData', JSON.stringify(user));
                alert('Đăng nhập thành công!');
                window.location.href = 'index.html';
            } else {
                alert('Tên đăng nhập hoặc mật khẩu không đúng!');
            }
        });
    }
});
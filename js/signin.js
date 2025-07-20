// signin.js
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Lấy dữ liệu người dùng từ localStorage
            const storedUser = localStorage.getItem('user');
            
            if (storedUser) {
                const user = JSON.parse(storedUser);
                
                // Kiểm tra thông tin đăng nhập
                if (user.username === username && user.password === password) {
                    // Lưu trạng thái đăng nhập
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('currentUser', username);
                    alert('Đăng nhập thành công!');
                    window.location.href = 'index.html'; // Chuyển hướng về trang chủ
                } else {
                    alert('Tên người dùng hoặc mật khẩu không đúng!');
                }
            } else {
                alert('Tài khoản không tồn tại! Vui lòng đăng ký.');
            }
        });
    }
});
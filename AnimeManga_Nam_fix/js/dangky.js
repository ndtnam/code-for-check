// dangnhap_dangky.js
document.addEventListener('DOMContentLoaded', function() {
    // Xử lý form đăng nhập
    const loginForm = document.getElementById('login-form');
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
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('currentUser', username);
                    alert('Đăng nhập thành công!');
                    window.location.href = 'index.html';
                } else {
                    alert('Tên đăng nhập hoặc mật khẩu không đúng!');
                }
            } else {
                alert('Tài khoản không tồn tại! Vui lòng đăng ký.');
            }
        });
    }

    // Xử lý form đăng ký
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Kiểm tra xem tài khoản đã tồn tại chưa
            const storedUser = localStorage.getItem('user');
            
            if (storedUser) {
                const user = JSON.parse(storedUser);
                if (user.username === username) {
                    alert('Tên đăng nhập đã tồn tại!');
                    return;
                }
                if (user.email === email) {
                    alert('Email đã được sử dụng!');
                    return;
                }
            }
            
            // Tạo object người dùng mới
            const newUser = {
                username: username,
                email: email,
                password: password,
                joinDate: new Date().toISOString()
            };
            
            // Lưu vào localStorage
            localStorage.setItem('user', JSON.stringify(newUser));
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', username);
            
            alert('Đăng ký thành công!');
            window.location.href = 'index.html';
        });
    }
});
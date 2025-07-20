document.addEventListener("DOMContentLoaded", function () {
    function changeBackground() {
        let now = new Date();
        let hour = now.getHours();
        let body = document.body;

        if (hour >= 5 && hour < 12) {
            body.className = "morning";
        } else if (hour >= 12 && hour < 18) {
            body.className = "afternoon";
        } else {
            body.className = "night";
        }
    }

    // Chuyển đổi giữa đăng nhập & đăng ký
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const formTitle = document.getElementById("form-title");

    document.getElementById("toggle-register").addEventListener("click", function () {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
        formTitle.textContent = "Đăng ký";
    });

    document.getElementById("toggle-login").addEventListener("click", function () {
        registerForm.style.display = "none";
        loginForm.style.display = "block";
        formTitle.textContent = "Đăng nhập";
    });

    // Gọi hàm thay đổi nền
    changeBackground();
});

const btn_login = document.getElementById("btn-submit");

btn_login.onclick = function() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    let listAccounts = localStorage.getItem("accounts");
    listAccounts =  JSON.parse(listAccounts);

    let isEmailExist = false;  // kiem tra su ton tai cua email trong he thong 
    let isCorrectPassword = false;  // kiem tra su hop le cua password

    for (const account of listAccounts) {
        if (account.email == email) {
            isEmailExist = true;
            if (account.password == password) {
                isCorrectPassword = true;
            }
            else {
                isCorrectPassword = false;
            }
            break;
        }
    }

    if (isEmailExist == false) {
        alert("Tài khoản không tồn tại")
    } else {
        if (isCorrectPassword == false) {
            alert("Mật khẩu không chính xác");
        } else {
            alert("Đăng nhập thành công");
            window.location.href("zzz-mindx-cinema/index.html")
        }
    }

    
}
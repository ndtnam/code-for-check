const btn_submit=document.getElementById('btn-submit')
btn_submit.onclick= function(){
    const username =document.getElementById('username').value;
    const email =document.getElementById('email').value;
    const password =document.getElementById('password').value;
    let account={
        "username": username,
        "email":email,
        "password": password
    }
    let listAccounts = localStorage.getItem("accounts");
    listAccounts = listAccounts ? JSON.parse(listAccounts) : [];
    
    listAccounts.push(account);
    localStorage.setItem("accounts", JSON.stringify(listAccounts));
    alert("dang ky thanh cong");

}
const btn_submit=document.getElementById("btn-submit")
btn_submit.onclick= function(){
   
    const email =document.getElementById('email').value;
    const password =document.getElementById('password').value;
}
let listAccounts = localStorage.getItem("accounts");
    listAccounts = listAccounts ? JSON.parse(listAccounts) : [];
    let isEmailExist = false
    let ifCorrectPassword = false
    for (const account of listAccounts) {
        if (account.email ==email){
            isEmailExist = true;
            if (account.password == password){
               ifCorrectPassword
            }
        }
        

        
    }
// profile.js
document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra đăng nhập
    const userSession = localStorage.getItem('userSession');
    if (!userSession) {
        window.location.href = 'dangnhap.html';
        return;
    }

    // Get DOM elements
    const avatarInput = document.getElementById('avatar-input');
    const userAvatar = document.getElementById('user-avatar');
    const displayName = document.getElementById('display-name');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const joinDate = document.getElementById('joinDate');
    const logoutBtn = document.getElementById('logout-btn');
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const changePasswordBtn = document.getElementById('change-password-btn');

    // Load user data from localStorage
    function loadUserData() {
        const currentUser = localStorage.getItem('currentUser');
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userData = users.find(u => u.username === currentUser) || {};
        // Set avatar if exists
        if (userData.avatar) {
            userAvatar.src = userData.avatar;
        } else {
            userAvatar.src = '../images/default-avatar.png';
        }
        // Set user information
        displayName.textContent = userData.username || 'User Name';
        username.textContent = userData.username || 'Not set';
        email.textContent = userData.email || 'Not set';
        joinDate.textContent = userData.joinDate ? new Date(userData.joinDate).toLocaleDateString() : new Date().toLocaleDateString();
        // Lưu userData hiện tại để các chức năng khác dùng
        localStorage.setItem('userData', JSON.stringify(userData));
    }

    // Handle avatar upload
    avatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Check if file is an image
            if (!file.type.startsWith('image/')) {
                alert('Please upload an image file');
                return;
            }
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size should be less than 5MB');
                return;
            }
            const reader = new FileReader();
            reader.onload = function(event) {
                // Update avatar preview
                userAvatar.src = event.target.result;
                // Lưu avatar vào user hiện tại trong mảng users
                const currentUser = localStorage.getItem('currentUser');
                let users = JSON.parse(localStorage.getItem('users')) || [];
                const idx = users.findIndex(u => u.username === currentUser);
                if (idx !== -1) {
                    users[idx].avatar = event.target.result;
                    localStorage.setItem('users', JSON.stringify(users));
                    localStorage.setItem('userData', JSON.stringify(users[idx]));
                }
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle edit profile
    editProfileBtn.addEventListener('click', function() {
        // Create a simple modal dialog
        const modalHTML = `
            <div id="editModal" style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 30px 36px;
                border-radius: 12px;
                box-shadow: 0 2px 18px rgba(0,0,0,0.13);
                z-index: 1000;
                min-width: 480px;
                font-size: 1.5em;
            ">
                <h3 style="margin-bottom: 22px; color: #ff4444; font-size: 1.3em;">Edit Profile</h3>
                <div style="margin-bottom: 22px;">
                    <label style="display: block; margin-bottom: 8px;">Username:</label>
                    <input type="text" id="editUsername" value="${username.textContent}" style="
                        width: 100%;
                        padding: 12px;
                        border: 1.5px solid #ddd;
                        border-radius: 6px;
                        margin-bottom: 15px;
                        font-size: 1em;
                    ">
                </div>
                <div style="margin-bottom: 22px;">
                    <label style="display: block; margin-bottom: 8px;">Email:</label>
                    <input type="email" id="editEmail" value="${email.textContent}" style="
                        width: 100%;
                        padding: 12px;
                        border: 1.5px solid #ddd;
                        border-radius: 6px;
                        margin-bottom: 15px;
                        font-size: 1em;
                    ">
                </div>
                <div style="display: flex; justify-content: flex-end; gap: 15px;">
                    <button id="cancelEdit" style="
                        padding: 12px 22px;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        background: #ddd;
                        font-size: 1em;
                    ">Cancel</button>
                    <button id="saveEdit" style="
                        padding: 12px 22px;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        background: #ff4444;
                        color: white;
                        font-size: 1em;
                    ">Save Changes</button>
                </div>
            </div>
            <div id="modalOverlay" style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                z-index: 999;
            "></div>
        `;

        // Add modal to document
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Get modal elements
        const modal = document.getElementById('editModal');
        const overlay = document.getElementById('modalOverlay');
        const cancelBtn = document.getElementById('cancelEdit');
        const saveBtn = document.getElementById('saveEdit');
        const usernameInput = document.getElementById('editUsername');
        const emailInput = document.getElementById('editEmail');

        // Handle cancel
        function closeModal() {
            modal.remove();
            overlay.remove();
        }

        cancelBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);

        // Handle save
        saveBtn.addEventListener('click', function() {
            const newUsername = usernameInput.value.trim();
            const newEmail = emailInput.value.trim();
            // Validate email
            if (!newEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                alert('Please enter a valid email address');
                return;
            }
            // Validate username
            if (!newUsername) {
                alert('Username cannot be empty');
                return;
            }
            // Lưu thay đổi vào user hiện tại trong mảng users
            const currentUser = localStorage.getItem('currentUser');
            let users = JSON.parse(localStorage.getItem('users')) || [];
            const idx = users.findIndex(u => u.username === currentUser);
            if (idx !== -1) {
                users[idx].username = newUsername;
                users[idx].email = newEmail;
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('userData', JSON.stringify(users[idx]));
                localStorage.setItem('currentUser', newUsername);
            }
            // Update display
            displayName.textContent = newUsername;
            username.textContent = newUsername;
            email.textContent = newEmail;
            // Close modal
            closeModal();
        });
    });

    // Handle change password
    changePasswordBtn.addEventListener('click', function() {
        const modalHTML = `
            <div id="changePasswordModal" style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 30px 36px;
                border-radius: 12px;
                box-shadow: 0 2px 18px rgba(0,0,0,0.13);
                z-index: 1000;
                min-width: 480px;
                font-size: 1.5em;
            ">
                <h3 style="margin-bottom: 22px; color: #f9a825; font-size: 1.3em;">Đổi mật khẩu</h3>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 8px;">Mật khẩu cũ:</label>
                    <input type="password" id="oldPassword" style="width: 100%; padding: 12px; border: 1.5px solid #ddd; border-radius: 6px; font-size: 1em;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 8px;">Mật khẩu mới:</label>
                    <input type="password" id="newPassword" style="width: 100%; padding: 12px; border: 1.5px solid #ddd; border-radius: 6px; font-size: 1em;">
                </div>
                <div style="margin-bottom: 22px;">
                    <label style="display: block; margin-bottom: 8px;">Xác nhận mật khẩu mới:</label>
                    <input type="password" id="confirmPassword" style="width: 100%; padding: 12px; border: 1.5px solid #ddd; border-radius: 6px; font-size: 1em;">
                </div>
                <div style="display: flex; justify-content: flex-end; gap: 15px;">
                    <button id="cancelChangePassword" style="padding: 12px 22px; border: none; border-radius: 6px; cursor: pointer; background: #ddd; font-size: 1em;">Hủy</button>
                    <button id="saveChangePassword" style="padding: 12px 22px; border: none; border-radius: 6px; cursor: pointer; background: #f9a825; color: white; font-size: 1em;">Đổi mật khẩu</button>
                </div>
            </div>
            <div id="modalOverlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 999;"></div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const modal = document.getElementById('changePasswordModal');
        const overlay = document.getElementById('modalOverlay');
        const cancelBtn = document.getElementById('cancelChangePassword');
        const saveBtn = document.getElementById('saveChangePassword');
        function closeModal() {
            modal.remove();
            overlay.remove();
        }
        cancelBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
        saveBtn.addEventListener('click', function() {
            const oldPass = document.getElementById('oldPassword').value;
            const newPass = document.getElementById('newPassword').value;
            const confirmPass = document.getElementById('confirmPassword').value;
            const currentUser = localStorage.getItem('currentUser');
            let users = JSON.parse(localStorage.getItem('users')) || [];
            const idx = users.findIndex(u => u.username === currentUser);
            if (idx === -1) {
                alert('Không tìm thấy tài khoản.');
                return;
            }
            if (users[idx].password !== oldPass) {
                alert('Mật khẩu cũ không đúng!');
                return;
            }
            if (newPass.length < 6) {
                alert('Mật khẩu mới phải có ít nhất 6 ký tự.');
                return;
            }
            if (newPass !== confirmPass) {
                alert('Xác nhận mật khẩu không khớp!');
                return;
            }
            if (newPass === oldPass) {
                alert('Mật khẩu mới phải khác mật khẩu cũ!');
                return;
            }
            users[idx].password = newPass;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('userData', JSON.stringify(users[idx]));
            alert('Đổi mật khẩu thành công!');
            closeModal();
        });
    });

    // Handle logout
    logoutBtn.addEventListener('click', function() {
        if (confirm('Bạn có chắn chắn đăng xuất khôngkhông?')) {
            // Clear user session (you might want to modify this based on your authentication system)
            localStorage.removeItem('userSession');
            window.location.href = 'dangnhap.html'; // Redirect to login page
        }
    });

    // Initialize profile
    loadUserData();
});
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

    // Load user data from localStorage
    function loadUserData() {
        const userData = JSON.parse(localStorage.getItem('userData')) || {};
        
        // Set avatar if exists
        if (userData.avatar) {
            userAvatar.src = userData.avatar;
        }

        // Set user information
        displayName.textContent = userData.username || 'User Name';
        username.textContent = userData.username || 'Not set';
        email.textContent = userData.email || 'Not set';
        joinDate.textContent = userData.joinDate || new Date().toLocaleDateString();
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
                
                // Save to localStorage
                const userData = JSON.parse(localStorage.getItem('userData')) || {};
                userData.avatar = event.target.result;
                localStorage.setItem('userData', JSON.stringify(userData));
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
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                z-index: 1000;
            ">
                <h3 style="margin-bottom: 15px; color: #ff4444;">Edit Profile</h3>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">Username:</label>
                    <input type="text" id="editUsername" value="${username.textContent}" style="
                        width: 100%;
                        padding: 8px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        margin-bottom: 10px;
                    ">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">Email:</label>
                    <input type="email" id="editEmail" value="${email.textContent}" style="
                        width: 100%;
                        padding: 8px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        margin-bottom: 10px;
                    ">
                </div>
                <div style="display: flex; justify-content: flex-end; gap: 10px;">
                    <button id="cancelEdit" style="
                        padding: 8px 15px;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        background: #ddd;
                    ">Cancel</button>
                    <button id="saveEdit" style="
                        padding: 8px 15px;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        background: #ff4444;
                        color: white;
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

            // Save changes
            const userData = JSON.parse(localStorage.getItem('userData')) || {};
            userData.username = newUsername;
            userData.email = newEmail;
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Update display
            displayName.textContent = newUsername;
            username.textContent = newUsername;
            email.textContent = newEmail;

            // Close modal
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
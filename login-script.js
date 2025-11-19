function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        alert('Please enter username and password');
        return;
    }
    
    // Check hardcoded admin first
    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('currentUser', JSON.stringify({username: 'admin'}));
        showTempleGateAnimation();
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
        return;
    }
    
    // Check registered users
    var storedUser = localStorage.getItem('user_' + username);
    var user = null;
    if (storedUser) {
        user = JSON.parse(storedUser);
        if (user.password !== password) {
            user = null;
        }
    }
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        showTempleGateAnimation();
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    } else {
        alert('Invalid credentials!');
    }
}

function showTempleGateAnimation() {
    const templeGate = document.getElementById('templeGate');
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    // Show temple gate animation
    if (templeGate) {
        templeGate.classList.add('active');
    }
    
    // After gate animation, show loading
    setTimeout(() => {
        if (templeGate) {
            templeGate.classList.remove('active');
        }
        if (loadingOverlay) {
            loadingOverlay.classList.add('active');
        }
    }, 2000);
}

function showSignup() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
    document.getElementById('headerTitle').textContent = 'Sign Up';
}

function showLogin() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('headerTitle').textContent = 'Login';
}

function handleSignup() {
    alert('Sign up clicked!');
    
    var username = document.getElementById('newUsername').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('newPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    
    alert('Values: ' + username + ', ' + email + ', ' + password + ', ' + confirmPassword);
    
    if (username === '' || email === '' || password === '' || confirmPassword === '') {
        alert('Please fill all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    alert('Creating account for: ' + username);
    
    // Simple storage without checking existing users for now
    var newUser = {
        username: username,
        email: email,
        password: password
    };
    
    localStorage.setItem('user_' + username, JSON.stringify(newUser));
    
    alert('Account created successfully!');
    showLogin();
}
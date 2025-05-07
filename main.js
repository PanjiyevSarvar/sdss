document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const error = document.getElementById('error');
    const loginBtn = document.getElementById('loginBtn');
  
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        error.textContent = '';
        loginBtn.disabled = true;
        loginBtn.textContent = 'Loading...';
  
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
  
        try {
          const res = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          });
  
          const data = await res.json();
  
          if (res.ok) {
            localStorage.setItem('token', data.token);
            window.location.href = 'admin.html';
          } else {
            error.textContent = data.message || 'Login failed';
          }
        } catch (err) {
          error.textContent = 'Something went wrong';
        } finally {
          loginBtn.disabled = false;
          loginBtn.textContent = 'Login';
        }
      });
    }
  });
  
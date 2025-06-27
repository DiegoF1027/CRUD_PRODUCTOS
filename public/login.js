export function inicializarLogin() {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (!loginForm || !togglePassword || !passwordInput) return;

    loginForm.addEventListener('submit', handleLogin);
    togglePassword.addEventListener('click', togglePasswordVisibility);

    async function handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = passwordInput.value;

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = '/crud.html';
            } else {
                mostrarError(data.mensaje || 'Login incorrecto');
            }
        } catch (error) {
            mostrarError('Error de red o servidor');
        }
    }

    function togglePasswordVisibility() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    }

    function mostrarError(mensaje) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: mensaje,
            confirmButtonColor: '#d33'
        });
    }
}
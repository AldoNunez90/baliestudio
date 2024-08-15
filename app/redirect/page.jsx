
'use client'
export default function Redirect () {
    const handleLogin = () => {
        window.location.href = '/api/auth/google';
      };
    return(
        <div>
<button onClick={handleLogin}>Iniciar sesión con Google</button>

        </div>

    )
}
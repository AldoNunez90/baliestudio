// app/api/auth/callback/route.js
import { google } from 'googleapis';

export async function GET(req) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Código de autorización no encontrado.', { status: 400 });
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Agrega un parámetro de éxito a la URL
    const redirectUrl = new URL('/reservas', 'http://localhost:3000');
    redirectUrl.searchParams.set('auth', 'success');

    return new Response(null, {
      status: 302,
      headers: {
        Location: redirectUrl.toString(),
      },
    });
  } catch (error) {
    console.error('Error getting tokens:', error);

    // Agrega un parámetro de error a la URL
    const redirectUrl = new URL('/reservas', 'http://localhost:3000');
    redirectUrl.searchParams.set('auth', 'error');

    return new Response(null, {
      status: 302,
      headers: {
        Location: redirectUrl.toString(),
      },
    });
  }
}

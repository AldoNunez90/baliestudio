// app/api/auth/google/route.js
import { google } from 'googleapis';

export async function GET(req) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const scopes = ['https://www.googleapis.com/auth/calendar'];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: url,
    },
  });
}

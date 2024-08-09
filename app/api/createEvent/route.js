import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request) {
  try {
    const { summary, start, end, calendarIdSelected } = await request.json();

    if (!summary || !start || !end) {
      return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 });
    }

    // Configura las credenciales de OAuth2
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

    const event = {
      summary,
      start: {
        dateTime: start,
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: end,
        timeZone: 'America/Los_Angeles',
      },
    };

    const response = await calendar.events.insert({
      calendarId: calendarIdSelected,
      resource: event,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error al crear el evento:', error);
    return NextResponse.json({ error: 'Error al crear el evento', details: error.message }, { status: 500 });
  }
}

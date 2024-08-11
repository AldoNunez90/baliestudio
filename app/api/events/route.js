import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const calendar = google.calendar('v3');

export async function GET(req) {
  try {
    // Extraer el calendarIdSelected de los parámetros de consulta
    const url = new URL(req.url);
    const calendarIdSelected = url.searchParams.get('calendarId');
    
    if (!calendarIdSelected) {
      return NextResponse.json({ error: 'Calendar ID is required' }, { status: 400 });
    }

    // Configura el cliente de Google API
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

    // Define el rango de tiempo a consultar
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0);

    // Consulta los eventos del calendario
    const response = await calendar.events.list({
      calendarId: calendarIdSelected,
      timeMin: startOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      auth: oAuth2Client,
    });

    const events = response.data.items || [];
    
    // Devuelve los eventos tal cual, ya que el frontend se encargará del procesamiento
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return NextResponse.error();
  }
}

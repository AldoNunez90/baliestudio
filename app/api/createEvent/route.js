import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request) {
  try {
    const { summary, location, description, start, end, calendarIdSelected, attendees, reminders } = await request.json();

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

    // Consulta los eventos existentes en el rango de tiempo del nuevo evento
    const events = await calendar.events.list({
      calendarId: calendarIdSelected,
      timeMin: new Date(start),
      timeMax: new Date(end),
      singleEvents: true,
      orderBy: 'startTime',
    });

    // Verifica si el nuevo evento se superpone con algún evento existente
    const isOverlapping = events.data.items.some(event => {
      const eventStart = new Date(event.start.dateTime);
      const eventEnd = new Date(event.end.dateTime);

      return (new Date(start) < eventEnd && new Date(end) > eventStart);
    });

    if (isOverlapping) {
      return NextResponse.json({ error: 'Lo sentimos, este horario ya ha sido tomado ' }, { status: 400 });
    }

    // Si no hay superposiciones, crea el nuevo evento
    const event = {
      summary,
      location: location,
      description: description,
      start: {
        dateTime: start,
        timeZone: 'America/Buenos_Aires',
      },
      end: {
        dateTime: end,
        timeZone: 'America/Buenos_Aires',
      },
      attendees: attendees,
      reminders: reminders,
    };

    const response = await calendar.events.insert({
      calendarId: calendarIdSelected,
      resource: event,
      sendUpdates: 'all'
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error al crear el evento:', error);
    return NextResponse.json({ error: 'Error al crear el evento', details: error.message }, { status: 500 });
  }
}

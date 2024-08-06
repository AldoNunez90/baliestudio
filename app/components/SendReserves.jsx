import axios from 'axios';
import { formatDate } from 'date-fns';

// Función para listar eventos
async function fetchEvents() {
  try {
    const response = await axios.get('http://localhost:3001/');
    console.log(response);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}
const newEvent = {
  'summary': 'Google I/O 2015',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2024-08-17T12:00:00-03:00',
    'timeZone': 'America/Buenos_Aires',
  },
  'end': {
    'dateTime': '2024-08-17T13:00:00-03:00',
    'timeZone': 'America/Buenos_Aires',
  },
  'attendees': [
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10},
    ],
  },
};
// Función para crear un evento
async function createEvent(newEvent) {
  try {
    const response = await axios.get('http://localhost:3001/api/insertevent', newEvent, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
}

// Ejemplo de uso en un componente de Next.js
import { useState, useEffect } from 'react';

function CalendarComponent() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    summary: '',
    startTime: '',
    endTime: '',
  });

  

  useEffect(() => {
    // Obtener eventos al cargar el componente
    fetchEvents().then(data => setEvents(data));
  }, []);

  const handleCreateEvent = () => {
    createEvent(newEvent).then(data => {
      console.log('Event created:', data);
      setEvents(prevEvents => [...prevEvents, data]);
      
    });
  };
  
  return (
    <div>
      <h1>Calendar Events</h1>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.summary} ({event.start.dateTime} - {event.endTime})
          </li>
        ))}
      </ul>

      <h2>Create New Event</h2>
      <input
        type="text"
        placeholder="Event summary"
        value={newEvent.summary}
        onChange={e => setNewEvent({ ...newEvent, summary: e.target.value })}
      />
      <input
        type="datetime-local"
        value={newEvent.startTime}
        onChange={e => setNewEvent({ ...newEvent, startTime: e.target.value })}
      />
      <input
        type="datetime-local"
        value={newEvent.endTime}
        onChange={e => setNewEvent({ ...newEvent, endTime: e.target.value })}
      />
      <button onClick={handleCreateEvent}>Create Event</button>
    </div>
  );
}

export default CalendarComponent;

'use client'
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import Image from "next/image";
import Link from "next/link";
import "react-calendar/dist/Calendar.css";
import { format, set } from 'date-fns'
import { es } from 'date-fns/locale';

function SetPalaceReserve() {
    const [booking, setBooking] = useState(false);
    const [screenDate, setScreenDate] = useState(null)
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [value, setValue] = useState('Seleccionar opción');
    const [hours, setHours] = useState(null)
    const [isOpen, setIsOpen] = useState(false);
    const [eventContent, setEventContent] = useState(false)  
    const [events, setEvents] = useState([]);
     const [dateInfo, setDateInfo] = useState({});

  useEffect(() => {
    // Solicitar eventos al servidor
    axios.get('http://localhost:3001/api/getEvents')
        .then(response => {
        setEvents(response.data);
        processEvents(response.data);
    });
  }, []);
console.log(events);

function processEvents(events) {
    const dateInfo = {};
  
    events.forEach(event => {
      const date = event.start.dateTime.split('T')[0];
  
      if (!dateInfo[date]) {
        dateInfo[date] = {
          occupiedHours: new Set(),
          totalEvents: 0,
          fullyOccupied: false,
        };
      }
  
      const startHour = new Date(event.start.dateTime).getHours();
      const endHour = new Date(event.end.dateTime).getHours();
  
      // Marcar las horas ocupadas por este evento
      for (let hour = startHour; hour < endHour; hour++) {
        dateInfo[date].occupiedHours.add(hour);
      }
  
      dateInfo[date].totalEvents++;
    });
  
    // Determinar si el día está completamente ocupado
    Object.keys(dateInfo).forEach(date => {
      const occupiedHours = dateInfo[date].occupiedHours;
      const requiredHours = new Set([...Array(22 - 8).keys()].map(h => h + 8));
      dateInfo[date].fullyOccupied = [...requiredHours].every(hour => occupiedHours.has(hour));
    });
  
    setDateInfo(dateInfo);
  }
  
  console.log(dateInfo);
  function tileClassName({ date, view }) {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];

      if (dateInfo[dateString]) {
        if (dateInfo[dateString].fullyOccupied) {
          return 'completely-occupied';
        } else if (dateInfo[dateString].totalEvents > 0 && dateInfo[dateString].fullyOccupied === false) {
          return 'partially-occupied';
        }
      }
    }

    return 'completely-free';
  }

  

  return (
    <Calendar
      tileClassName={tileClassName}
    />
  );
}

export default SetPalaceReserve;

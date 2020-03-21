import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import InterviewerList from "./InterviewerList";
import "components/Application.scss";
import Appointment from "components/Appointment";
import axios from "axios";



const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Lola Boondock",
      interviewer: {
        id: 2,
        name: "Sal LeMander",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "2pm"
  },
  {
    id: 5,
    time: "4pm"
  }

];

export default function Application(props) {

  const [day, setDay] = useState([])

 axios.get('http://localhost:8001/api/days')
  .then(res => setDay(res))


  
  const appointmentsArr = appointments.map(appointment => {
    return <Appointment key={appointment.id} {...appointment} />
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={day}
            day={day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsArr}
      </section>
    </main>
  );
}

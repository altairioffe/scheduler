import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import InterviewerList from "./InterviewerList";
import "components/Application.scss";
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors"


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("http://localhost:8001/api/days")),
      Promise.resolve(axios.get("http://localhost:8001/api/appointments")),
      Promise.resolve(axios.get("http://localhost:8001/api/interviewers"))
    ]).then(all => {
      setState(prev => ({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  const appointments = getAppointmentsForDay(state, state.day)
  const interviewers = getInterviewersForDay(state, state.day)

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log('FROM BOOOK INTERVIEWW, id: ', id, ' interview: ', interview);
    return axios.put(`http://localhost:8001/api/appointments/${id}`,  { interview: interview })
    .then(() => setState({...state, appointments}))
  }

  // function save(name, interviewer) {
  //   const interview = {
  //     student: name,
  //     interviewer: interviewer.id
  //   };
    
  //   bookInterview(appointment.id, interview)
  // }

  function deleteHandler(id) {
    console.log('clicked')
    const interview = null

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

   return axios.delete(`http://localhost:8001/api/appointments/${id}`,  { interview: interview })
    .then((res) => console.log("success: ", res))
    .then(setState({...state, appointments}))
   // .catch(err => console.log("ERROR CATCHED: ", err))

  }

  //console.log('application js ', appointment.id, interview)
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
       // onSave={save}
        deleteHandler={deleteHandler}
        bookInterview={bookInterview}
      />
    );
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
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{schedule}</section>
    </main>
  );
}

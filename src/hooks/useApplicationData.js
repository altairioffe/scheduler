import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  // Make requests to database for appointment data & set state:
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("http://localhost:8001/api/days")),
      Promise.resolve(axios.get("http://localhost:8001/api/appointments")),
      Promise.resolve(axios.get("http://localhost:8001/api/interviewers"))
    ]).then(all => {
      setState(prev => ({
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  // RESET spots available after save
  const resetSpots = function() {
    const newDaysArr = [];

    state.days.forEach(day => {
      let spotsAvailable = 5;
      day.appointments.forEach(app => {
        if (state.appointments[app].interview) {
          spotsAvailable--;
        }
      });
      day["spots"] = spotsAvailable;
      newDaysArr.push(day);
    });

    console.log("newDaysArr: ", newDaysArr);
    return newDaysArr;
  };

  resetSpots();

  //Handles saving / updating appontment
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, {
        interview: interview
      })
      .then(() => setState({ ...state, appointments }));
  }


  //Handles appointmnent deletion
  function deleteHandler(id) {
    const interview = null;

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`, {
        interview: interview
      })
      .then(res => console.log("success: ", res))
      .then(setState({ ...state, appointments }))
      .then(() => resetSpots());
  }

  return { state, setDay, bookInterview, deleteHandler };
}

import React, {useState, useEffect} from 'react';
import axios from "axios";

export default function useApplicationData(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  console.log("APPOINTEMENTOSS ", state.appointments )
  
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


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //console.log('FROM BOOOK INTERVIEWW, id: ', id, ' interview: ', interview);
    return axios.put(`http://localhost:8001/api/appointments/${id}`,  { interview: interview })
    .then(() => setState({...state, appointments}))
  }

  function deleteHandler(id) {

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

  return(
   { state, setDay, bookInterview, deleteHandler }
  )
}
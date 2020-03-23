const getAppointmentsForDay = function(state, day) {
  let appointments = [];
  const filteredDay = state.days.filter(obj => obj.name === day);

  if (filteredDay.length > 0) {
    const appointmentList = filteredDay[0].appointments;
    for (let key in state.appointments) {
      if (appointmentList.includes(Number(key))) {
        appointments.push(state.appointments[key]);
      }
    }
  }
  return appointments;
}

const getInterview = function(state, interviewer) {
  let returnObj = {};
  if (!interviewer) {
    return null;
  }
  for (let key in state.appointments) {
    if (state.appointments[key].interview) {
      returnObj["student"] = state.appointments[key].interview.student;
      returnObj["interviewer"] = state.interviewers[interviewer.interviewer];
    }
  }
  return returnObj;
}

module.exports = { getAppointmentsForDay, getInterview};
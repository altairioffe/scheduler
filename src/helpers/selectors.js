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

const getInterviewersForDay = function(state, day) {
  let interviewers = [];
  const filteredDay = state.days.filter(obj => obj.name === day);
  if (filteredDay.length > 0) {
    const interviewersIdList = filteredDay[0].interviewers;
    for (let key in state.interviewers) {
      if (interviewersIdList.includes(Number(key))) {
        interviewers.push(state.interviewers[key]);
      }
    }
  }
  return interviewers;
}

const getInterview = function(state, interview) {
 // console.log('getInterview', interview)
  if (!interview) {
    return null;
  }
  for (let key in state.interviewers) {
    if (key === `${interview.interviewer}`) {
      return {
        student: interview.student,
        interviewer: state.interviewers[key]

      }
    }
  }
  return null;
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };

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





////


// const state = {
  // days: [
  //   {
  //     id: 1,
  //     name: "Monday",
  //     appointments: [1, 2, 3],
  //     interviewers: [1, 2]
  //   },
  //   {
  //     id: 2,
  //     name: "Tuesday",
  //     appointments: [4, 5],
  //     interviewers: [2]
  //   }
  // ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   },
//   interviewers: {
//     "1": {  
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     },
//     "2": {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png"
//     }
//   }
// };

// const getInterviewersForDay = function(state, day) {
//   let interviewers = [];
//   const filteredDay = state.days.filter(obj => obj.name === day);
//  console.log(filteredDay)
//   if (filteredDay[0].interviewers.length > 0) {
//     console.log('length: ', filteredDay[0].interviewers.length)
//     const interviewersIdList = filteredDay[0].interviewers;
//     for (let key in state.interviewers) {
//       if (interviewersIdList.includes(Number(key))) {
//         interviewers.push(state.interviewers[key]);
//       }
//     }
//   }
//   return interviewers;
// }

// console.log('interviewers are: ', getInterviewersForDay(state, "Monday"))
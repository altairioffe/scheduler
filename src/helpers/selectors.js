export default function getAppointmentsForDay(state, day) {
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
};
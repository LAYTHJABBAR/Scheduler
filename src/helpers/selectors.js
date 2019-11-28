export function getAppointmentsForDay(state, Selectedday) {
  const filteredDay = state.days.filter(day => day.name === Selectedday)[0];
  if (!filteredDay) return [];
  const appointments = filteredDay.appointments;
  let appointmentList = [];
  for (const id of appointments) {
    appointmentList.push(state.appointments[id]);
  }
  return appointmentList;
}

export function getInterview(state, interview) {
  if (interview) {
    let id = interview.interviewer
    return {
      student: interview.student,
      interviewer: state.interviewers[id]
    };
  }
  return null;
}

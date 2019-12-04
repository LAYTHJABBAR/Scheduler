export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";


function filterDaysWithSpots(days, appointments) {
    const filteredDays = days.map(day => ({
      ...day,
      spots: SpotsRemainingForDay(day, appointments)
    }));
    return filteredDays;
  }
  function SpotsRemainingForDay(day, appointments) {
    const spotsForThisDay = day.appointments;
    let freeSpots = 0;
    spotsForThisDay.forEach(Id => {
      if (!appointments[Id].interview) {
        freeSpots++;
      }
    });
  
    return freeSpots;
  }
    
export const reducer = (state, action) => {
 if (action.type === SET_DAY) {
      return { ...state, day: action.day };
    }
  
    if (action.type === SET_APPLICATION_DATA) {
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
    }
  
    if (action.type === SET_INTERVIEW) {
      const appointment = {
        //adding interview data to the already existing appoitnment in the appointments object
        ...state.appointments[action.id],
        interview: action.interview
      };
  
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };
  
      const days = filterDaysWithSpots(state.days, appointments);
      return {
        ...state,
        appointments: appointments,
        days: days
      };
    }
  
    throw new Error(
      `Tried to reduce with unsupported action type`
    );
  }

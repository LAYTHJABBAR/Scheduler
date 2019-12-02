import { useReducer, useEffect } from "react";
import axios from "axios";
const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

//function to calculate the spots remaining for each day
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

//function to return the days filtered with the free spots for each day
function filterDaysWithSpots(days, appointments) {
  const filteredDays = days.map(day => ({
    ...day,
    spots: SpotsRemainingForDay(day, appointments)
  }));
  return filteredDays;
}

function reducer(state, action) {
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
    `Tried to reduce with unsupported action type: ${action.type}`
  );
}

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

  const bookInterview = function(id, interview) {
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        //updating the appointments object and add it to the old object
        dispatch({ type: SET_INTERVIEW, id, interview });
      });
  };

  function cancel(id) {
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        //set the interview object to null
        dispatch({ type: SET_INTERVIEW, id, interview: null });
      });
  }
  // fetch the days, appointments and interviews data from the server`
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then(all => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      dispatch({
        type: SET_APPLICATION_DATA,
        days,
        appointments,
        interviewers
      });
    });
  }, []);

  return { state, setDay, bookInterview, cancel };
}

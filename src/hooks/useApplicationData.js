import { useReducer, useEffect } from "react";
import axios from "axios";

import {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
} from "../reducer/application";
import { reducer } from "../reducer/application";

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

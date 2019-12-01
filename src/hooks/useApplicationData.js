
import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function Application(props) {
    const [state, setState] = useState({
      day: "",
      days: [],
      appointments: {},
      interviewers: {}
    });
    const setDay = day => setState({ ...state, day });
    // const setDays =(setDay) => setState({...state , setDay})
  

    useEffect(() => {
        Promise.all([
          Promise.resolve(Axios.get(`http://localhost:8001/api/days`)),
          Promise.resolve(Axios.get(`http://localhost:8001/api/appointments`)),
          Promise.resolve(Axios.get(`http://localhost:8001/api/interviewers`))
        ])
          .then(all => {
    
           const days =  all[0].data;
              const appointments = all[1].data;
              const interviewers = all[2].data;
              setState(prev => ({
                days: days,
                appointments: appointments,
                interviewers: interviewers
              }))
          }
          )
          .catch(err => {
            console.log(err);
          });
      }, []);



    const bookInterview = (id, interview) => {
        const appointment = {
          ...state.appointments[id],
          interview
        }
    
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
    
        // push appointment to db and update state if successful
        return Axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
          .then(() => setState(prev => ({ ...prev, appointments })));
      }
  
     
    const cancel = (id) => {
      const appointment = {
        ...state.appointments[id],
        interview: null
      }
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
       
      // delete interview from db and update state if successful
      return Axios.delete(`http://localhost:8001/api/appointments/${id}`)
        .then(() => setState(prev => ({ ...prev, appointments })));
    }  


  return { state, setDay, bookInterview, cancel };
}
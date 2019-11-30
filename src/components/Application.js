import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Axios from "axios";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";

// const days = [
//   {
//     id: 1,
//     name: "Monday"
//     spots: 2
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0
//   }
// ];
// const appointments = [
//   {
//     id: 1,
//     time: "12pm"
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png"
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm"
//   },
//   {
//     id: 4,
//     time: "2:30pm",
//     interview: {
//       student: "James Truong",
//       interviewer: {
//         id: 5,
//         name: "Sven Jones",
//         avatar: "https://i.imgur.com/twYrpay.jpg"
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm"
//   },
// ];
export default function Application(props) {
  const [state, setState] = useState({
    day: "",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  // const setDays =(setDay) => setState({...state , setDay})

  function bookInterview(id, interview) {
    console.log(id, interview);
  }

  const ap = getAppointmentsForDay(state, state.day).map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewers= getInterviewersForDay (state, state.day);
 
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
    return (


      <Appointment key={appointment.id} id={appointment.id} {...appointment} interview={interview}

 interviewers={interviewers}
 bookInterview={bookInterview} />
    );

  });
  // const [days, setDays] = useState([])
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

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{ap}</section>
    </main>
  );
}

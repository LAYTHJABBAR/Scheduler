import React from "react";
import DayList from "../DayList/DayList";
import "components/Application/Application.scss";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from "../../helpers/selectors";
import useApplicationData from "../../hooks/useApplicationData";

export default function Application(props) {
  //define the consts that we are returning from the useApplication file
  const { state, setDay, bookInterview, cancel } = useApplicationData();
  //function to calculate the appoinments for each day
  const ap = getAppointmentsForDay(state, state.day).map(appointment => {
    //function to calculate the appoinment for each day
    const interview = getInterview(state, appointment.interview);
    //function to calculate the interviewrs for each day
    const interviewers = getInterviewersForDay(state, state.day);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancel={cancel}
      />
    );
  });

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

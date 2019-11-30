import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/form"
import Error from "components/Appointment/error";



export default function Appointment( props, id, time, interview, interviewers, bookInterview, cancelInterview, ) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


  const { mode, transition, back } = useVisualMode(
  interview ? SHOW : EMPTY
);

const onAdd = () => transition(CREATE);
const onCancel = () =>  back();


function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };
  
  props.bookInterview(props.id, interview)
  .then(() => transition(SHOW));
}

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          />
          )}
          {mode === CREATE && (
            <Form 
            interviewers={props.interviewers}
            onCancel={onCancel} 
            onSave= {save}
            />
          )}
    </article>
  );
}

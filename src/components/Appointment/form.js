import React, { useState } from "react";
import Button from "../Button/Button";
import InterviewerList from "components/IntervewList/InterviewerList";

//form js file

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  const validate = () => {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    setError("");
    props.onSave(name, interviewer);
  };
  
  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={event => setName(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={e => validate()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

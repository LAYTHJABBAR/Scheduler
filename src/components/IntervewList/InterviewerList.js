import React from "react";
import PropTypes from 'prop-types';
import InterviewerListItem from "components/InterviewListItem/InterviewerListItem";
import "./InterviewerList.scss";

export default function InterviewerList(props) {
  const Item = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        interviewer={props.interviewer}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={event => props.onChange(interviewer.id)}
      />
    );
  });

  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
   
  };


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{Item}</ul>
    </section>
  );
}

import React from "react";
import "./InterviewerListItem.scss";
var classNames = require('classnames');

export default function InterviewerListItem(props) {
    const itemClass = classNames('interviewers__item', {
      'interviewers__item--selected': props.selected,
      'interviewers__item-image': props.avatar
    });
    return (
      <li className={itemClass} onClick={props.setInterviewer}>
        <img
          className="interviewers__item-image"
          src={props.avatar}
          alt={props.name}
        />
        {props.selected && props.name}
      </li>
    );
  }
import React from "react";
import "./DayListItem.scss";
var classNames = require('classnames');

export default function DayListItem(props) {
    const dayClass = classNames({
        "day-list__item": true,
        "day-list__item--selected" : props.selected === true,
        "day-list__item--full" : props.spots === 0
      });
  return (
    <li className={dayClass} onClick ={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
}

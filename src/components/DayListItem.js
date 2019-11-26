import React from "react";
import "./DayListItem.scss";

function formatSpots(spots) {
  if (spots >= 2) {
    return spots + " spots remaining";
  }
  if (spots === 1) {
    return spots + " spot remaining";
  }
  if (spots === 0) {
    return " no spots remaining";
  }
}

var classNames = require("classnames");

export default function DayListItem(props) {
  const dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected === true,
    "day-list__item--full": props.spots === 0
  });
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

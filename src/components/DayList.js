import React, {useState, useEffect } from "react";
import DayListItem from "./DayListItem";
import useApplicationData from "./../hooks/useApplicationData"


export default function DayList(props) {
  console.log("RENDERING DAYLIST")
  const arr = props.days.map(data => {
    return (
      <DayListItem
        key={data.id}
        name={data.name}
        spots={data.spots}
        selected={data.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return <ul>{arr}</ul>;
}

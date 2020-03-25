import React, { useState, useEffect } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "../../hooks/useVisualMode";
import { getInterviewersForDay } from "../../helpers/selectors"

import Form from "components/Appointment/Form";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVE = "SAVE"
  

  const { mode, transition, back } = useVisualMode(EMPTY)
  
  useEffect(() => {
    if (props.interview) {
      console.log('USE EFFECT index.js', props.interview, mode)
      transition(SHOW);
    
    } else transition(EMPTY)
  }, [props.interview])
console.log('index.js PROPS ', props, mode)
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={(studentName, interviewer) => {
            console.log('Index.js PROPS: ', studentName, interviewer);
          props.onSave(studentName, interviewer);
        //  transition(SHOW);
          }}
          onCancel={back}
        />
      )}

    </article>
  );
}

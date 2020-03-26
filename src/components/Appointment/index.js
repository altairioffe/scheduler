import React, { useState, useEffect } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "../../hooks/useVisualMode";
import { getInterviewersForDay } from "../../helpers/selectors";

import Form from "components/Appointment/Form";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(EMPTY);

  const bookInterview = props.bookInterview

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer.id
    };
    bookInterview(props.id, interview)
    .then(transition(SHOW));

  }




  useEffect(() => {
    if (props.interview && mode !== "EDIT") {
      //  console.log('USE EFFECT index.js', props.interview, mode)
      transition(SHOW);
    } else transition(EMPTY);
  }, [props.interview]);
  //console.log('index.js PROPS ', props, mode)

  return (
    <article className="appointment">
      <Header time={props.time} />
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {
            console.log("OnDelete Props: ", props.id);
            transition(CONFIRM);
          }}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={(studentName, interviewer) => {
            //console.log('Index.js PROPS: ', studentName, interviewer);
            save(studentName, interviewer);
            transition(SAVING);
          }}
          onCancel={back}
        />
      )}

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          name={props.interview.student}
          interviewer={props.interview.interviewer}
          onSave={(studentName, interviewer) => {
            //    console.log('Index.js PROPS: ', studentName, interviewer);
            save(studentName, interviewer);
            transition(SAVING);
          }}
          onCancel={back}
        />
      )}

      {mode === SAVING && <Status message="Savin it" />}

      {mode === CONFIRM && (
        <Confirm
          onConfirm={() => {
            transition(DELETING, true);
            props.onDelete(props.id);
          }}
          onCancel={back}
          message="You want delit??!"
        />
      )}

      {mode === DELETING && <Status message="going..going...GONE!" />}
    </article>
  );
}

import React from "react";
import PropTypes from "prop-types";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

InterviewerList.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired
};

export default function InterviewerList(props) {
  const interviewersArr = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer === props.value}
        setInterviewer={event => props.onChange(interviewer)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersArr}</ul>
    </section>
  );
}

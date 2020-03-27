import React from "react";
import Form from "components/Appointment";
import { render, cleanup } from "@testing-library/react";


describe("Form", () => {
  it("renders without crashing", () => {
    render(<Form />);
  });
});
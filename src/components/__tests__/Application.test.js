import React from "react";
import axios from "axios";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  waitForElementToBeRemoved,
  queryByText,
  prettyDOM,
  queryByAltText
} from "@testing-library/react";

import Application from "components/Application/Application";
import { conditionalExpression } from "@babel/types";

afterEach(cleanup);
describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Layth" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving..."));
    expect(getByText(appointment, "Layth"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(
      container,
      "appointment"
    ).find(appointment => queryByText(appointment, "Tori Malcolm"));
    // 3. Click the "Delete" button on the booked appointment.

    fireEvent.click(getByAltText(appointments, "Delete"));
    // 4. Check that the confirmation message is shown.

    expect(
      getByText(appointments, "Delete the Appointment?")
    ).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.

    fireEvent.click(queryByText(appointments, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointments, "Deleting...")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.

    await waitForElement(() => getByAltText(appointments, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(
      container,
      "appointment"
    ).find(appointment => queryByText(appointment, "Archie Cohen"));
    // 3. Click the "Edit" button on the booked appointment.
    // console.log(prettyDOM(appointments))
    fireEvent.click(getByAltText(appointments, "Edit"));
    fireEvent.change(getAllByTestId(appointments, "student-name-input")[0], {
      target: { value: "Ali" }
    });

    fireEvent.click(getByAltText(appointments, "Sylvia Palmer"));

    fireEvent.click(getByText(appointments, "Save"));
    expect(getByText(appointments, "Saving...")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointments, "Saving..."));
    expect(getByText(appointments, "Ali"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("6. shows the save error when failing to save an appointment", async () => {
    // Setting: Fake an error with axios (once)
    axios.put.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Get the first spot
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // 4. Add an appointment
    fireEvent.click(getByAltText(appointment, "Add"));

    // 5. Enters the name for an appointment
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Click the "Save" button on the confirmation.
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    // 8. An error should be rendered.
    await waitForElement(() =>
      getByText(appointment, "Could not save the appointment")
    );
  });

  it("7. shows the delete error when failing to delete an existing appointment", async () => {
    // Setting: Fake an error with axios (once)
    axios.delete.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find(appointment => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Delete the Appointment?")
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();

    // 7. An error should be rendered.
    await waitForElement(() =>
      getByText(appointment, "Could not delete the appointment")
    );
  });
});

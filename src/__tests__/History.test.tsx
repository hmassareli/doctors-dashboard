// Button.spec.tsx
import { render, screen } from "@testing-library/react";
import moment from "moment";
import { BrowserRouter } from "react-router-dom";
import {
  Appointment,
  AppointmentType,
  InsurancePlan,
  Patient,
  Specialty,
  Status,
} from "../../types";
import History from "../components/History";

const appointments: Appointment[] = [
  {
    id: 1,
    specialty: Specialty.Cardiology,
    patientId: 1,
    type: AppointmentType.CheckUp,
    description: "Its a description",
    status: Status.Pending,
    startTime: moment().subtract(1, "day").toISOString(),
    endTime: null,
    notes: "Its a note",
  },
];
const patients: Patient[] = [
  {
    id: 1,
    name: "John Doe",
    document: "1234",
    insurancePlan: InsurancePlan.Regional,
    healthSystemId: "1",
    birthday: "2022-01-01T00:00:00.000Z",
  },
];

describe("History component tests", () => {
  test("renders without crashing", () => {
    render(
      <BrowserRouter>
        <History appointments={appointments} patients={patients} />
      </BrowserRouter>
    );
    const appointmentsOnScreen = screen.queryAllByTestId("line-appointment");

    expect(appointmentsOnScreen).toHaveLength(appointments.length);
  });
});

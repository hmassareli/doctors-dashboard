// Button.spec.tsx
import { render, screen } from "@testing-library/react";
import moment from "moment";
import {
  Appointment,
  AppointmentType,
  InsurancePlan,
  Patient,
  Specialty,
  Status,
} from "../../types";
import Calendar from "../components/Calendar";

const appointments: Appointment[] = [
  {
    id: 1,
    specialty: Specialty.Cardiology,
    patientId: 1,
    type: AppointmentType.CheckUp,
    description: "Its a description",
    status: Status.Pending,
    startTime: moment().hours(10).minutes(0).toISOString(),
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

describe("Calendar component tests", () => {
  test("renders without crashing", () => {
    render(<Calendar appointments={appointments} patients={patients} />);
    const appointmentsOnScreen = screen.queryAllByTestId("appointment");

    expect(appointmentsOnScreen).toHaveLength(appointments.length);
  });
});

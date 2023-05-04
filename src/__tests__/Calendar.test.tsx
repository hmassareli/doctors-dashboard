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

const appointmentsOutOfTime: Appointment[] = [
  {
    id: 1,
    specialty: Specialty.Cardiology,
    patientId: 1,
    type: AppointmentType.CheckUp,
    description: "Its a description",
    status: Status.Pending,
    startTime: moment().hours(5).minutes(0).toISOString(),
    endTime: null,
    notes: "Its a note",
  },
  {
    id: 2,
    specialty: Specialty.Cardiology,
    patientId: 1,
    type: AppointmentType.CheckUp,
    description: "Its a description",
    status: Status.Pending,
    startTime: moment().startOf("week").subtract(1, "day").toISOString(),
    endTime: null,
    notes: "Its a note",
  },
];

describe("Calendar component tests", () => {
  test("renders without crashing", () => {
    render(<Calendar appointments={appointments} patients={patients} />);
    const appointmentsOnScreen = screen.queryAllByTestId("appointment");

    expect(appointmentsOnScreen).toHaveLength(appointments.length);
  });
  test("doesnt render appointments that are out of 9h--18h or out of the current week", () => {
    render(
      <Calendar appointments={appointmentsOutOfTime} patients={patients} />
    );
    const appointmentsOnScreen = screen.queryAllByTestId("appointment");
    expect(appointmentsOnScreen).toHaveLength(0);
  });
});

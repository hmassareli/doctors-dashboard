// Button.spec.tsx
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { InsurancePlan, Patient } from "../../types";
import PatientsList from "../components/PatientsList";

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

describe("PatientsList component tests", () => {
  test("renders without crashing", () => {
    render(
      <BrowserRouter>
        <PatientsList patients={patients} />
      </BrowserRouter>
    );
    const patientsOnScreen = screen.queryAllByTestId("patient");

    expect(patientsOnScreen).toHaveLength(patients.length);
  });
});

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Appointment, Patient } from "../../../types";
import Calendar from "../../components/Calendar";
import { getAppointments, getPatients } from "../../services";
const Paragraph = styled.p`
  color: red;
`;
const App = () => {
  const [appointments, setAppointments] = useState<Appointment[] | []>([]);
  const [patients, setPatients] = useState<Patient[] | []>([]);

  useEffect(() => {
    getAppointments().then((data) => {
      setAppointments(data);
    });
    getPatients().then((data) => {
      setPatients(data);
    });
  }, []);
  return (
    <div>
      <Paragraph>Hello</Paragraph>
      <Calendar appointments={appointments} patients={patients} />
    </div>
  );
};

export default App;

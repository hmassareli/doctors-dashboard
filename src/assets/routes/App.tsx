import { useEffect, useState } from "react";
import styled from "styled-components";
import { Appointment, Patient } from "../../../types";
import Calendar from "../../components/Calendar";
import History from "../../components/History";
import { getAppointments, getPatients } from "../../services";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #eef0f3;
  font-family: Inter;
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
    <Wrapper>
      <Calendar appointments={appointments} patients={patients} />
      <History appointments={appointments} patients={patients} />
    </Wrapper>
  );
};

export default App;

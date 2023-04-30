import { useEffect, useState } from "react";
import styled from "styled-components";
import { Appointment } from "../../../types";
import Calendar from "../../components/Calendar";
import { getAppointments } from "../../services";
const Paragraph = styled.p`
  color: red;
`;
const App = () => {
  const [appointments, setAppointments] = useState<Appointment[] | []>([]);

  useEffect(() => {
    getAppointments().then((data) => {
      setAppointments(data);
    });
  }, []);
  return (
    <div>
      <Paragraph>Hello</Paragraph>
      <Calendar appointments={appointments} />
    </div>
  );
};

export default App;

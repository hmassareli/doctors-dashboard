import { useEffect, useState } from "react";
import { Appointment, Patient } from "../../../types";
import Calendar from "../../components/Calendar";
import { getAppointments, getPatients } from "../../services";

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
      <Calendar appointments={appointments} patients={patients} />
    </div>
  );
};

export default App;

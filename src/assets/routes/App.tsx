import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Patient } from "../../../types";
import Calendar from "../../components/Calendar";
import History from "../../components/History";
import PatientsList from "../../components/PatientsList";
import { getAppointments, getPatients } from "../../services";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #eef0f3;
  font-family: Inter;
  padding: 50px;

  @media screen and (max-width: 800px) {
    padding-inline: 0px;
  }
  .calendar-wrapper {
    margin-inline: 20px;
  }
  h2 {
    margin-block: 30px;
    font-size: 20px;
  }
  .dashboard {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 40px;
  }
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 20px;
  & > div {
    flex: 1 1 0px;
  }
`;

const App = () => {
  const { data: patients } = useQuery<Patient[]>(["patients"], getPatients, {
    retry: true,
    retryDelay: 500,
  });
  const typeSafePatients = patients || [];

  const { data: appointments } = useQuery(["appointment"], getAppointments, {
    retry: true,
    retryDelay: 500,
  });

  const pastAppointments = (appointments || []).filter((appointment) => {
    if ((patients || []).length === 1) return true;
    return appointment.status !== "pending";
  });

  return (
    <Wrapper>
      <div className="calendar-wrapper">
        <h1 className="dashboard">Dashboard</h1>
        <Calendar
          appointments={appointments || []}
          patients={typeSafePatients}
        />
      </div>
      <InfoWrapper>
        <div>
          <h2>Patients</h2>
          <PatientsList patients={typeSafePatients} />
        </div>
        <div>
          <h2>History</h2>
          <History
            appointments={pastAppointments}
            patients={typeSafePatients}
          />
        </div>
      </InfoWrapper>
    </Wrapper>
  );
};

export default App;

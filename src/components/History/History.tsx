import moment from "moment";
import styled from "styled-components";
import { Appointment, Patient } from "../../../types";

type HistoryProps = {
  appointments: Appointment[];
  patients: Patient[];
};
enum TypeString {
  surgery = "surgery",
  firstVisit = "first visit",
  followUp = "follow up",
  checkUp = "check up",
  exam = "exam",
}
enum SpecialtyString {
  cardiology = "Cardiology",
  neurology = "Neurology",
  general = "General",
}
const StatusTag = styled.p<{ status: string }>`
  font-family: Inter;
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 14px;
  color: ${(props) =>
    props.status === "absent"
      ? "#e74c3c"
      : props.status === "completed"
      ? "#1abc9c"
      : "#838383"};
  border-radius: 100px;
`;
const HistoryContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 2px;
  font-family: Inter;
  font-weight: 500;
  flex-direction: column;
  border-radius: 5px;
`;
const LineAppointment = styled.div`
  background-color: white;
  height: 50px;
  width: 100%;
  max-width: 1800px;
  align-items: center;
  padding: 10px 50px;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;
const Specialty = styled.p`
  font-weight: 500;
  width: 200px;
`;

const Name = styled.p`
  font-weight: 700;
  width: 200px;
`;
const Type = styled.p<{ type: string }>`
  background-color: ${(props) =>
    props.type === "surgery"
      ? "#e74d3c50"
      : props.type === "firstVisit"
      ? "#3498db50"
      : props.type === "followUp"
      ? "#8e44ad50"
      : props.type === "checkUp"
      ? "#f39c1250"
      : "#16a08550"};

  color: ${(props) =>
    props.type === "surgery"
      ? "#e74c3c"
      : props.type === "firstVisit"
      ? "#3498db"
      : props.type === "followUp"
      ? "#8e44ad"
      : props.type === "checkUp"
      ? "#f39c12"
      : "#16a085"};

  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 5px;
`;
const Time = styled.p`
  color: gray;
  font-weight: 400;
  font-weight: 500;
  width: 200px;
`;

const History = ({ appointments, patients }: HistoryProps) => {
  const getPatientName = (id: number) => {
    return (
      patients &&
      patients.find((patient) => {
        return patient.id === id;
      })?.name
    );
  };
  const getFormattedDate = (date: string) => {
    return moment(date).format("ll");
  };
  const getFormattedHours = (date: string) => {
    return moment(date).format("HH:mm");
  };

  const pastAppointments = appointments
    .filter((appointment) => {
      return appointment.status !== "pending";
    })
    .sort(
      (a, b) => moment(b.startTime).valueOf() - moment(a.startTime).valueOf()
    );

  return (
    <>
      <h1>History</h1>
      <HistoryContainer>
        {pastAppointments.map((appointment) => {
          return (
            <LineAppointment key={appointment.id}>
              <Name>{getPatientName(appointment.patientId)}</Name>
              <Specialty>{SpecialtyString[appointment.specialty]}</Specialty>
              <Time>
                {getFormattedDate(appointment.startTime)}{" "}
                {getFormattedHours(appointment.startTime)}
              </Time>
              <StatusTag status={appointment.status}>
                {appointment.status}
              </StatusTag>

              <Type type={appointment.type}>
                {TypeString[appointment.type]}
              </Type>
            </LineAppointment>
          );
        })}
      </HistoryContainer>
    </>
  );
};

export default History;

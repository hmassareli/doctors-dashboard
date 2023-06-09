import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Appointment, Patient } from "../../../types";
import { getFormattedDate, getFormattedHours } from "../../utils";
import CustomPagination from "../Pagination/Pagination";

type HistoryProps = {
  appointments: Appointment[] | [];
  patients: Patient[];
  hideName?: boolean;
  perPage?: number;
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
const StatusTag = styled.p<{ status: string; alwaysShow?: boolean }>`
  font-family: Inter;
  width: 100px;
  height: 30px;
  display: ${(props) => (props.alwaysShow ? "flex" : "none")};
  @media screen and (min-width: 500px) {
    display: flex;
  }
  margin-right: 10px;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 14px;
  color: ${(props) =>
    props.status === "absent"
      ? "#e74c3c"
      : props.status === "completed"
      ? "#1abc9c"
      : props.status === "pending"
      ? "orange"
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
  border-radius: 10px;
  overflow: hidden;
`;
const LineAppointment = styled.div`
  background-color: white;
  height: 50px;
  width: 100%;
  align-items: center;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;
const Specialty = styled.p<{ hideName?: boolean }>`
  display: none;

  @media screen and (min-width: 800px) {
    display: flex;
  }
  margin-left: ${(props) => (props.hideName ? "30px" : "0px")};
  font-weight: 500;
  width: 200px;
`;

const Name = styled.p<{ hideName?: boolean }>`
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
  display: ${(props) => (props.hideName ? "none" : "flex")};
  font-weight: 700;
  margin-left: 10px;
  @media screen and (min-width: 800px) {
    margin-left: 30px;
  }
  width: 150px;
`;
const Type = styled.p<{ type: string }>`
  margin-right: 10px;
  display: none;

  @media screen and (min-width: 800px) {
    display: flex;
    margin-right: 30px;
  }

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
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 5px;
`;
const Time = styled.p`
  margin-left: 20px;
  color: gray;
  font-weight: 400;
  font-weight: 500;
  width: 150px;
`;

const History = ({
  appointments,
  patients,
  hideName,
  perPage = 10,
}: HistoryProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [visibleApppointments, setVisibleApppointments] = useState<
    Appointment[]
  >([]);
  const navigate = useNavigate();
  const sortedAppointments = appointments.sort((a, b) => {
    return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
  });

  useEffect(() => {
    const indexOfLastPost = currentPage * perPage;
    const indexOfFirstPost = indexOfLastPost - perPage;
    setVisibleApppointments(
      sortedAppointments.slice(indexOfFirstPost, indexOfLastPost)
    );
  }, [currentPage, perPage, sortedAppointments]);

  const paginate = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };
  const getPatientName = (id: number) => {
    return (
      patients &&
      patients.find((patient) => {
        return patient.id === id;
      })?.name
    );
  };

  return (
    <>
      <HistoryContainer>
        {visibleApppointments.map((appointment) => {
          return (
            <LineAppointment
              key={appointment.id}
              data-testid="line-appointment"
            >
              <Name
                hideName={hideName}
                onClick={() => navigate(`/patient/${appointment.patientId}`)}
              >
                {getPatientName(appointment.patientId)}{" "}
              </Name>
              <Specialty hideName={hideName}>
                {SpecialtyString[appointment.specialty]}
              </Specialty>
              <Time>
                {getFormattedDate(appointment.startTime)}{" "}
                {getFormattedHours(appointment.startTime)}
              </Time>
              <StatusTag
                status={appointment.status}
                alwaysShow={patients.length === 1}
              >
                {appointment.status}
              </StatusTag>

              <Type type={appointment.type}>
                {TypeString[appointment.type]}
              </Type>
            </LineAppointment>
          );
        })}
      </HistoryContainer>
      <CustomPagination
        perPage={perPage}
        length={appointments.length}
        paginateFunction={paginate}
      />
    </>
  );
};

export default History;

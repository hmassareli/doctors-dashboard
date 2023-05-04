import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Appointment, Patient } from "../../../types";
import arrowLeft from "../../assets/icons/arrow-left.svg";
import { getFormattedDate, getFormattedHours } from "../../utils";

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
const StatusTag = styled.p<{ status: string }>`
  font-family: Inter;
  width: 100px;
  height: 30px;
  display: none;
  @media screen and (min-width: 500px) {
    display: flex;
  }
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
const PaginationContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  .page-number {
    display: flex;
    .arrowRight {
      transform: rotate(180deg);
    }
  }

  .pagination {
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    li.selected {
      background-color: #1abc9c;
      border-radius: 5px;
      color: white;
    }
    display: flex;
    list-style-type: none;
  }
  .pagination li {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;

    width: 30px;
    height: 30px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    background-color: white;
  }
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
  width: 200px;
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
  color: gray;
  font-weight: 400;
  font-weight: 500;
  width: 200px;
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
            <LineAppointment key={appointment.id}>
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
      <PaginationContainer>
        <ReactPaginate
          onPageChange={paginate}
          pageCount={Math.ceil(appointments.length / perPage)}
          previousLabel={
            <img
              src={arrowLeft}
              alt="left arrow"
              width={25}
              height={25}
              className="arrowLeft"
            />
          }
          nextLabel={
            <img
              src={arrowLeft}
              alt="right arrow"
              width={25}
              height={25}
              className="arrowRight"
            />
          }
          containerClassName={"pagination"}
          pageLinkClassName={"page-number"}
          previousLinkClassName={"page-number"}
          nextLinkClassName={"page-number"}
          activeLinkClassName={"active"}
        />
      </PaginationContainer>
    </>
  );
};

export default History;

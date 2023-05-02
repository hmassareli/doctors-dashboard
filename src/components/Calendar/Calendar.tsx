import styled from "styled-components";
import { Appointment, Patient } from "../../../types";
import { Appointments } from "./Appointments";

export type CalendarProps = {
  appointments: Appointment[];
  patients: Patient[];
};
const CalendarWrapper = styled.div`
  width: 100%;
  background-color: white;
  height: 100%;
  overflow: auto;
  display: flex;
  #times {
    width: 40px;
    height: max-content;
    display: flex;
    flex-direction: column;
    gap: 1px;
    div {
      p {
        font-family: Inter;
        font-size: 12px;
        height: 100%;
        margin: 0px;
        margin-right: 5px;
        text-align: end;
        white-space: nowrap;
      }
      height: 60px;
    }
  }
`;
const TableCalendar = styled.div`
  width: 100%;
  display: flex;

  flex-direction: column;
  #heading {
    margin-left: 40px;
    font-weight: 600;
    display: flex;
    justify-content: space-around;
    width: calc(100%-40px);
    min-width: 460px;
    p {
      font-family: Inter;
      text-align: center;
      margin: auto;
    }
  }
  #body {
    min-width: 500px;
    max-height: 500px;
    @media screen and (min-width: 500px) {
      overflow: auto;
    }
    display: flex;
  }
  #squares {
    margin-top: 10px;
    display: grid;
    height: max-content;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(18, 60px);
    width: 100%;
    gap: 1px;
    position: relative;
    background-color: #dbd9d9;
    border-top: 1px solid #dbd9d9;
    border-bottom: 1px solid #dbd9d9;
    #subgrid {
      background-color: white;
    }
  }
`;

export const Calendar = ({ appointments, patients }: CalendarProps) => {
  return (
    <CalendarWrapper>
      <TableCalendar>
        <div id="heading">
          <div>
            <p>Mon</p>
          </div>
          <div>
            <p>Tue</p>
          </div>
          <div>
            <p>Wed</p>
          </div>
          <div>
            <p>Thu</p>
          </div>
          <div>
            <p>Fri</p>
          </div>
        </div>
        <div id="body">
          <div id="times">
            {[...Array(9).keys()].map((key) => {
              return (
                <>
                  <div key={key + "-1"}>
                    <p id={key === 0 ? "first" : ""}>{key + 9}:00</p>
                  </div>
                  <div key={key + "-2"}>
                    <p>{key + 9}:30</p>
                  </div>
                </>
              );
            })}
            <div key={"last"}>
              <div>
                <p id="last">18:00</p>
              </div>
            </div>
          </div>
          <div id="squares" key={"squares"}>
            {[...Array(18 * 5).keys()].map((key) => {
              return <div key={key} id="subgrid"></div>;
            })}
            <Appointments patients={patients} appointments={appointments} />
          </div>
        </div>
      </TableCalendar>
    </CalendarWrapper>
  );
};

import styled from "styled-components";
import { Appointment, Patient } from "../../../types";
import { Appointments } from "./Appointments";

export type CalendarProps = {
  appointments: Appointment[];
  patients: Patient[];
};
const CalendarWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-width: 500px;
  display: flex;
  #times {
    height: max-height;
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 20px;
    div {
      p {
        font-family: Inter;
        font-size: 12px;
        height: 100%;
        margin: 0px;
        margin-top: -10px;
        margin-right: 5px;
        text-align: end;
        white-space: nowrap;
        &#last {
          margin-top: -15px;
        }
        &#first {
          margin-top: -6px;
        }
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
    font-weight: 600;
    display: flex;
    justify-content: space-around;
    width: 100%;
    p {
      font-family: Inter;
      text-align: center;
      margin: auto;
    }
  }
  #body {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(18, 60px);
    width: 100%;
    gap: 5px;
    position: relative;
    #subgrid {
      border: 1px solid #ededed;
    }
  }
`;

export const Calendar = ({ appointments, patients }: CalendarProps) => {
  return (
    <CalendarWrapper>
      <div id="times">
        {[...Array(9).keys()].map((key) => {
          return (
            <>
              <div>
                <p id={key === 0 ? "first" : ""}>{key + 9}:00</p>
              </div>
              <div>
                <p>{key + 9}:30</p>
              </div>
            </>
          );
        })}
        <div>
          <div>
            <p id="last">18:00</p>
          </div>
        </div>
      </div>
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
          {[...Array(18 * 5).keys()].map((key) => {
            return <div key={key} id="subgrid"></div>;
          })}
          <Appointments patients={patients} appointments={appointments} />
        </div>
      </TableCalendar>
    </CalendarWrapper>
  );
};

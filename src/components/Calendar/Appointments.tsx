import moment from "moment";
import styled from "styled-components";
import { CalendarProps } from "./Calendar";

const Post = styled.div<{
  rowStart: number;
  rowEnd: number;
  colStart: number;
  colEnd: number;
}>`
  grid-area: ${({ rowStart, rowEnd, colStart, colEnd }) =>
    `${rowStart} /  ${colStart} / ${rowEnd} / ${colEnd}`};
  font-size: 14px;
  background-color: #039be5;
  color: white;
  border-radius: 5px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  p {
    @media screen and (max-width: 800px) {
      &#description {
        font-family: Cabin;
        display: none;
      }
    }
    font-family: Inter;
    font-size: 12px;
    margin: 0;
    :nth-child(1) {
      font-weight: bold;
    }
  }
`;

function isWithinCurrentWeek(dateToCheck: Date) {
  const today = new Date();

  const startOfWeek = new Date(
    moment(today).startOf("week").add("1", "day").startOf("day").format()
  );

  const endOfWeek = new Date(moment(today).endOf("week").endOf("day").format());

  return dateToCheck >= startOfWeek && dateToCheck <= endOfWeek;
}

export const Appointments = ({ appointments, patients }: CalendarProps) => {
  return (
    <>
      {appointments.map((appointment) => {
        const startTime = new Date(appointment.startTime);
        const provisoryTime = new Date(
          moment(appointment.startTime).add(30, "minutes").format()
        );
        const endTime = new Date(appointment.endTime || provisoryTime);
        const startOfDay = new Date(
          moment(startTime).startOf("day").add("9", "hours").format()
        );
        const colStart = startTime.getDay();
        const colEnd = endTime.getDay() + 1;

        const getTimeDiff = (time: Date) =>
          time.getTime() - startOfDay.getTime();
        const rowStart = Math.ceil(getTimeDiff(startTime) / 1800000);
        const rowEnd = Math.ceil(getTimeDiff(endTime) / 1800000);
        const isWithinWorkingHours =
          startTime.getHours() >= 9 && startTime.getHours() < 18;
        const patient = patients.find(
          (patient) => patient.id === appointment.patientId
        );

        if (
          endTime.getTime() < startTime.getTime() ||
          !isWithinCurrentWeek(startTime) ||
          !isWithinWorkingHours
        ) {
          return null;
        }
        return (
          <Post
            rowStart={rowStart}
            rowEnd={rowEnd}
            colStart={colStart}
            colEnd={colEnd}
            key={appointment.id}
          >
            <p>{patient?.name}</p>
            <p id="description">{appointment.description}</p>
          </Post>
        );
      })}
    </>
  );
};

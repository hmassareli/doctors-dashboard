import styled from "styled-components";
import { Appointment } from "../../../types";

type CalendarProps = {
  appointments: Appointment[];
};
function isWithinCurrentWeek(dateToCheck: Date) {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 para domingo, 1 para segunda, etc.

  // Subtrai o número de dias desde domingo até hoje
  const startOfWeek = new Date(
    today.getTime() - (dayOfWeek - 1) * 24 * 60 * 60 * 1000
  );
  startOfWeek.setHours(0, 0, 0, 0); // ajusta para 0 horas, 0 minutos, 0 segundos e 0 milissegundos

  // Adiciona mais 6 dias para obter o fim da semana
  const endOfWeek = new Date(startOfWeek.getTime() + 4 * 24 * 60 * 60 * 1000);
  endOfWeek.setHours(23, 59, 59, 999); // ajusta para 23 horas, 59 minutos, 59 segundos e 999 milissegundos

  return dateToCheck >= startOfWeek && dateToCheck <= endOfWeek;
}

const TableCalendar = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  #heading {
    display: flex;
    justify-content: space-between;
    width: 100%;
    p {
      color: red;
      text-align: center;
      margin: auto;
    }
  }
  #body {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(18, 40px);
    width: 100%;
    gap: 5px;
    position: relative;
    #subgrid {
      border: 1px solid #ededed;
    }
  }
`;

const Post = styled.div<{
  rowStart: number;
  rowEnd: number;
  colStart: number;
  colEnd: number;
}>`
  grid-area: ${({ rowStart, rowEnd, colStart, colEnd }) =>
    `${rowStart} /  ${colStart} / ${rowEnd} / ${colEnd}`};
  background-color: #039be5;
  color: white;
  border-radius: 5px;
  text-align: center;
  display: flex;
  justify-content: center;
  position: absolute;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid white;
`;

const Appointments = ({ appointments }: CalendarProps) => {
  return (
    <>
      {appointments.map((appointment) => {
        const startTime = new Date(appointment.startTime);
        const provisoryTime = new Date(startTime.getTime() + 30 * 60 * 1000);
        const endTime = new Date(appointment.endTime || provisoryTime);
        const startOfDay = new Date(
          startTime.getFullYear(),
          startTime.getMonth(),
          startTime.getDate(),
          9
        );
        const colStart = startTime.getDay();
        const colEnd = endTime.getDay() + 1;
        const getTimeDiff = (time: Date) =>
          time.getTime() - startOfDay.getTime();
        const rowStart = Math.ceil(getTimeDiff(startTime) / 1800000);
        const rowEnd = Math.ceil(getTimeDiff(endTime) / 1800000);
        const isWithinWorkingHours =
          startTime.getHours() >= 9 && startTime.getHours() < 18;

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
            <p>
              {startTime.toLocaleDateString()} - {endTime.toLocaleDateString()}
            </p>
          </Post>
        );
      })}
    </>
  );
};

export const Calendar = ({ appointments }: CalendarProps) => {
  return (
    <div>
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
          <Appointments appointments={appointments} />
        </div>
      </TableCalendar>
    </div>
  );
};

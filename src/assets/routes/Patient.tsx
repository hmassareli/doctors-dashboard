import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Appointment, Patient as PatientType } from "../../../types";
import History from "../../components/History";
import { getAppointments, getPatient } from "../../services";
import {
  capitalizeFirstLetter,
  formatCpfWithsymbols,
  formatHealthSystem,
  getFormattedDate,
} from "../../utils";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  font-family: Inter;
`;
const BasicInfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-block: 20px;
  margin-inline: 20px;

  div {
    min-height: 100px;
  }
`;
const Content = styled.div`
  flex: 1 1 0px;
  display: flex;
  flex-direction: column;
  background-color: #eef0f3;
  .back-home {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    text-decoration: none;
    font-family: Inter;
    color: #0070f3;
    font-weight: 600;
    :hover {
      text-decoration: underline;
    }
  }
`;

const PatientInfo = styled.div`
  flex: 1 1 0px;
  border-radius: 10px;
  background-color: white;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
`;
const PatientInfoTitle = styled.p`
  font-family: Inter;
  font-weight: bold;
  font-size: 14px;
`;
const PatientName = styled.p`
  font-family: Inter;
  font-weight: bold;
  font-size: 20px;
`;
const DocumentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PlanWrapper = styled.div`
  flex: 1 1 0px;
  border-radius: 10px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 10px;
  height: 100px;
`;
const HistoryPeriod = styled.div`
  height: 50px;
  background-color: #eef0f3;
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: start;
`;
const PeriodOption = styled.div<{ selected: boolean }>`
  font-weight: 500;
  cursor: pointer;
  display: flex;
  border-radius: 5px 5px 0px 0px;
  background-color: ${(props) => (props.selected ? "white" : "#d9dbdc")};
  align-items: center;
  width: 100px;
  justify-content: center;
  height: 100%;
`;
const HistoryWrapper = styled.div`
  margin-inline: 20px;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
`;
const AppointmentDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-inline: 30px;
  margin-block: 20px;

  .doctor-says {
    margin: 10px 0px;
    font-weight: bold;
    font-size: 14px;
    p {
      font-size: 14px;
      font-weight: 500;
      margin-left: 10px;
    }
  }
`;
const AppointmentDetails = styled.div`
  .title {
    font-weight: bold;
  }
  p {
    font-size: 14px;
  }
  display: flex;
  justify-content: space-between;
`;

const PlanInfoTitle = PatientInfoTitle;
const InsurancePlan = PatientName;
const Specialty = PatientName;
const LatestAppointmentTitle = PatientInfoTitle;
const LatestAppointmentWrapper = PlanWrapper;

const Patient = () => {
  const [patient, setPatient] = useState<PatientType | undefined>();
  const [appointmentsFromPatient, setAppointmentsFromPatient] = useState<
    Appointment[] | []
  >([]);
  const [appointmentsByPeriod, setAppointmentsByPeriod] = useState<
    Appointment[]
  >([]);

  const [periodSelected, setPeriodSelected] = useState<number>(0);

  const params = useParams();
  const { id } = params;
  const patientMutation = useMutation({
    mutationFn: () => getPatient(id || ""),
    retry: true,
    retryDelay: 500,
    onSuccess: (data) => {
      setPatient(data);
    },
  });
  const appointmentMutation = useMutation({
    mutationFn: () => getAppointments(),
    retry: true,
    retryDelay: 500,
    onSuccess: (data) => {
      const appointments = data.filter((app) => {
        return `${app.patientId}` === id;
      });
      setAppointmentsFromPatient(appointments);
    },
  });

  useEffect(() => {
    if (!id) return;
    patientMutation.mutate();
    appointmentMutation.mutate();
  }, [id]);

  useEffect(() => {
    setAppointmentsByPeriod(
      appointmentsFromPatient.filter((app) => {
        if (periodSelected === 0)
          return (
            moment(app.startTime).isAfter(moment().subtract(10, "days")) &&
            moment(app.startTime).isBefore(moment())
          );
        if (periodSelected === 1)
          return moment(app.startTime).isAfter(moment());
        return moment(app.startTime).isBefore(moment());
      })
    );
  }, [periodSelected, appointmentsFromPatient]);

  const age = moment().diff(patient?.birthday || "", "years");

  return (
    <Wrapper>
      <Content>
        <BasicInfoWrapper>
          <PatientInfo>
            <PatientInfoTitle>Patient</PatientInfoTitle>
            <PatientName>{patient?.name}</PatientName>
            <DocumentWrapper>
              <p>{formatCpfWithsymbols(patient?.document || "")}</p>
              <p>{age}y/o</p>
            </DocumentWrapper>
          </PatientInfo>
          <PlanWrapper>
            <PlanInfoTitle>Plan Info</PlanInfoTitle>
            <InsurancePlan>{patient?.insurancePlan} </InsurancePlan>
            <p>{formatHealthSystem(patient?.healthSystemId || "")}</p>
          </PlanWrapper>
          <LatestAppointmentWrapper>
            <LatestAppointmentTitle>Latest App.</LatestAppointmentTitle>
            <Specialty>
              {capitalizeFirstLetter(
                appointmentsFromPatient[0]?.specialty || ""
              )}
            </Specialty>
            <p>
              {moment(appointmentsFromPatient[0]?.startTime).format(
                "DD/MM/YYYY"
              )}
            </p>
          </LatestAppointmentWrapper>
        </BasicInfoWrapper>
        <HistoryWrapper>
          <HistoryPeriod>
            <PeriodOption
              onClick={() => setPeriodSelected(0)}
              selected={periodSelected === 0}
            >
              Recent
            </PeriodOption>
            <PeriodOption
              onClick={() => setPeriodSelected(1)}
              selected={periodSelected === 1}
            >
              Upcoming
            </PeriodOption>
            <PeriodOption
              onClick={() => setPeriodSelected(2)}
              selected={periodSelected === 2}
            >
              History
            </PeriodOption>
          </HistoryPeriod>

          <History
            appointments={appointmentsByPeriod}
            patients={patient ? [patient] : []}
            hideName
          />
          <AppointmentDetailsWrapper>
            <AppointmentDetails>
              <p className="title">Appointment Details</p>
              <p>{getFormattedDate(appointmentsByPeriod[0]?.startTime)}</p>
            </AppointmentDetails>
            <div className="doctor-says">
              Doctor Says
              <p>{appointmentsByPeriod[0]?.notes}</p>
            </div>
          </AppointmentDetailsWrapper>
        </HistoryWrapper>

        <Link className="back-home" to="/">
          {" "}
          Go back to Home
        </Link>
      </Content>
    </Wrapper>
  );
};
export default Patient;

import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Appointment, Patient as PatientType } from "../../../types";
import { getAppointments, getPatient } from "../../services";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  font-family: Inter;
`;
const BasicInfoWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  height: 300px;
`;
const Content = styled.div`
  width: 80%;
  background-color: #eef0f3;
`;
const Navbar = styled.div`
  width: 20%;
  height: 700px;
  background-color: white;
`;
const PatientInfo = styled.div`
  border-radius: 10px;
  background-color: white;
  width: 400px;
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
  border-radius: 10px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 10px;
  width: 400px;
  height: 100px;
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
  const formatCpfWithsymbols = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };
  const formatHealthSystem = (healthSystemId: string) => {
    return healthSystemId.replace(/(\d{3})(\d{3})(\d{4})/, "$1.$2/$3");
  };
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    if (!id) return;
    getPatient(id).then((data) => setPatient(data));
    getAppointments().then((data) => {
      const appointments = data.filter((app) => {
        return `${app.patientId}` === id;
      });
      const sortedAppointments = appointments.sort((a, b) => {
        return (
          new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
        );
      });
      setAppointmentsFromPatient(sortedAppointments);
    });
  }, [id]);
  const age = moment().diff(patient?.birthday || "", "years");
  return (
    <Wrapper>
      <Navbar>
        <div></div>
      </Navbar>
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
              {capitalizeFirstLetter(appointmentsFromPatient[0]?.specialty)}
            </Specialty>
            <p>
              {moment(appointmentsFromPatient[0]?.startTime).format(
                "DD/MM/YYYY"
              )}
            </p>
          </LatestAppointmentWrapper>
        </BasicInfoWrapper>
      </Content>
    </Wrapper>
  );
};
export default Patient;

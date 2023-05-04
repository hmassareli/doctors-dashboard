import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Patient } from "../../../types";
import { formatCpfWithsymbols } from "../../utils";
import CustomPagination from "../Pagination/Pagination";

type Props = {
  patients: Patient[];
  perPage?: number;
};
const PatientsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  gap: 2px;
  border-radius: 10px;
  overflow: hidden;
  .name {
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
    font-weight: 600;
    width: 150px;
  }
  div {
    padding: 10px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
  }
  .insurance {
    display: none;

    @media screen and (min-width: 800px) {
      display: block;
    }
    color: #838383;
    width: 150px;
    text-align: start;
  }
`;

const PatientsList = ({ patients, perPage = 10 }: Props) => {
  const navigate = useNavigate();
  const [visiblePatients, setVisiblePatients] = useState<Patient[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const indexOfLastPatient = currentPage * perPage;
    const indexOfFirstPatient = indexOfLastPatient - perPage;
    setVisiblePatients(patients.slice(indexOfFirstPatient, indexOfLastPatient));
  }, [currentPage, perPage, patients]);

  const paginate = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <>
      <PatientsWrapper>
        {visiblePatients.map((patient) => {
          return (
            <div key={patient.id}>
              <p
                className="name"
                onClick={() => navigate(`/patient/${patient.id}`)}
              >
                {patient.name}
              </p>
              <p className="insurance">{patient.insurancePlan}</p>
              <p>{formatCpfWithsymbols(patient.document)}</p>
            </div>
          );
        })}
      </PatientsWrapper>
      <CustomPagination
        perPage={perPage}
        length={patients.length}
        paginateFunction={paginate}
      />
    </>
  );
};

export default PatientsList;

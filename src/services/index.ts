import axios from "axios";
import { Appointment, Patient } from "../../types/index";

const url = "https://cm42-medical-dashboard.herokuapp.com/";

const api = axios.create({
  baseURL: url,
  timeout: 1000,
  headers: {},
});

export const getPatients = async () => {
  const response = await api.get<Patient[]>("/patients");
  return response.data;
};

export const getPatient = async (id: string) => {
  const response = await api.get<Patient>(`/patients/${id}`);
  return response.data;
};

export const getAppointments = async () => {
  const response = await api.get<Appointment[]>("/appointments");
  return response.data;
};

export const getAppointment = async (id: string) => {
  const response = await api.get<Appointment>(`/appointments/${id}`);
  return response.data;
};

import moment from "moment";

export const formatCpfWithsymbols = (cpf: string) => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};
export const formatHealthSystem = (healthSystemId: string) => {
  return healthSystemId.replace(/(\d{3})(\d{3})(\d{4})/, "$1.$2/$3");
};
export const capitalizeFirstLetter = (word: string) => {
  return word?.charAt(0).toUpperCase() + word?.slice(1);
};
export const getFormattedDate = (date: string) => {
  return moment(date).format("ll");
};
export const getFormattedHours = (date: string) => {
  return moment(date).format("HH:mm");
};

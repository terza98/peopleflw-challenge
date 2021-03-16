import axios from 'axios';

const API_URL = 'https://60508361534609001766feb9.mockapi.io/';

export const getAllEmployees = () => {
  return axios.get(API_URL + 'employees');
};

export const addNewEmployee = name => {
  return axios.post(API_URL + `employees`, { name });
};

export const updateEmployeeState = (id, stateName) => {
  return axios.put(API_URL + `employees/${id}`, { state: stateName });
};

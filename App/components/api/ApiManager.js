import axios from 'axios';

const ApiManager = axios.create({
  baseURL: 'https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/login/v1',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManager;

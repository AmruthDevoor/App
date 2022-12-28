import axios from 'axios';

const ApiManager = axios.create({
  baseURL: 'https://wallkinrowaterplant.cloudjiffy.net/rsenterprisestechnician/login/v1',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManager;

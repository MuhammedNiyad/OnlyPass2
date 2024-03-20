/* eslint-disable prettier/prettier */
import axios from 'axios';

export const BASE_URL = 'http://192.168.20.4:5000/api';

export const ApiClientPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {}
});

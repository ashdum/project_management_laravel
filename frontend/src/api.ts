import axios from "axios";

const API_URL = "http://localhost:8080/api"; // Адрес Laravel API

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

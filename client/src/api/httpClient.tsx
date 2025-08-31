import axios from "axios";

const exampleServer = "https://api.restful-api.dev/"
const localServer = "http://127.0.0.1:8000"

const httpClient = axios.create({
  baseURL: localServer,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000,
});

export default httpClient;
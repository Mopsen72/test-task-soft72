import axios from "axios";

export const axiosAppInstance = axios.create({
    baseURL: "https://www.googleapis.com/books/v1"
})
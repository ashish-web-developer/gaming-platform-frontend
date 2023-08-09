import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const token = cookies.get("token");

const Axios = axios.create({
  withCredentials: true,
  baseURL: `${process.env.NEXT_PUBLIC_API_END_POINT}/api`,
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token}`,
  },
});

const PusherAxios = axios.create({
  withCredentials: true,
  baseURL: `${process.env.NEXT_PUBLIC_API_END_POINT}`,
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token}`,
  },
});

export { Axios, PusherAxios };

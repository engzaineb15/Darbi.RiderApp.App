import axios, { AxiosInstance } from "axios";
import { useSelector, useDispatch } from "react-redux";
import { removeUser, UserLogOut } from "../redux/user";
export const API_URL = "https://api.example.com";

interface UseApi {
  get: (endpoint: string) => Promise<any>;
  post: (
    endpoint: string,
    data: any,
    extraHeaders?: Record<string, string>
  ) => Promise<any>;
  deleteRequest: (endpoint: string, data: any) => Promise<any>;
  post_Without_Token: (endpoint: string, data: any) => Promise<any>;
  put: (
    endpoint: string,
    data: any,
    extraHeaders?: Record<string, string>
  ) => Promise<any>;
  patch: (
    endpoint: string,
    data: any,
    extraHeaders?: Record<string, string>
  ) => Promise<any>; 
  sendTokenToServer: (token: string) => Promise<void>;
}

const useApi = (): UseApi => {
  const token = useSelector((state: any) => state.user?.token);
  const dispatch = useDispatch();
  const api: AxiosInstance = axios.create({
    baseURL: API_URL,
  });

  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        if (error.response.status === 401 && error.response.data.message === "jwt expired") {
          // Handle JWT expired
          dispatch(UserLogOut());
        } else if (error.response.data.message === "user not found" || error.response.data.message === "المستخدم غير موجود") {
          // Handle user not found
          dispatch(removeUser());
        }
      }
      return Promise.reject(error);
    }
  );

  const get = async (endpoint: string) => {
    return api.get(endpoint, { headers: defaultHeaders });
  };

  const post = async (
    endpoint: string,
    data: any,
    extraHeaders: Record<string, string> = {}
  ) => {
    const headers = { ...defaultHeaders, ...extraHeaders };

    return api.post(endpoint, data, { headers });
  };

  const post_Without_Token = async (endpoint: string, data: any) => {
    return api.post(endpoint, data);
  };

  const deleteRequest = async (endpoint: string, data: any) => {
    return api.delete(endpoint, { headers: defaultHeaders, data: data });
  };

  const put = async (
    endpoint: string,
    data: any,
    extraHeaders: Record<string, string> = {}
  ) => {
    const headers = { ...defaultHeaders, ...extraHeaders };
    return api.put(endpoint, data, { headers });
  };

  
  const patch = async (
    endpoint: string,
    data: any,
    extraHeaders: Record<string, string> = {}
  ) => {
    const headers = { ...defaultHeaders, ...extraHeaders };
    return api.patch(endpoint, data, { headers });
  };
  const sendTokenToServer = async (token: string) => {
    try {
      const response = await post('rider/addFcmToken', { newToken: token });
      console.log('Token sent to server successfully:', response.data);
    } catch (error) {
      console.error('Error sending token to server:', error);
    }
  };

  return { get, post, deleteRequest, post_Without_Token, put, patch, sendTokenToServer };
};

export default useApi;

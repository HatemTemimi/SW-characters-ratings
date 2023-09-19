import axios from "axios";
import { UserSession } from "types/user";


let user: UserSession = null

const parsed = JSON.parse(String(localStorage.getItem('user')))
if (parsed){
    user = parsed
}

//factory instance to be used around the app
const instance = axios.create({
  baseURL: 'http://localhost:3000/',
});

//attach auth token to instance via interceptors
if (user!==null && user !== undefined ){
  const token = user.access_token

  instance.interceptors.request.use(
    config => {
      config.headers["Authorization"] = "Bearer " + token
      return config;
    },
    error => {
      Promise.reject(error);
    }
  );
}

export default instance

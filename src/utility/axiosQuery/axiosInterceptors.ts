import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {store} from '../../store';
import {setToken} from '../../store/auth';

export const initInterceptors = () => {
  // console.log(store.dispatch())
  axios.interceptors.request.use(
    async config => {
      const {getItem} = useAsyncStorage('@token');
      const result = await getItem();
      const token = result ? result : '';

      if (config.headers) {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      config.headers = {...config.headers};

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  ),
    axios.interceptors.response.use(
      async res => {
        // console.log(res, 'response from the interceoprr');
        const token = res.headers['access-token'];
        // console.log(token, 'the token is available');
        if (token) {
          store.dispatch(setToken(token));
        }

        return res;
      },
      error => {
        return Promise.reject(error);
      },
    );
};

import axios, { AxiosResponse } from 'axios';
import useStorage, { getUserStorage } from 'hooks/useStorage';
import { useCallback } from 'react';
import Config from 'react-native-config';

const getLogInData = async () => {
  const result = await getUserStorage('LOGIN_DATA');
  return result;
};

let instance = axios.create({
  timeout: 30000,
  baseURL: Config.API_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  async function (config) {
    const auth = await getLogInData();
    if (auth && auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

function useRequest() {
  const { logout } = useStorage();
  // const translate = useAppTranslation('common');

  const getRequest = useCallback(
    async <Body, Response>(url: string, params?: Body): Promise<Response> => {
      try {
        const res = await instance.get<Response, AxiosResponse<Response>, Body>(
          url,
          { params },
        );
        return handleResponse<Body, Response>(res);
      } catch (error) {
        return handleError(error);
      }
    },
    [instance],
  );

  const postRequest = useCallback(
    async <Body, Response>(url: string, data?: Body): Promise<Response> => {
      try {
        const res = await instance.post<
          Response,
          AxiosResponse<Response>,
          Body
        >(url, data);
        return handleResponse<Body, Response>(res);
      } catch (error) {
        return handleError(error);
      }
    },
    [instance],
  );

  const putRequest = useCallback(
    async <Body, Response>(url: string, data?: Body): Promise<Response> => {
      try {
        const res = await instance.put<Response, AxiosResponse<Response>, Body>(
          url,
          data,
        );
        return handleResponse<Body, Response>(res);
      } catch (error) {
        return handleError(error);
      }
    },
    [instance],
  );

  const patchRequest = useCallback(
    async <Body, Response>(url: string, data?: Body): Promise<Response> => {
      try {
        const res = await instance.patch<
          Response,
          AxiosResponse<Response>,
          Body
        >(url, data);
        return handleResponse<Body, Response>(res);
      } catch (error) {
        return handleError(error);
      }
    },
    [instance],
  );

  const deleteRequest = useCallback(
    async <Body, Response>(url: string, params?: Body): Promise<Response> => {
      try {
        const res = await instance.delete<
          Response,
          AxiosResponse<Response>,
          Body
        >(url, { params });
        return handleResponse<Body, Response>(res);
      } catch (error) {
        return handleError(error);
      }
    },
    [instance],
  );

  const postMultipartFormRequest = useCallback(
    async <Response>(url: string, formData: FormData): Promise<Response> => {
      try {
        const res = await instance.post<
          Response,
          AxiosResponse<Response>,
          FormData
        >(url, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return handleResponse<Body, Response>(res);
      } catch (error) {
        return handleError(error);
      }
    },
    [],
  );

  const handleResponse = useCallback(
    <Body, Response>(res: AxiosResponse<Response, Body>): Response => {
      const successRegex = /^(2[0-9]{2}|29[0-9])$/;
      if (!successRegex.test(res.status.toString())) {
        throw res.data;
      }
      return res.data;
    },
    [],
  );

  const handleError = useCallback((error: any) => {
    const errorParse = JSON.parse(JSON.stringify(error));
    if (error && error.response) {
      if (error.response.status === 401) {
        logout();
      } else if (
        error.response.status >= 500 ||
        error.response.status === 404
      ) {
        // toastError(error.response?.data?.message || translate('common:systemError'));
      }
    } else if (errorParse.message) {
      // toastError(errorParse.message);
      // throw errorParse.message;
    }
    throw error?.response?.data || error?.response || error;
  }, []);

  return {
    getRequest,
    postRequest,
    putRequest,
    patchRequest,
    deleteRequest,
    postMultipartFormRequest,
  };
}

export default useRequest;

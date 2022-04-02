import Api from './index';

const endpoint = '/authentication/';

const authenticationApi = {
  login: (payload: { email: string, password: string}) => {
    return Api.post(endpoint, payload);
  }
};

export default authenticationApi;

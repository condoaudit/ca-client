import Api from './index';

const endpoint = '/norms/';

const normsApi = {
  upload: async (payload: any) => {
    return Api.post(endpoint, payload);
  },
  retrieve: async () => {
    return Api.get(endpoint);
  }
};

export default normsApi;

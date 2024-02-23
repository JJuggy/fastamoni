let environment = 'prod';
import {BASE_URL_LIVE, BASE_URL_STAGING} from '@env';

if (__DEV__) {
  environment = 'dev';
}

const appEnvironment = () => {
  if (environment === 'prod') {
    return {
      baseUrl: BASE_URL_LIVE,
    };
  } else {
    return {
      baseUrl: BASE_URL_STAGING,
    };
  }
};

export default appEnvironment;

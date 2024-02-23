/* eslint-disable prettier/prettier */

export type AuthScreenList = {
  SignUp: undefined;
  VerifyPhonenumber: {data: any};
  SignIn: undefined;
  ForgotPassword: undefined;
  VerifyOtp: {phone: string};
  CreatePassword: {phone: string; otp: string};

  // onboarding: undefined;
};

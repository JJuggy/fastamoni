import {useMemo} from 'react';
import {
  setCredential,
  useSelectUser,
  onboardStatus,
  User,
  useAppLoading,
  Auth,
} from '.';
import {useAppSelector, useAppDispatch} from '../hooks';

export const useAuth = () => {
  const user: User | null | undefined = useAppSelector(useSelectUser);
  const didOnboard = useAppSelector(onboardStatus);
  const appLoading = useAppSelector(useAppLoading);

  return useMemo(
    () => ({user: user, didOnboard, appLoading}),
    [user, didOnboard, appLoading],
  );
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  return () => dispatch(setCredential({} as Auth));
};

import {useSelectCart} from './index';
import {useAppSelector, useAppDispatch} from '@store/hooks';
import {RootState} from '@store/index';
import {useMemo} from 'react';

export const useCart = () => {
  const cart = useAppSelector(useSelectCart);
  return useMemo(() => ({cart}), [cart]);
};


import { useSetRecoilState } from 'recoil';
import { refreshCountries } from './countries';

/**
 * Returns a function that allows imperatively to refetch countries.
 */
export const useRefreshCountries = () => {
  const refresh = useSetRecoilState(refreshCountries);

  return () => refresh((n) => n + 1);
};

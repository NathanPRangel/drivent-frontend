import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelApi from '../../services/hotelApi';

export default function useHotels() {
  const token = useToken();
  
  const {
    data: hotels,
    loading: hotelLoading,
    error: hotelError,
    act: getHotel
  } = useAsync(() => hotelApi.getHotels(token));

  return {
    hotels,
    hotelLoading,
    hotelError,
    getHotel
  };
}

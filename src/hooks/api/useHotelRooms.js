import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelApi from '../../services/hotelApi';

export default function useHotelRooms(hotelId, immediate = true) {
  const token = useToken();
  
  if(!hotelId) immediate = false;

  const {
    data: hotelWithRooms,
    loading: hotelWithRoomsLoading,
    error: hotelWithRoomsError,
    act: getHotelWithRooms
  } = useAsync(() => hotelApi.getHotelRooms(hotelId, token), immediate);

  return {
    hotelWithRooms,
    hotelWithRoomsLoading,
    hotelWithRoomsError,
    getHotelWithRooms
  };
}

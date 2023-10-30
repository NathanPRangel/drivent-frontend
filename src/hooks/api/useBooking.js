import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useBooking(roomId, immediate = true) {
  const token = useToken();
  
  if(!roomId) immediate = false;

  const {
    data: userBooking,
    loading: userBookingLoading,
    error: userBookingError,
    act: getUserBooking
  } = useAsync(() => bookingApi.getUserBooking(token));

  const {
    data: bookRoom,
    loading: bookRoomLoading,
    error: bookRoomError,
    act: postBookRoom
  } = useAsync(() => bookingApi.bookRoom(roomId, token), immediate);

  return {
    userBooking,
    userBookingLoading,
    userBookingError,
    getUserBooking,
    bookRoom,
    bookRoomLoading,
    bookRoomError,
    postBookRoom
  };
}

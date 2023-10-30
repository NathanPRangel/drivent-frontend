import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function usePutBooking(bookingId, roomId, immediate = false) {
  const token = useToken();

  const {
    data: bookRoomUpdated,
    loading: putBookRoomLoading,
    error: putBookRoomError,
    act: putBookRoom
  } = useAsync(() => bookingApi.putBookRoom(bookingId, roomId, token), immediate);

  return {
    bookRoomUpdated,
    putBookRoomLoading,
    putBookRoomError,
    putBookRoom
  };
}
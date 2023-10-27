import api from './api';

export async function getUserBooking (token) {
  const response = await api.get('/booking', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function bookRoom (roomId, token) {
  const response = await api.post('/booking', { roomId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data
}

export async function putBookRoom (bookingId, roomId, token) {
  const response = await api.put(`/booking/${bookingId}`, { roomId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data
}
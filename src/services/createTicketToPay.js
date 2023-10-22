import api from './api';

export async function createTicket(ticketTypeId, token) {
  const response = await api.post('/tickets', { ticketTypeId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
}

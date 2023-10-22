import api from './api';

export async function processPayment(token, body) {
    const response = await api.post('/payments/process', body, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}
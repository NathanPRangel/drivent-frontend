import api from './api';

export async function getActivities (token) {
  const response = await api.get('/activities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getActivitiesByUser (token) {
  const response = await api.get('/activities/activities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function postActivities (activityId, token) {
  const response = await api.post('/activities', {activityId}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
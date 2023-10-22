import api from './externalApi';
import backEnd from './api';

export async function signInGithub(code) {
    const response = await backEnd.post('/auth/github/sign-in', { code })

    return response.data;
}
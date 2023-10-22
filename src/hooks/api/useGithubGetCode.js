import * as githubApi from '../../services/githubLoginApi';

export default function useGithubGetCode() {
  const client_id = import.meta.env.VITE_CLIENT_ID;

  const githubGetCode = () => {
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${client_id}`)
  }

  return {
    githubGetCode
  };
}

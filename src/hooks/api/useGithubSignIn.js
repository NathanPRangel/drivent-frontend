import useAsync from '../useAsync';

import * as githubApi from '../../services/githubLoginApi';

export default function useGithubSignIn() {
  const {
    loading: githubSignInLoading,
    error: githubSignInError,
    act: githubSignIn
  } = useAsync(githubApi.signInGithub, false);

  return {
    githubSignInLoading,
    githubSignInError,
    githubSignIn
  };
}

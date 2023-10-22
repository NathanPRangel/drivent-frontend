import useAsync from '../useAsync';
import useToken from '../useToken';

import * as getActivity from "../../services/activityApi";

export default function useActivity() {

    const token = useToken();

    const {
        data: activities,
        loading: ActivityLoading,
        error: ActivityError,
        act: getActivities,
    } = useAsync((data) => getActivity.getActivities(token), true);

    const {
        loading: ActivityPostLoading,
        error: ActivityPostError,
        act: postActivities,
    } = useAsync((data) => getActivity.postActivities(data, token), true);

    return {
        activities,
        ActivityLoading,
        ActivityError,
        getActivities,
        ActivityPostLoading,
        ActivityPostError,
        postActivities
    }
}
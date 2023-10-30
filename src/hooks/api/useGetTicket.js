import useAsync from '../useAsync';
import useToken from '../useToken';

import * as getTicket from '../../services/ticketApi'

export default function useTicket() {

    const token = useToken();

    const {
        data:userTicket,
        loading: GetUserTicketLoading,
        error: GetUserTicketError,
        act: getUserTicket
    } = useAsync(() => getTicket.getUserTicket(token), true)

    return {
        userTicket,
        GetUserTicketLoading,
        GetUserTicketError,
        getUserTicket
    };
}
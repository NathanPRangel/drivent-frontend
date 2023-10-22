import * as procPayment from '../../services/paymentApi'
import useAsync from '../useAsync';
import useToken from '../useToken';

export default function usePayment() {

    const token = useToken();

    const {
        loading: PaymentLoading,
        error: PaymentError,
        act: processPayment
    } = useAsync((data) => procPayment.processPayment(token, data), true);

    return {
        PaymentLoading,
        PaymentError,
        processPayment
    }
}
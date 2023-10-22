import PaymentInfo from "../../../components/Dashboard/PaymentInfo";
import PaymentDetails from "../../../components/Dashboard/PaymentDetails";
import { useEffect, useState } from "react";
import useTicket from "../../../hooks/api/useTicket";

export default function Payment() {
  const [ticketReserved, setTicketReserved] = useState(false)
  const [ticketPaid, setTicketPaid] = useState(false)
  const [ticketTypeName, setTicketTypeName] = useState('')
  const [ticketPrice, setTicketPrice] = useState('')
  const [ticketId, setTicketId] = useState('')
  const [ticketStatus, setTicketStatus] = useState('')
  const { getUserTicket } = useTicket()

  useEffect(() => {
    async function data() {
      try {
        const userTicket = await getUserTicket()
        console.log(userTicket)
        setTicketTypeName(userTicket.TicketType.name)
        setTicketPrice(userTicket.TicketType.price)
        setTicketId(userTicket.id)
        setTicketStatus(userTicket.status)
      } catch (err) {
        console.log(err)
      }
    }
    data()
  }, [ticketReserved, ticketPaid])

  return (
    <>
      {ticketStatus
        ?
        (
          <PaymentDetails
            ticketPaid={ticketPaid}
            setTicketPaid={setTicketPaid}
            ticketTypeName={ticketTypeName}
            ticketPrice={ticketPrice}
            ticketId={ticketId}
            ticketStatus={ticketStatus}
          />
        )
        :
        (
          <PaymentInfo
            ticketReserved={ticketReserved}
            setTicketReserved={setTicketReserved}
          />
        )
      }
    </>
  );
}
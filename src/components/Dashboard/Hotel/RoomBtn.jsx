import styled from "styled-components";
import { BsPerson, BsPersonFill } from 'react-icons/bs';
import useUserId from "../../../hooks/useUserId";

export default function RoomBtn({ room, selectedRoom, setSelectedRoom }) {
    const userId = useUserId();

    room.Booking.filter(booking => {
        if (booking.userId === userId) {
            setSelectedRoom(room.id)
        }

        return booking.userId !== userId;
    })

    function setPersons() {
        const persons = [];
        let bookingsPushed = 0;

        for (let i = 0; i < room.capacity; i++) {
            if (i === 0 && selectedRoom === room.id) {
                persons.push(<BsPersonFill size={27} key={i} color="#f641bf"></BsPersonFill>)
            } else if (bookingsPushed < room.Booking.length) {
                persons.push(<BsPersonFill size={27} key={i} ></BsPersonFill>)
                bookingsPushed++;
            } else {
                persons.push(<BsPerson size={27} key={i}></BsPerson>)
            }
        }

        return persons;
    }

    return (
        <RoomButton
            disabled={room.capacity === room.Booking.length}
            onClick={() => setSelectedRoom(room.id)}
            $selected={selectedRoom === room.id}
        >
            <Name>{room.name}</Name>
            <div>
                {setPersons().reverse()}
            </div>
        </RoomButton>
    )
}

const RoomButton = styled.button`
  width: 190px;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 11px;
  background-color: ${props => props.$selected ? '#FFEED2' : '#EBEBEB'};

  border-radius: 10px;
  border: 1px solid #CECECE;
`;

const Name = styled.h1`
  font-size: 20px;
  margin: 10px 0px;
`;
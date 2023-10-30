import styled from "styled-components";
import { Name, Details, Title, Data } from "../../../pages/Dashboard/Hotel";

export default function HotelBtn ({ hotel, selectedHotel, setSelectedHotel }) {
  return (
    <HotelButton 
      key={hotel.id}
      disabled={selectedHotel === hotel.id}
      onClick={() => setSelectedHotel(hotel.id)}
    >
      <img src={hotel.image} alt={hotel.name} />
      <Name>{hotel.name}</Name>
      <Details>
        <div>
          <Title>Tipos de acomodação:</Title>
          <Data>{hotel.accommodations}</Data>
        </div>
        <div>
          <Title>Vagas Disponíveis:</Title>
          <Data>{hotel.capacityAvailable}</Data>
        </div>
      </Details>
    </HotelButton>
  );
}

const HotelButton = styled.button`
  width: 196px;
  height: 264px;
  padding: 16px 14px;
  border: none;
  outline: none;
  border-radius: 10px;

  background-color: #EBEBEB;
  
  &:disabled {
    background-color: #FFEED2;
  };

  color: #343434;
  font-family: Roboto;
  font-style: normal;
  line-height: normal;
  font-weight: 400 !important;

  text-align: start;
  
  img {
    width: 100%;
    height: 109px;
    border-radius: 5px;
  }
`;
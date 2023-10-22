import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { ContentWrapper } from './ContentWrapper';
import DayButton from './DayButton';
import { useEffect, useState, useContext } from 'react';
import ActivityComp from './ActivityComp';
import useTicket from '../../hooks/api/useTicket';
import ErrorMessage from '../Dashboard/ErrorMessage';
import useActivity from '../../hooks/api/useActivity';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import UserContext from '../../contexts/UserContext';

export default function ActivitiesTab() {
  const {activities,ActivityError,postActivities} = useActivity()
  const {userTicket,GetUserTicketError} = useTicket()
  const [selectedDay,setSelectedDay] = useState(null)
  const [dayList,setDayList] = useState({})
  const [roomList,setRoomList] = useState({})
  const [subbedList,SetSubbedList] = useState({})
  const {userData} = useContext(UserContext)

  function dayControll(actualId){
    setSelectedDay(actualId)
  }

  useEffect(()=>{
    const dayHash = {}
    const roomHash = {}
    const subbedHash = {}
    for (let a in activities){
      let day = format(new Date(activities[a].startsAt),"dd/LL",{locale:ptBR})
      if(dayHash[day]==undefined){
        dayHash[day] = 
        format(new Date(activities[a].startsAt),"eee, dd/LL",{locale:ptBR}).charAt(0).toUpperCase() + format(new Date(activities[a].startsAt),"eee, dd/LL",{locale:ptBR}).slice(1)
        subbedHash[day] = []
      }
      if(roomHash[activities[a].EventRoom.name]==undefined){
        roomHash[activities[a].EventRoom.name] = roomHash[activities[a].EventRoom.name]
      }
      if(activities[a].User.id == userData.user.id){
        subbedHash[day].push(activities[a])
      }
    }
    setDayList(dayHash)
    setRoomList(roomHash)
    SetSubbedList(subbedHash)
  },[activities])

  async function SubControll(day,start,activity){
    if(subbedList[day].length!=0){
      if(subbedList[day].filter(e=>format(new Date(e.startsAt),"kk:mm",{locale:ptBR})==start).length!=0){
        return false
      }
    }
    try {
      await postActivities(activity.id)
    } catch (err) {
      console.log(err)
      return false
    }

    subbedList[day].push(activity)
    SetSubbedList(subbedList)
    return true
  }

  return(
    <>
      <StyledTypography variant="h4" onClick={()=>console.log(subbedList)}>Escolha de atividades</StyledTypography>
      {
        GetUserTicketError!=null||userTicket==null||userTicket.status!="PAID"//||(userTicket.TicketType.isRemote&&)
        ?
        <ErrorMessage>"Você precisa ter confirmado pagamento antes de fazer a escolha de atividades"</ErrorMessage>
        :
        userTicket.TicketType.isRemote
        ?
        <ErrorMessage>"Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades."</ErrorMessage>
        :
        ActivityError!=null?
        <ErrorMessage>"Ocorreu um erro"</ErrorMessage>
        :
        <ContentWrapper>
          <DayArea>
            {
              Object.keys(dayList).map(e=>
                <DayButton id={e} func={dayControll} selected={selectedDay}>{dayList[e]}</DayButton>
              )
            }
          </DayArea>
          {
            selectedDay==null
            ?<></>
            :<TableArea>
              <RoomName>
                {
                  Object.keys(roomList).map(e=>
                    <p>{e}</p>
                  )
                }
              </RoomName>
              <Table>
                {
                  Object.keys(roomList).map(e=>
                    <Sections>
                      {
                        activities.map(a=>
                          a.EventRoom.name == e
                          ?<ActivityComp key={a.id} data={a} selected={selectedDay} subcontroll={SubControll}/>
                          :<></>
                        )
                      }
                    </Sections>  
                  )
                }
              </Table>
            </TableArea>
          }
        </ContentWrapper>
      }
    </>
  )
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const DayArea = styled.div`
  display: flex;
  flex-direction: row;
  gap: 17px;
  margin-bottom: 60px;
`;

const TableArea = styled.div`
  width: 100%;
  height: 100%;
`;

const RoomName = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  color: #7B7B7B;
`;

const Table = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const Sections = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 8px 8px;
  border-width: 1px;
  border-style: solid;
  border-color: #D7D7D7;
  gap: 8px;
`;
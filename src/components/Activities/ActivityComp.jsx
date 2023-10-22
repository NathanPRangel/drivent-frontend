import styled from "styled-components"
import {BiLogIn} from "react-icons/bi"
import {VscError} from "react-icons/vsc"
import {AiOutlineCheckCircle} from "react-icons/ai"
import format from "date-fns/format"
import ptBR from "date-fns/locale/pt-BR"
import { differenceInHours } from "date-fns"
import { useContext, useState } from "react"
import UserContext from "../../contexts/UserContext"

export default function ActivityComp(props) {
    let day = format(new Date(props.data.startsAt),"dd/LL",{locale:ptBR})
    if(props.selected != day) return(<></>)
    const remaining = props.data.capacity - props.data.User.length
    const start = format(new Date(props.data.startsAt),"kk:mm",{locale:ptBR})
    const end = format(new Date(props.data.endsAt),"kk:mm",{locale:ptBR})
    const duration = differenceInHours(new Date(props.data.endsAt),new Date(props.data.startsAt),"round")
    const {userData} = useContext(UserContext)
    const [sub,setSub] = useState(props.data.User.filter(e=>e.id==userData.user.id))

    async function SubActivity(){
        if(sub.length != 0 || remaining == 0){
            return
        }
        if(!await props.subcontroll(day,start,props.data)){
            return
        }
        setSub([1])
    }

    return(
        <ActivityDiv $duration={duration} $subbed={sub.length!=0}>
            <ActivityDesc onClick={()=>console.log(sub)}>
                <ActivityTitle>
                    {props.data.name}
                </ActivityTitle>
                <ActivityTime>
                    {start} - {end}
                </ActivityTime>
            </ActivityDesc>
            <Spacer/>
            <ActivityAction $places={remaining} onClick={()=>SubActivity()}>
                {sub.length!=0
                    ?<><AiOutlineCheckCircle style={{color:"#428734",width:20,height:20}}/>Inscrito</>
                    :remaining > 0
                        ?<><BiLogIn style={{color:"#428734",width:20,height:20}}/>{remaining} vagas</>
                        :<><VscError style={{color:"red",width:20,height:20}}/>Esgotado</>
                }
            </ActivityAction>
        </ActivityDiv>
    )
}

const ActivityDiv = styled.div`
    display: flex;
    width: 100%;
    height: ${props=>80+(props.$duration-1)*88}px;
    border-radius: 5px;
    padding: 10px;
    background-color: ${props=>props.$subbed?"#D0FFDB":"#F1F1F1"};
`;

const ActivityDesc = styled.div`
    display: flex;
    flex-direction: column;
    flex: 4;
    gap: 6px;
`;

const ActivityTitle = styled.div`
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 700;
    font-size: 12px;
`;

const ActivityTime = styled.div`
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 400;
    font-size: 12px;
`;

const Spacer = styled.hr`
    margin: 0 10px;
    border-width: 0 1px 0 0;
    border-color: #CFCFCF;
`;

const ActivityAction = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${props=>props.$places>0?"green":"red"};
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 400;
    font-size: 9px;
    gap: 6px;
`;
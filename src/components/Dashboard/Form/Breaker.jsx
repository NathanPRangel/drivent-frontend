import styled from "styled-components"


export default function Breaker() {
    return (
        <Container>
            <hr/>
            <span>Ou</span>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0;

    hr {
        width: 100%;
        border: 1px solid #7b7070;
    }

    span {
        position: absolute;
        font-size: 14px;
        color: #7b7070;
        width: 30px;
        background-color: #fff;
    }
`
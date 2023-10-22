import styled from "styled-components";


export default function ErrorMessage({ children }) {
  return (
      <Container>
        <Text>{children}</Text>
      </Container>
  );
}

const Container = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Text = styled.p`
    font-weight: 400;
    color: #8E8E8E;
    font-size: 20px;
    width: 60%;
    min-width: 350px;
    text-align: center;
`
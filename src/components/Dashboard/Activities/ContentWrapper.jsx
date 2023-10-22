import styled from 'styled-components';

export const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 80px);
  //flex-wrap: wrap;
  flex-direction: column;
  > div {
    //width: calc(50% - 20px);
    margin-right: 10px;
  }

  @media (max-width: 600px) {
    > div {
      width: 100%;
      padding-left: 0px !important;
    }
  }
`;
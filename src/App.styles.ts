import styled from '@emotion/styled';

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 48px 0;
  margin: 0 auto;
  width: 100%;

  @media (min-width: 1000px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 850px;
    height: 100vh;
  }
`;

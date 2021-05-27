import styled from "styled-components";

export const Card = styled.div`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  background-color: white;
`;

export const SearchCard = styled(Card)`
  margin: 7rem auto;
  margin-bottom: 5rem;
  padding: 0.8rem 0;
  display: flex;
  width: 60%;
  justify-content: center;

  & input {
    width: 80%;
    font-size: 2rem;
    border-radius: 1.4rem;
    padding: 1rem;
    margin: 0 2rem;
    margin-right: 0.1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    border: none;
  }

  & input:focus {
    outline: none;
  }
`;

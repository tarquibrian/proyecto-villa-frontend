import React from "react";
import styled from "styled-components";

const ContainerSpiner = styled.div`
  display: flex;
  place-items: center;
  justify-content: center;
  height: 100vh;
  background: #a0d6cc;
`;
const Conten = styled.div`
  position: relative;
  border-radius: 10px;
  box-shadow: #3c803c 0px 0px 10px;
  padding: 20px;
  padding-right: 120px;
  /* bottom: 100px; */
`;
const Spiner = styled.div`
  position: absolute;
  /* top: 100px; */
  /* right: 100vh; */
  width: 14.4px;
  height: 14.4px;
  border-radius: 14.4px;
  box-shadow: 36px 0px 0 0 rgba(71, 75, 255, 0.2),
    29.2px 21.2px 0 0 rgba(71, 75, 255, 0.4),
    11.16px 34.2px 0 0 rgba(71, 75, 255, 0.6),
    -11.16px 34.2px 0 0 rgba(71, 75, 255, 0.8), -29.2px 21.2px 0 0 #474bff;
  animation: spinner-b87k6z 1s infinite linear;
  @keyframes spinner-b87k6z {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Loading = () => {
  return (
    <ContainerSpiner>
      {/* <Conten>
        <h4>AGUARDE POR FAVOR</h4>
        <h4>REVISE SU CONEXÍON A INTERNET</h4>
      </Conten> */}
      <Spiner class="spinner"></Spiner>
    </ContainerSpiner>
  );
};

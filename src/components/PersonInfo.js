import React from "react";
import "./Component.css";
import ImageAlcalde from "../images/alcalde.jpg";
import styled from "styled-components";
// import { Section } from "../globalStyles";

const Testimonials = styled.section`
  h1 {
    font-size: 25px;
    margin-top: 30px;
    margin: 1rem;
  }
`;

// const Container = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;

// const LeftRow = styled.div`
//   width: 50%;
//   padding-right: 100px;
//   padding-right: 100px;
// `;
// const Baget = styled.span`
//   padding: 10px 20px;
//   background: rgba(0, 0, 0, 0.05);
//   font-weight: 600;
//   text-transform: uppercase;
// `;
// const RighRow = styled.div`
//   padding: 70px 80px 0 0;
// `;
const PersonInfo = () => {
  const data = [
    {
      id: 1,
      desc: `"Nada puede detener al hombre con una buena actitud mental de alcanzar su meta; nada en el mundo puede ayudar al hombre con una actitud mental equivocada."`,
      cover: ImageAlcalde,
      name: "Ariel Rodrigo Maldonado Almendras",
      catgeory: "Honorable Alcalde Municipal de Villa Rivero",
    },
  ];
  return (
    <>
      <Testimonials>
        <section className="Testimonials">
          <div className="container flexSB">
            <div className="left roww">
              <span className="baget">AUTORIDADES</span>
              <h1>ALCALDE DE VILLA RIVERO</h1>
            </div>
            <div className="right roww">
              {data.map((val) => {
                return (
                  <div className="box">
                    <p>{val.desc}</p>
                    <div className="details flex">
                      <div className="img">
                        <img src={val.cover} alt="" />
                      </div>
                      <div className="name">
                        <h3>{val.name}</h3>
                        <p>{val.catgeory}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </Testimonials>
      {/* <Section padding="0 0 0 0">
        <section className="Testimonials">
          <div className="container flexSB">
            <div className="left row">
              <span className="baget">AUTORIDADES</span>
              <h1>ALCALDE DEL GOBIERNO AUTONOMO MUNICIPAL DE VILLA RIVERO</h1>
            </div>
            <div className="right row">
              {data.map((val) => {
                return (
                  <div className="box">
                    <p className="cursive">{val.desc}</p>
                    <div className="details flex">
                      <div className="img">
                        <img src={val.cover} alt="" />
                      </div>
                      <div className="name">
                        <h3>{val.name}</h3>
                        <p>{val.catgeory}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </Section> */}
    </>
  );
};

export default PersonInfo;

import React from "react";
import "./default.css";

const WrapperOne = ({ data }) => {
  // const data = [
  //   {
  //     num: "520%",
  //     text: "PORCENTAJE",
  //   },
  //   {
  //     num: "99%",
  //     text: "TURISTAS CONTENTOS",
  //   },
  //   {
  //     num: "25",
  //     text: "LUGARES TURISTICOS",
  //   },
  //   {
  //     num: "10.380",
  //     text: "POBLACION",
  //   },
  // ];
  return (
    <>
      <section className="Branding wrapperOne">
        <div className="container grid1">
          {data.map((value) => {
            return (
              <div className="box">
                <h1>{value.num}</h1>
                <p>{value.text}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default WrapperOne;

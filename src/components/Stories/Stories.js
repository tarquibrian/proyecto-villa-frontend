import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Heading } from "../Content/ContentStyles";
import { LoaderPlaceHolder } from "../Loading/LoaderPlaceHolder";
// import "./storiesStyle.css";
const Grid = styled.div`
  display: grid;
  /* width: 100%; */
  /* height: 100%; */
  width: 90em;
  grid-gap: 1rem;
  min-height: 15rem;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  align-items: flex-start;
  @media screen and (max-width: 60em) {
    grid-gap: 3rem;
  }
`;
const GridItem = styled.div`
  background-color: #fff;
  border-radius: 0.3rem;
  /* width: 300px; */
  overflow: hidden;
  box-shadow: 0 3rem 6rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    transform: translateY(-0.5%);
    box-shadow: 0 4rem 8rem rgba(0, 0, 0, 0.5);
  }
`;
const Cardd = styled.div``;
const CardImg = styled.img`
  display: flex;
  width: 100%;
  height: 15rem;
  object-fit: cover;
`;
const CardContent = styled.div`
  padding: 1rem;

  h1 {
    font-size: 1rem;
    font-weight: 500;
    color: #0d0d0d;
    margin-bottom: 1.5rem;
  }

  P {
    font-size: 1rem;
    /* letter-spacing: 0.1rem; */
    line-height: 1.7;
    color: #3d3d3d;
    text-align: justify;
    color: #444;
    line-height: 26px;
    margin-top: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    /* margin-bottom: 1.5rem; */
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }

  button {
    display: block;
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    text-align: center;
    color: #3363ff;
    background-color: #d8e0fd;
    border: none;
    text-decoration: none;
    border-radius: 0.3rem;
    transition: 0.2s;
    cursor: pointer;
    letter-spacing: 0.1rem;
    span {
      margin-left: 1rem;
      transition: 0.2s;
      text-decoration: none;
    }

    &:hover {
      span {
        margin-left: 1.5rem;
        text-decoration: none;
      }
    }
  }
`;

const Containerr = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
`;

const HeadCategories = styled.div`
  display: flex;
  align-items: center;
  margin: 5px;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  flex-direction: column;
  justify-content: space-between;
`;
const Left = styled.div`
  display: flex;

  h1 {
    padding: 10px 20px;
    background: rgb(215, 235, 235);
    border-radius: 5px;
    /* font-weight: 600; */
    /* font-size: 1rem; */
  }
`;
const Righ = styled.div`
  text-decoration: none;
  transition: 200ms;
  display: flex;

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    list-style-type: none;
    background: rgb(215, 235, 235);
    border-radius: 5px;
    font-size: 15px;
    li {
      padding: 1rem;
      &:hover {
        background: #000d1a;
        color: #fff;
        cursor: pointer;
        border-radius: 5px;
      }
    }
    @media screen and (max-width: 600px) {
      font-size: 10.3px;
    }
  }
`;

export const Stories = ({ data }) => {
  const [item, setItem] = useState(data);
  const PF = process.env.REACT_APP_IMG_URL + "/images/";
  const filterItem = (cateItem) => {
    const updatedItme = data.filter((curElem) => {
      return curElem.category === cateItem;
    });
    setItem(updatedItme);
  };
  useEffect(() => {
    setItem(data);
  }, [data]);

  return (
    <>
      <div className="portafolio mtop">
        <div className="container">
          <HeadCategories>
            <Left>
              <Heading align={true}>CATEGORIAS</Heading>
            </Left>
            <Righ>
              <ul>
                <li onClick={() => setItem(data)}>Todas</li>
                <li onClick={() => filterItem("biografias")}>Biografias</li>
                <li onClick={() => filterItem("cuentos")}>Cuentos</li>
                <li onClick={() => filterItem("mitos")}>Mitos</li>
              </ul>
            </Righ>
          </HeadCategories>
        </div>
      </div>
      {/* <Card
        mainImg="https://2.bp.blogspot.com/-WqhiGUNj-rg/TYORuh_6bhI/AAAAAAAAMSU/M3NZJaMe4SA/s400/villa_rivero.jpg"
        profilePic="http://vision.gel.ulaval.ca/~jflalonde/cours/4105/h19/tps/results/tp3/111126876/images/04-Mathieu.jpg"
        title="Lorem ipsum dolor sit amet"
        subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        author="Alex Cobalt"
        date="May 12th, 2021"
      /> */}
      <Containerr>
        <Grid>
          {item.map((elem) => {
            return (
              <GridItem>
                <LoaderPlaceHolder extraStyles={{ height: "100%" }} />

                <Cardd class="card">
                  <CardImg class="card-img" src={PF + elem.photo} alt="Rome" />
                  <CardContent class="card-content">
                    <h1 class="card-header">{elem.title}</h1>
                    <h3>{elem.category}</h3>
                    <p class="card-text">{elem.desc}</p>
                    <Link
                      to={`/postHome/${elem._id}`}
                      style={{ "text-decoration": "none" }}
                    >
                      <button>
                        Saber Más<span>&rarr;</span>
                      </button>
                    </Link>
                  </CardContent>
                </Cardd>
              </GridItem>
            );
          })}
        </Grid>
      </Containerr>
    </>
  );
};

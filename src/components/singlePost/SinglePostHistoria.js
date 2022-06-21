import React from "react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import styled from "styled-components";
import "./singlePost.css";
import { Sidebar } from "../sidebar/Sidebar";
// import { Container } from "../Historia/HistoriaStyle";
import Navbar from "../Navbar/Navbar";
import {
  Container,
  Section,
  Row,
  Heading,
  TextWrapper,
} from "../../globalStyles";
import { dias_semana, meses } from "../../helpers/fecha";

const Header = styled.header`
  background-color: #a0d6cc;
  color: #fff;
  text-align: center;
  padding: 30px 0 120px;
  margin-bottom: 5px;
  min-width: 10rem;
  h1 {
    text-align: center;
    text-transform: uppercase;
    font-size: 45px;
    font-weight: 400;
    letter-spacing: 3px;
    line-height: 0.8;
    padding-top: 50px;
    font-family: "Montserrat", sans-serif;
  }
  h1 span {
    text-transform: uppercase;
    letter-spacing: 7px;
    font-size: 25px;
    line-height: 1;
  }

  p {
    padding-top: 30px;
  }
  @media screen and (max-width: 600px) {
    h1 {
      font-size: 20px;
    }
    h1 span {
      font-size: 18px;
    }
  }
`;

export const SinglePostHistoria = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = process.env.REACT_APP_IMG_URL + "/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const fecha = new Date(post.createdAt);
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts/` + path
      );
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/posts/${post._id}`, {
        data: { username: user.name },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/posts/${post._id}`, {
        username: user.name,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {}
  };
  const fech =
    dias_semana[fecha.getDay()] +
    ", " +
    fecha.getDate() +
    " de " +
    meses[fecha.getMonth()] +
    " de " +
    fecha.getUTCFullYear();
  return (
    <>
      <Section
        padding="50px 0"
        position="relative"
        inverse
        id="eventos"
        background="true"
      >
        {/* <Navbar /> */}
        <Header>
          <h1>
            HISTORIAS - BIOGRAFIAS - CUENTOS
            <br /> <span>[ CONOCE MÁS ACERCA DEL MUNICIPIO ]</span>
          </h1>
        </Header>
        <Container>
          {/* <Sidebar /> */}

          <Link className="blogItem-link btn btn-secondary" to={`/historias`}>
            Atras
          </Link>
          <Row>
            <Heading inverse>{post.title}</Heading>
          </Row>

          <div className="singlePost">
            <div className="singlePostWrapper">
              {post.photo && (
                <img src={PF + post.photo} alt="" className="singlePostImg" />
              )}
              {updateMode ? (
                <input
                  type="text"
                  value={title}
                  className="singlePostTitleInput"
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                />
              ) : (
                <h1 className="singlePostTitle">
                  {title}
                  {/* {post.username === user?.name && (
                  <div className="singlePostEdit">
                    <i
                      className="singlePostIcon far fa-edit"
                      onClick={() => setUpdateMode(true)}
                    ></i>
                    <i
                      className="singlePostIcon far fa-trash-alt"
                      onClick={handleDelete}
                    ></i>
                  </div>
                )} */}
                </h1>
              )}
              <div className="singlePostInfo">
                <span className="singlePostAuthor">
                  Author:
                  <Link to={`/?user=${post.username}`} className="link">
                    <b> {post.username}</b>
                  </Link>
                </span>
                <span className="singlePostDate">{fech}</span>
              </div>
              {updateMode ? (
                <textarea
                  className="singlePostDescInput"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              ) : (
                <p className="singlePostDesc">{desc}</p>
              )}
              {updateMode && (
                <button className="singlePostButton" onClick={handleUpdate}>
                  Update
                </button>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

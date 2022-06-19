import React from "react";
import { useState, useContext, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { startLogin } from "../../actions/auth";
import axios from "axios";
import { useForm } from "../../hooks/useForm";
import { Context } from "../../context/Context";
// import "./loginStyle.css";
import styled, { keyframes } from "styled-components";

const jump = keyframes`
  from{
    transform: translateY(0)
  }
  to{
    transform: translateY(-3px)
  }
`;

const Wrapper = styled.section`
  position: absolute;
  box-sizing: border-box;
  background: #fdf9f3;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Form = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 414px;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Input = styled.input`
  max-width: 100%;
  padding: 11px 13px;
  background: #f9f9fa;
  color: #000;
  margin-bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`;

const Button = styled.button`
  max-width: 100%;
  padding: 11px 13px;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background: #f03d4e;
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  :hover {
    background: rgb(200, 50, 70);
    animation: ${jump} 0.2s ease-out forwards;
  }
`;

const Title = styled.h2`
  font-weight: normal;
  color: #2a2a29;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  text-align: center;
`;
const BtnInicio = styled.div`
  display: flex;
  justify-content: center;
`;
const Btn = styled(Link)`
  max-width: 100%;
  padding: 11px 13px;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background: #0a9396;
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  transition: all 0.3s ease-out;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    transform: translateY(-2px);
    text-decoration: none;
    color: #fff;
    background: #005f73;
    animation: ${jump} 0.2s ease-out forwards;
  }
`;

export const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();

  const { dispatchh, isFetching } = useContext(Context);

  const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: "",
    lPassword: "",
  });

  const { lEmail, lPassword } = formLoginValues;

  let history = useHistory();
  // State para iniciar sesión
  const [usuario, guardarUsuario] = useState({
    nombre: "",
    password: "",
  });

  // extraer de usuario
  const { nombre, password } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  // Cuando el usuario quiere iniciar sesión
  const onSubmit = async (e) => {
    e.preventDefault();
    // validar campos
    // clienteAxios.post("http://localhost:4000/api/usuarios", {
    //   nombre: nombre,
    //   pass: password,
    // });
    // history.push("/admin-panel");
    dispatch(startLogin(lEmail, lPassword));

    dispatchh({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth`, {
        email: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatchh({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatchh({ type: "LOGIN_FAILURE" });
    }
    console.log(lEmail);
  };
  return (
    <div>
      <Wrapper>
        <Form onSubmit={onSubmit}>
          <Input
            // type="email"
            // name="lemail"
            // id="email"
            // placeholder="Correo"
            // ref={userRef}
            // value={lEmail}
            // onChange={handleLoginInputChange}
            type="email"
            class="form-control"
            id="nombre"
            name="lEmail"
            placeholder="Correo"
            ref={userRef}
            value={lEmail}
            onChange={handleLoginInputChange}
          />
          <Input
            // type="password"
            // name="lpassword"
            // placeholder="Contraseña"
            // ref={passwordRef}
            // value={lPassword}
            // onChange={handleLoginInputChange}
            type="password"
            class="form-control"
            id="password"
            name="lPassword"
            placeholder="Password"
            ref={passwordRef}
            value={lPassword}
            onChange={handleLoginInputChange}
          />
          <Button>Entrar</Button>

          <Btn to="/">VOLVER A INICIO</Btn>
        </Form>
      </Wrapper>
      {/* <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-2"></div>
          <div class="col-lg-6 col-md-8 login-box">
            <div class="col-lg-12 login-key">
              <i class="fa fa-key" aria-hidden="true"></i>
            </div>
            <div class="col-lg-12 login-title">ADMIN PANEL</div>

            <div class="col-lg-12 login-form">
              <div class="col-lg-12 login-form">
                <form onSubmit={onSubmit}>
                  <div class="form-group">
                    <label class="form-control-label">EMAIL</label>
                    <input
                      type="text"
                      class="form-control"
                      id="nombre"
                      name="lEmail"
                      placeholder="Correo"
                      ref={userRef}
                      value={lEmail}
                      onChange={handleLoginInputChange}
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-control-label">PASSWORD</label>
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      name="lPassword"
                      placeholder="Password"
                      ref={passwordRef}
                      value={lPassword}
                      onChange={handleLoginInputChange}
                    />
                  </div>

                  <div class="col-lg-12 loginbttm">
                    <div class="col-lg-6 login-btm login-text">
                      <Link to={"/"} className="enlace-cuenta">
                        Volver a la pagina principal
                      </Link>
                    </div>
                    <div class="col-lg-6 login-btm login-button">
                      <button type="submit" class="btn btn-outline-primary">
                        Iniciar Sesión
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-lg-3 col-md-2"></div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

import React from "react";
import { useState, useContext, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { startLogin } from "../../actions/auth";
import axios from "axios";
import { useForm } from "../../hooks/useForm";
import { Context } from "../../context/Context";
import "./loginStyle.css";

export const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();

  const { dispatchh, isFetching } = useContext(Context);

  const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: "tarquibrian@gmail.com",
    lPassword: "123456",
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
      const res = await axios.post("http://localhost:4000/api/auth", {
        email: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatchh({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatchh({ type: "LOGIN_FAILURE" });
    }
  };
  return (
    <div>
      {/* <div className="form-usuario">
        <div className="contenedor-form sombra-dark">
          <h1>Iniciar Sesión</h1>

          <form onSubmit={onSubmit}>
            <div className="campo-form">
              <label htmlFor="email">Email</label>
              <input
                type="string"
                id="nombre"
                name="lEmail"
                placeholder="correo"
                ref={userRef}
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>

            <div className="campo-form">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="lPassword"
                placeholder="Tu Password"
                ref={passwordRef}
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>

            <div className="campo-form">
              <input
                type="submit"
                className="btn btn-primario btn-block"
                value="Iniciar Sesión"
                disabled={isFetching}
              />
            </div>
          </form>

          <Link to={"/"} className="enlace-cuenta">
            Volver a la pagina principal
          </Link>
        </div>
      </div> */}

      <div class="container">
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
      </div>
    </div>
  );
};

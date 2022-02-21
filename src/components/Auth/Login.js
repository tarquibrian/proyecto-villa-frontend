import React from "react";
import { useState, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { startLogin } from "../../actions/auth";
import clienteAxios from "../../config/axios";
import { useForm } from "../../hooks/useForm";

export const Login = () => {
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
  const onSubmit = (e) => {
    e.preventDefault();
    // validar campos
    // clienteAxios.post("http://localhost:4000/api/usuarios", {
    //   nombre: nombre,
    //   pass: password,
    // });
    // history.push("/admin-panel");
    dispatch(startLogin(lEmail, lPassword));
  };
  return (
    <div className="form-usuario">
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
              value={lPassword}
              onChange={handleLoginInputChange}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesión"
            />
          </div>
        </form>

        <Link to={"/"} className="enlace-cuenta">
          Volver a la pagina principal
        </Link>
      </div>
    </div>
  );
};

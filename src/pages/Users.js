import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavbarAdmin } from "../components/NavbarAdmin/NavbarAdmin";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { startLogin, startRegister } from "../actions/auth";
import { useForm } from "../hooks/useForm";
import axios from "axios";
export const Users = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  const [formRegisterValues, handleRegisterInputChange] = useForm({
    rName: "",
    rEmail: "",
    rPassword1: "",
    rPassword2: "",
  });
  const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/users`).then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    if (rPassword1 !== rPassword2) {
      return Swal.fire(
        "Error",
        "Las contraseñas deben de ser iguales",
        "error"
      );
    }
    dispatch(startRegister(rEmail, rPassword1, rName));
  };

  const loadUsers = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/users`)
      .then((response) => {
        setUsers(response.data);
      });
  };
  const deleteUser = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/usuarios/${id}`);
    loadUsers();
  };
  return (
    <div>
      <NavbarAdmin />

      <div className="col-md-6 login-form-2">
        <Link to={"/admin-panel"}>
          <h3>Atras</h3>
        </Link>
        <h3>Registro</h3>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              name="rName"
              value={rName}
              onChange={handleRegisterInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Correo"
              name="rEmail"
              value={rEmail}
              onChange={handleRegisterInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              name="rPassword1"
              value={rPassword1}
              onChange={handleRegisterInputChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Repita la contraseña"
              name="rPassword2"
              value={rPassword2}
              onChange={handleRegisterInputChange}
            />
          </div>

          <div className="form-group">
            <input type="submit" className="btnSubmit" value="Crear Usuario" />
          </div>
        </form>
      </div>
      <div className="container">
        <div className="py-4">
          <h1>Usuarios</h1>
          <table class="table border shadow">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">NOMBRE DE USUARIO</th>
                <th scope="col">EMAIL</th>
                <th scope="col">PASSWORD</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    {/* <Link
                        class="btn btn-primary mr-2"
                        to={`/users/${user.id}`}
                      >
                        View
                      </Link>
                      <Link
                        class="btn btn-outline-primary mr-2"
                        to={`/users/edit/${user.id}`}
                      >
                        Edit
                      </Link> */}
                    <button class="btn btn-danger" onClick={() => deleteUser(user._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

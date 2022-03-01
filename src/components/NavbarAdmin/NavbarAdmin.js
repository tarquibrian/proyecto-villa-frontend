import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startLogout } from "../../actions/auth";

export const NavbarAdmin = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleUsers = () => {
    console.log("ir a usuarios");
  };

  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">{name}</span>
      <div>
        {name === "Brian" && (
          <Link className="btn btn-outline-warning mr-2" to={"/admin-users"}>
            <i class="fa-solid fa-users"></i>
            <span> Usuarios</span>
          </Link>
        )}
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          <span> Salir</span>
        </button>
      </div>
    </div>
  );
};

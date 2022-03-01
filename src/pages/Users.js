import React from "react";
import { Link } from "react-router-dom";
import { NavbarAdmin } from "../components/NavbarAdmin/NavbarAdmin";

export const Users = () => {
  return (
    <div>
      <NavbarAdmin />
      <Link to={"/admin-panel"}>Atras</Link>
    </div>
  );
};

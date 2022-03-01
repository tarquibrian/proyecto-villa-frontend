import React from "react";
import { Fab } from "./AddNewFab.Styles";
import { Link } from "react-router-dom";

export const AddNewPost = () => {
  
  return (
    <Link to={"/newpost"}>
      <Fab className="btn btn-primary" >
        <i className="fas fa-plus"></i>
      </Fab>
    </Link>
  );
};

import React from "react";
import { useDispatch } from "react-redux";
import { eventStartDelete } from "../../actions/events";
import { FabDanger } from "../../globalStyles";

export const DeleteEventFab = () => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(eventStartDelete());
  };

  return (
    <FabDanger className="btn btn-danger fab-danger" onClick={handleDelete}>
      <i className="fas fa-trash"></i>
      <span> Borrar evento </span>
    </FabDanger>
  );
};

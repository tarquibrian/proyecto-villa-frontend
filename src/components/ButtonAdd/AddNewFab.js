import React from "react";
import { Fab } from "./AddNewFab.Styles";
import { useDispatch } from "react-redux";
import { uiOpenModal } from "../../actions/ui";

export const AddNewFab = () => {
  const dispatch = useDispatch();
  const handleClickNew = () => {
    dispatch(uiOpenModal());
  };
  return (
    <Fab className="btn btn-primary" onClick={handleClickNew}>
      <i className="fas fa-plus"></i>
    </Fab>
  );
};

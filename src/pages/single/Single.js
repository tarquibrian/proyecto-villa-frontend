import React from "react";
import { SinglePost } from "../../components/singlePost/SinglePost";
import { NavbarAdmin } from "../../components/NavbarAdmin/NavbarAdmin";
export const Single = () => {
  return (
    <div>
      <NavbarAdmin />
      <SinglePost />
    </div>
  );
};

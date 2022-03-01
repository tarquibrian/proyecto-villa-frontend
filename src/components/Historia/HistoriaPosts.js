import React from "react";
import { HistoriaPost } from "./HistoriaPost";
import { Posts } from "./HistoriaStyle";

export const HistoriaPosts = ({ posts }) => {
  return (
    <>
      <Posts>
        {posts.map((p) => (
          <HistoriaPost post={p} />
        ))}
      </Posts>
    </>
  );
};

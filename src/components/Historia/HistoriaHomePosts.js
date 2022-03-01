import React from "react";
import { HistoriaHomePost } from "./HistoriaHomePost";
import { Posts } from "./HistoriaStyle";

export const HistoriaHomePosts = ({ posts }) => {
  return (
    <>
      <Posts>
        {posts.map((p) => (
          <HistoriaHomePost post={p} />
        ))}
      </Posts>
    </>
  );
};

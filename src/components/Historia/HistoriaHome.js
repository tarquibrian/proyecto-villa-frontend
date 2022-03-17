import React, { useEffect, useState } from "react";
import { Container } from "./HistoriaStyle";
import { HistoriaHomePosts } from "./HistoriaHomePosts";
import { useLocation } from "react-router";
import axios from "axios";
import { Sidebar } from "../sidebar/Sidebar";
import { ContentPost } from "../Content/ContentPost";

export const HistoriaHome = () => {
  const [posts, setPosts] = useState([]);
  const [bool, setBool] = useState(true);
  const { search } = useLocation();
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts` + search
      );
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  const cambio = () => {
    if (bool === true) {
      setBool(false);
    } else {
      setBool(true);
    }
  };
  return (
    <div>
      {/* <HistoriaHomePosts posts={posts} /> */}
      {posts.map((p) => (
        <div>
          <ContentPost posts={p} valor={bool} />
        </div>
      ))}
    </div>
  );
};

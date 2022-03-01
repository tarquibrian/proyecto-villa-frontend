import React, { useEffect, useState } from "react";
import { Container } from "./HistoriaStyle";
import { HistoriaHomePosts } from "./HistoriaHomePosts";
import { useLocation } from "react-router";
import axios from "axios";
import { Sidebar } from "../sidebar/Sidebar";
import { ContentPost } from "../Content/ContentPost";

export const HistoriaHome = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:4000/api/posts" + search);
      setPosts(res.data);
      console.log(res.data)
    };
    fetchPosts();
  }, [search]);
  return (
    <div>
      {/* <HistoriaHomePosts posts={posts} /> */}
      <ContentPost posts={posts} />
    </div>
  );
};

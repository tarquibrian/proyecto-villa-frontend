import React, { useEffect, useState } from "react";
import { Container } from "./HistoriaStyle";
import { HistoriaHomePosts } from "./HistoriaHomePosts";
import { useLocation } from "react-router";
import axios from "axios";
import { Sidebar } from "../sidebar/Sidebar";
import { ContentPost } from "../Content/ContentPost";
import Carousel from "../Carousel/Carousel";

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
  return (
    <div>
      {/* <HistoriaHomePosts posts={posts} /> */}
      <Carousel titulo="HISTORIAS"/>
      {posts.map((p) => (
        <div>
          <ContentPost posts={p} valor={bool} />
        </div>
      ))}
    </div>
  );
};
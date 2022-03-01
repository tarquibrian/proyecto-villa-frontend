import React, { useEffect, useState } from "react";
import { Container } from "./HistoriaStyle";
import { HistoriaPosts } from "./HistoriaPosts";
import { useLocation } from "react-router";
import axios from "axios";
import { AddNewPost } from "../ButtonAdd/AddNewPost";
import { Sidebar } from "../sidebar/Sidebar";

export const Historia = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:4000/api/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <Container>
      <Sidebar />
      <AddNewPost />
      <HistoriaPosts posts={posts} />
    </Container>
  );
};

import React, { useEffect, useState } from "react";
import { HistoriaHomePosts } from "./HistoriaHomePosts";
import { useLocation } from "react-router";
import axios from "axios";
import { ContentPost } from "../Content/ContentPost";
import { Section, Container } from "../../globalStyles";
import { Stories } from "../Stories/Stories";
import { Heading } from "../Content/ContentStyles";

export const HistoriaHome = () => {
  const [posts, setPosts] = useState([]);
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
    <>
      {/* <HistoriaHomePosts posts={posts} /> */}

      {/* <Carousel titulo="HISTORIAS" /> */}
      <Section inverse="false" padding="0 0 2rem 0" position="relative">
        <Container>
          <Stories data={posts} />
        </Container>
      </Section>
      <Section padding="50px 0">
        {/* <Stories /> */}
        <Container position='relative'>
          <Heading align={true}>TODOS LOS ARTÍCULOS</Heading>
          {posts.map((p) => (
            <div>
              <ContentPost posts={p} />
            </div>
          ))}
        </Container>
      </Section>
    </>
  );
};

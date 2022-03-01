import React, { useEffect, useState } from "react";
import { Container, Section } from "../../globalStyles";
import {
  ContentRow,
  TextWrapper,
  TopLine,
  Heading,
  ContentButton,
  Subtitle,
  ImgWrapper,
  Img,
  ContentColumn,
  PostDesc,
} from "./ContentStyles.js";

import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import { Link } from "react-router-dom";

export const ContentPost = ({ posts }) => {
  const initial = { opacity: 0, y: 30 };
  const animation = useAnimation();
  const PF = "http://localhost:4000/images/";
  const { ref, inView } = useInView({ threshold: 0.2 });
  const [bool, setBool] = useState(false);

  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        y: 0,
      });
    }
    console.log("post", posts);
  }, [inView, animation]);

  return (
    <>
      {posts.map((p) => (
        <div>
          <Section inverse={true} ref={ref}>
            <Container>
              <ContentRow reverse={true}>
                <ContentColumn>
                  <TextWrapper>
                    <TopLine
                      initial={initial}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      animate={animation}
                    >
                      {new Date(p.createdAt).toDateString()}
                    </TopLine>
                    <Heading
                      initial={initial}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      animate={animation}
                      inverse={true}
                    >
                      {p.title}
                    </Heading>
                    <Subtitle
                      initial={initial}
                      transition={{ delay: 0.7, duration: 0.6 }}
                      animate={animation}
                      inverse={true}
                    >
                      <PostDesc>{p.desc}</PostDesc>
                    </Subtitle>
                    <Link to={`/postHome/${p._id}`}>
                      <ContentButton
                        initial={initial}
                        transition={{ delay: 1, duration: 0.6 }}
                        animate={animation}
                        inverse={true}
                        primary={true}
                      >
                        SABER MAS
                      </ContentButton>
                    </Link>
                  </TextWrapper>
                </ContentColumn>
                <ContentColumn
                  initial={initial}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  animate={animation}
                >
                  <ImgWrapper>
                    <Img
                      src={PF + p.photo}
                      alt={p.alt}
                      whileHover={{ rotate: 2, scale: 1.02 }}
                      transition={{ duration: 0.5 }}
                    />
                  </ImgWrapper>
                </ContentColumn>
              </ContentRow>
            </Container>
          </Section>
        </div>
      ))}
    </>
  );
};

import React, { useEffect } from "react";
import { Container, Section } from "../../globalStyles";
import {
  ContentColumn,
  ContentRow,
  Heading,
  PostDesc,
  Subtitle,
  TextWrapper,
  TopLine,
} from "../Content/ContentStyles";
import styled from "styled-components";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Video = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1rem 0;
`;

const Card = styled.div`
  position: relative;
  overflow: hidden;
  height: 0;
  width: 100%;
  padding-top: 56.25%;
`;

export const VideoYoutube = () => {
  const initial = { opacity: 0, y: 30 };
  const animation = useAnimation();

  const { ref, inView } = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        y: 0,
      });
    }
  }, [inView, animation]);
  return (
    <Section padding="50px 0" position="relative" ref={ref}>
      <Container position="relative" margin='10rem 10rem'>
        <Heading align={true}>ARCHIVOS MULTIMEDIA</Heading>
        <ContentRow reverse={false}>
          {/* <ContentColumn> */}
            <Card>
              <Video
                src="https://www.youtube.com/embed/jpt4hXnrjYM"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></Video>
            </Card>
            <Card>
              <Video
                src="https://www.youtube.com/embed/gBfqAzswMos"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></Video>
            </Card>
          {/* </ContentColumn> */}
          {/* <ContentColumn>
            <TextWrapper>
              <TopLine
                initial={initial}
                transition={{ delay: 0.3, duration: 0.6 }}
                animate={animation}
              >
                FERIAS TRADICIONALES
              </TopLine>
              <Heading
                initial={initial}
                transition={{ delay: 0.5, duration: 0.6 }}
                animate={animation}
              >
                Feria de Comidas Típicas
              </Heading>
              <Subtitle
                initial={initial}
                transition={{ delay: 0.7, duration: 0.6 }}
                animate={animation}
              >
                ASDFASDF
              </Subtitle>
            </TextWrapper>
          </ContentColumn> */}
        </ContentRow>
      </Container>
    </Section>
  );
};

"use client";

declare const paper: any;

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

// import Image from "next/image";
import styles from "./page.module.css";

import PaperStage from "./components/paperStage";
import ProjectCard from "./components/ProjectCard";
import Logo from "./components/logo";

import { Button, Container, Flex, Card, Image, Title, Text, AspectRatio, rem } from "@mantine/core";

import thumbPolkaFolks from "../public/img/project_thumb_polka.png";
import thumbFass from "../public/img/project_thumb_fass.png";
import thumbFassPlugin from "../public/img/project_thumb_fass_plugin.png";
import thumbArborator from "../public/img/project_thumb_arborator.png";
import thumbPolystar from "../public/img/project_thumb_polystar.png";

import { init, resize, update, generate } from "./demo-two/main";

const projectsData = [
  {
    title: "Polka Folks",
    description: `One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.`,
    image: thumbPolkaFolks,
    constrat: "LIGHT"
  },

  {
    title: "Arborator",
    description: `"How about if I sleep a little bit longer and forget all this nonsense", he thought, but that was something he was unable to do because he was used to sleeping on his right, and in his present state couldn't get into that position.`,
    image: thumbArborator,
    contrast: "DARK"
  },

  {
    title: "Hilbert",
    description: `"How about if I sleep a little bit longer and forget all this nonsense", he thought, but that was something he was unable to do because he was used to sleeping on his right, and in his present state couldn't get into that position.`,
    image: thumbFass,
    contrast: "DARK"

  },

  {
    title: "Polystar",
    description: `It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather.`,
    image: thumbPolystar,
    contrast: "LIGHT"
  },

  {
    title: "Oscill",
    description: `It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather.`,
    image: thumbFassPlugin,
    contrast: "LIGHT"
  },
];

export default function Home() {
  // ...
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paperLoaded, setPaperLoaded] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [canvasSize, setCanvasSize] = useState<{width: number; height: number} | null>(null);
  // const { width, height } = useViewportSize();

  // ---------------------------------------------
  // HOOKS

  useEffect(() => {
    if (paperLoaded && canvasSize) {
      console.log(`! resize paper view to: width: ${canvasSize.width} height: ${canvasSize.height}`);
      // resize(canvasSize.width, canvasSize.height);
      init();
      generate();
    }
  }, []);

  // ---------------------------------------------
  // HANDLERS

  const setStage = (isPaperLoaded: boolean) => {
    console.log("Is Paper Loaded? ", isPaperLoaded);

    init();
    generate();

    if ( !paperLoaded ) {
      setPaperLoaded(true);
      setInitialized(true);
    }
  };

  const updateStage = (mousePos: { x: number; y: number }) => {
    // console.log(`! update stage: x: ${mousePos.x} y: ${mousePos.y}`);
    if (paperLoaded && initialized) {
      // if (canvasSize) { resize(canvasSize.width, canvasSize.height) };
      update(mousePos);
      generate();
    }
  };

  // const resizeStage = (size: {width:number, height: number}) => {
  //   if (paperLoaded && initialized) {
  //     console.log('resize stage: ', size.width, size.height);
  //     resize(size.width, size.height);
  //     init();
  //     generate();
  //   }
  // }

  return (
    <>
      {true ? (
        <div className={styles.container}>
          <div className={styles.cover}>
            <div className={styles.stage}>
              <PaperStage canvasRef={canvasRef} onMouseMove={updateStage} onResize={setCanvasSize}/>
            </div>
            <Script
              src="../lib/paper/paper-core.js"
              onReady={() => {
                paper.install(window);
                paper.setup(canvasRef.current);
                setStage(true);
              }}
            />
            <div className={styles.logo}>
              <Logo className={styles.logo} />
            </div>
            <Flex style={{ zIndex: "100" }} direction="row" justify="flex-end" align="flex-end" h="100%">
              <Container pl="25%" pb={rem(50)}>
                <Title order={2}>Introduction Title</Title>
                <div className={styles.intro}>
                  One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into
                  a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his
                  brown belly, slightly domed and divided by arches into stiff sections.
                </div>
              </Container>
            </Flex>
          </div>

          <div className={styles.projects}>
            {projectsData.map( p => <ProjectCard
              title={p.title}
              contrast={p.contrast}
              image={p.image}
              description={p.description}
            />)}
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
}

"use client";

declare const paper: any;

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

// import Image from "next/image";
import styles from "./page.module.css";
import {
  camptonLight,
  camptonBook,
  camptonMedium,
  camptonSemiBold,
  camptonBold,
} from "./styles/fonts";

import PaperStage from "./components/paperStage";
import ProjectCard from "./components/ProjectCard";
import Logo from "./components/logo";

import { useMediaQuery } from "@mantine/hooks";
import { Button, Container, Flex, Card, Image, Title, Text, AspectRatio, rem, Divider, Space } from "@mantine/core";

import thumbPolkaFolks from "../public/img/project_thumb_polka.png";
import thumbFass from "../public/img/project_thumb_fass.png";
import thumbFassPlugin from "../public/img/project_thumb_fass_plugin.png";
import thumbArborator from "../public/img/project_thumb_arborator.png";
import thumbPolystar from "../public/img/project_thumb_polystar.png";

import { init, resize, update, generate } from "./cover-interactive/main";

const projectsData = [
  {
    title: "Polka Folks",
    description: `One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.`,
    image: thumbPolkaFolks,
    constrat: "LIGHT",
    link: ""
  },

  {
    title: "Arborator",
    description: `"How about if I sleep a little bit longer and forget all this nonsense", he thought, but that was something he was unable to do because he was used to sleeping on his right, and in his present state couldn't get into that position.`,
    image: thumbArborator,
    contrast: "DARK",
    link: ""
  },

  {
    title: "Hilbert",
    description: `"How about if I sleep a little bit longer and forget all this nonsense", he thought, but that was something he was unable to do because he was used to sleeping on his right, and in his present state couldn't get into that position.`,
    image: thumbFass,
    contrast: "DARK",
    link: "https://mothervolcano.github.io/hilbert-demo/"
  },

  {
    title: "Polystar",
    description: `It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather.`,
    image: thumbPolystar,
    contrast: "LIGHT",
    link: "https://mothervolcano.github.io/polystar-demo/"
  },

  {
    title: "Oscill",
    description: `It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather.`,
    image: thumbFassPlugin,
    contrast: "LIGHT",
    link: ""
  },
];

export default function Home() {
  // ...
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paperLoaded, setPaperLoaded] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number } | null>(null);

  // -------------------------------------------------------------------------------------------------------
  // MEDIA QUERIES

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isLandscape = useMediaQuery("(orientation: landscape)");
  const isPortrait = useMediaQuery("(orientation: portrait)");


  // ---------------------------------------------
  // HOOKS

  useEffect(() => {
    if (paperLoaded && canvasSize) {
      console.log(`! resize paper view to: width: ${canvasSize.width} height: ${canvasSize.height}`);
      
      const margin = isLandscape ? 0.25 : 0.50;
      const density = isLandscape ? 50 : 20;

      init(margin, density);
      generate();

      if (!initialized) {
        setInitialized(true);
      }
    }
  }, [isLandscape, isPortrait, canvasSize, paperLoaded]);

  // ---------------------------------------------
  // HANDLERS

  // const setStage = (isPaperLoaded: boolean) => {
  //   console.log("Is Paper Loaded? ", isPaperLoaded);

  //   const margin = canvasSize ? canvasSize.margin : 0.25;

  //   init(margin);
  //   generate();

  //   if (!paperLoaded) {
  //     setPaperLoaded(true);
  //     setInitialized(true);
  //   }
  // };

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
              <PaperStage canvasRef={canvasRef} onMouseMove={updateStage} onResize={setCanvasSize} />
            </div>
            <Script
              src="../lib/paper/paper-core.js"
              onReady={() => {
                paper.install(window);
                paper.setup(canvasRef.current);
                setPaperLoaded(true);
              }}
            />
              <Logo className={styles.logo} />
              <Flex style={{ position: "absolute", zIndex: "100" }} direction="row" justify="flex-end" align={ isPortrait ? "flex-start" : "flex-end" } h="100%" pt="0">
                <div className={styles.intro}>
                  <h1 style={{fontFamily: isPortrait ? camptonBold.style.fontFamily : camptonSemiBold.style.fontFamily}} className={styles.title}>
                    Introduction Title
                  </h1>
                  <div className={styles.introText}>
                    One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed
                    into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could
                    see his brown belly, slightly domed and divided by arches into stiff sections. <a href="https://mothervolcano.github.io/polystar-demo/">Click me</a>
                  </div>
                </div>
              </Flex>
          </div>

          <div className={styles.projects}>
            {projectsData.map((p) => (
              <ProjectCard key={p.title} title={p.title} contrast={p.contrast} image={p.image} description={p.description} link={p.link}/>
            ))}
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
}

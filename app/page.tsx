"use client";

declare const paper: any;

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

// import Image from "next/image";
import styles from "./page.module.css";
import { camptonLight, camptonBook, camptonMedium, camptonSemiBold, camptonBold } from "./styles/fonts";

import PaperStage from "./components/paperStage";
import ProjectCard from "./components/ProjectCard";
import Logo from "./components/logo";

import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

import { useMediaQuery } from "@mantine/hooks";
import {
  ActionIcon,
  createTheme,
  MantineProvider,
} from "@mantine/core";

const theme = createTheme({
  components: {
    ActionIcon: ActionIcon.extend({
      vars: (theme, props) => {
        return { root: {'--ai-hover': props.color}}
      }
    })
  }
})

const thumbPolystar = "/img/project_thumb_polystar.png";
const thumbHilbert = "/img/project_thumb_hilbert.png";
const thumbPolkaFolks = "/img/project_thumb_polka.png";
const thumbOscill = "/img/project_thumb_oscill.png";
const thumbArborator = "/img/project_thumb_arborator.png";

import { init, resize, update, generate } from "./cover-interactive/main";

const COLORS_DARK = "#212121";
const COLORS_LIGHT = "#FFFFFF";

const projectsData = [
  {
    title: "Polka Folks",
    description:
      "Pursuing algorithmic life-like variation with whimsical little characters. Testing ground project from a new vector drawing framework.",
    image: thumbPolkaFolks,
    contrast: "LIGHT",
    colors: [COLORS_LIGHT, COLORS_DARK],
    link: "",
    textLinks: [],
    status: "SOON",
  },
  {
    title: "Hilbert",
    description:
      "A space-filling curve generator for Figma. Try it",
    image: thumbHilbert,
    contrast: "DARK",
    colors: [COLORS_LIGHT, COLORS_DARK],
    link: "https://www.figma.com/community/plugin/1397252695423426897/hilbert",
    textLinks: ["https://www.figma.com/community/plugin/1397252695423426897/hilbert", "here"],
    status: "READY",
  },
  {
    title: "Polystar",
    description: "A shape creation Figma plugin, based on a simple yet versatile model. Try it",
    image: thumbPolystar,
    contrast: "LIGHT",
    colors: [COLORS_LIGHT, COLORS_DARK],
    link: "https://www.figma.com/community/plugin/1392912403830410076/polystar",
    textLinks: ["https://www.figma.com/community/plugin/1392912403830410076/polystar", "here"],
    status: "READY",
  },
  {
    title: "Oscill",
    description:
      "A waveform generator Figma plugin that can be applied to any path. Try it",
    image: thumbOscill,
    contrast: "DARK",
    colors: [COLORS_LIGHT, COLORS_DARK],
    link: "https://www.figma.com/community/plugin/1398685942549501857/oscill",
    textLinks: ["https://www.figma.com/community/plugin/1398685942549501857/oscill", "here"],
    status: "READY",
  },
  {
    title: "Arborator",
    description:
      "Arborator is a proof-of-concept project testing a new procedural generation framework based on the Lindenmayer System, or L-System. Follow on",
    image: thumbArborator,
    contrast: "DARK",
    colors: [COLORS_LIGHT, COLORS_DARK],
    link: "",
    textLinks: ["https://github.com/mothervolcano/arborator", "GitHub"],
    status: "ONGOING",
  },
  // {
  //   title: "CyberGuard",
  //   description:
  //     "Game World for online game. Yadayadayada. Client: Siemens.",
  //   image: thumbArborator,
  //   contrast: "DARK",
  //   colors: [COLORS_LIGHT, COLORS_DARK],
  //   link: "/projects/cyberguard",
  //   textLinks: [],
  //   status: "READY",
  // },
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
      const margin = isLandscape ? 0.25 : 0.75;
      const density = isLandscape ? 50 : 7;

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
    <MantineProvider theme={theme}>
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
            <div className={styles.intro}>
              <div className={styles.title}>
                <h1
                  style={{ fontFamily: isPortrait ? camptonBold.style.fontFamily : camptonSemiBold.style.fontFamily }}
                >
                  Eduardo Barbosa
                </h1>
                <ActionIcon component="a" href="https://www.linkedin.com/in/eduardobarbosa/" target="_blank" variant="filled" color="#212121" size="1.45rem" radius="sm">
                  <IconBrandLinkedin size={24} stroke={1.5} />
                </ActionIcon>
                <ActionIcon component="a" href="https://github.com/mothervolcano" target="_blank" variant="filled" color="#212121" size="1.45rem" radius="xl">
                  <IconBrandGithub size={16} stroke={1.5} />
                </ActionIcon>
              </div>
              <div className={styles.introText} style={{ fontFamily: camptonBook.style.fontFamily }}>
                Creative Technologist. I build tools and systems that enhance quality of life, unlock new possibilities, and empower teams and individuals.
              </div>
            </div>
          </div>

          <div className={styles.projects}>
            {projectsData.map((p) => (
              <ProjectCard
                key={p.title}
                title={p.title}
                contrast={p.contrast}
                image={p.image}
                description={p.description}
                link={p.link}
                textLinks={p.textLinks}
                status={p.status}
                colors={p.colors}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </MantineProvider>
  );
}

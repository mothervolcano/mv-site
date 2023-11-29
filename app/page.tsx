"use client";

declare const paper: any;

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

// import Image from "next/image";
import styles from "./page.module.css";
import { useViewportSize } from "@mantine/hooks";

import PaperStage from "./components/paperStage";
import ProjectCard from "./components/ProjectCard";
import Logo from "./components/logo";

import { Button, Container, Flex, Card, Image, Title, Text, AspectRatio, rem } from "@mantine/core";

import thumbPolkaFolks from "../public/img/project_thumb_polka.png";
import thumbFass from "../public/img/project_thumb_fass.png";
import thumbFassPlugin from "../public/img/project_thumb_fass_plugin.png";
import thumbArborator from "../public/img/project_thumb_arborator.png";
import thumbPolystar from "../public/img/project_thumb_polystar.png";

import { init, update, generate } from "./demo-two/main";

const projectList = [
  {
    title: "Polka Folks",
    descrition: "...",
  },

  {
    title: "Arborator",
    descrition: "...",
  },

  {
    title: "FASS",
    descrition: "...",
  },

  {
    title: "Oscill",
    descrition: "...",
  },
];

export default function Home() {
  // ...
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paperLoaded, setPaperLoaded] = useState<boolean>(false);
  const { width, height } = useViewportSize();

  // ---------------------------------------------
  // HOOKS

  useEffect(() => {
    if (paperLoaded) {
      console.log(`! resize paper view to: width: ${width} height: ${height}`);
      paper.project.view.viewSize = [width / 3, height];

      init();
      generate();
    }
  }, [width, height]);

  // ---------------------------------------------
  // HANDLERS

  const setStage = (isPaperLoaded: boolean) => {
    console.log("Is Paper Loaded? ", isPaperLoaded);

    init();
    generate();

    setPaperLoaded(true);
  };

  const updateStage = (mousePos: { x: number; y: number }) => {
    // console.log(`! update stage: x: ${mousePos.x} y: ${mousePos.y}`);
    update(mousePos);
    generate();
  };

  const coverAreaWidth = `${(width * 1) / 3}px`;
  const projectsAreaWidth = `${(width * 2) / 3}px`;

  return (
    <>
      {width ? (
        <div className={styles.container}>
          <div style={{ width: coverAreaWidth, height: "100%" }} className={styles.cover}>
            <div className={styles.stage}>
              <PaperStage canvasRef={canvasRef} width={(width * 1) / 3} height={height} onMouseMove={updateStage} />
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

          <div style={{ width: projectsAreaWidth, height: "100%" }} className={styles.projects}>
            <ProjectCard
              title={"Polka Folks"}
              contrast="LIGHT"
              image={thumbPolkaFolks}
              description={`One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.`}
            />
            <ProjectCard
              title={"FASS"}
              contrast="DARK"
              image={thumbFass}
              description={`"How about if I sleep a little bit longer and forget all this nonsense", he thought, but that was something he was unable to do because he was used to sleeping on his right, and in his present state couldn't get into that position.`}
            />
            <ProjectCard
              title={"Arborator"}
              contrast="LIGHT"
              image={thumbArborator}
              description={`The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me? " `}
            />
            <ProjectCard
              title={"Polystar"}
              contrast="LIGHT"
              image={thumbPolystar}
              description={`It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather.`}
            />
            <ProjectCard
              title={"FASS Plugin"}
              contrast="LIGHT"
              image={thumbFassPlugin}
              description={`You've got to get enough sleep. Other travelling salesmen live a life of luxury. For instance, whenever I go back to the guest house during the morning to copy out the contract, these gentlemen are always still sitting there eating their breakfasts. `}
            />
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
}

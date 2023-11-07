"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { camptonBook, camptonBold } from "./styles/fonts";

import PaperStage from "./components/paperStage";
import ProjectCard from "./components/ProjectCard";
import Logo from "./components/logo";

import { Button, Title } from '@mantine/core';

import { init, update, generate } from "./demo/main";

export default function Home() {
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

  // ---------------------------------------------
  // HANDLERS

  const setStage = (isPaperLoaded: boolean) => {
    console.log("Is Paper Loaded? ", isPaperLoaded);

    init();
    generate();
  };

  const updateStage = (mousePos: { x: number; y: number }) => {
    update(mousePos);
    generate();
  };

  return (
    <div className={styles.container}>
      <div className={styles.cover}>
        <div className={styles.stage}>
          <PaperStage
            onPaperLoad={setStage}
            onMouseClick={updateStage}
            onMouseMove={updateStage}
          />
        </div>
        <div className={styles.logo}>
          <Logo className={styles.logo} />
        </div>
        <div className={styles.intro}>
          <Title order={1}>Mother Volcano</Title>
          <Title order={2}>Eduardo Barbosa</Title>
          One morning, when Gregor Samsa woke from troubled dreams, he found
          himself transformed in his bed into a horrible vermin. He lay on his
          armour-like back, and if he lifted his head a little he could see his
          brown belly, slightly domed and divided by arches into stiff sections.
        </div>
        <Button variant="solid">Click me!</Button>
      </div>

      <div className={styles.projects}>
        <div className={styles.project}>Project #1</div>
        <div className={styles.project}>Project #2</div>
        <div className={styles.project}>Project #3</div>
        <div className={styles.project}>Project #4</div>
        <ProjectCard style={styles.project}/>
      </div>
    </div>
  );
}

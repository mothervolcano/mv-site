"use client";

// import Image from "next/image";
import styles from "./page.module.css";

import PaperStage from "./components/paperStage";
import ProjectCard from "./components/ProjectCard";
import Logo from "./components/logo";

import {
  Button,
  Container,
  Flex,
  Card,
  Image,
  Title,
  Text,
  AspectRatio,
  rem
} from "@mantine/core";

import { init, update, generate } from "./demo/main";
import { useState } from "react";

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

        <Flex direction="row" justify="flex-end" align="flex-end" h="100%">
          <Container pl="25%" pb={rem(50)}>
            <Title order={2}>Introduction Title</Title>
            <div className={styles.intro}>
              One morning, when Gregor Samsa woke from troubled dreams, he found
              himself transformed in his bed into a horrible vermin. He lay on
              his armour-like back, and if he lifted his head a little he could
              see his brown belly, slightly domed and divided by arches into
              stiff sections.
            </div>
          </Container>
        </Flex>
      </div>

      <div className={styles.projects}>
        <ProjectCard
          title={"Polka Folks"}
          contrast="LIGHT"
          image="https://images.unsplash.com/photo-1673913816987-e7b0fb6ff6d2?q=80&w=4000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          description={`One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.`}
        />
        <ProjectCard
          title={"FASS"}
          contrast="LIGHT"
          image="https://images.unsplash.com/photo-1698633811105-a88dc770852c?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          description={`Drops of rain could be heard hitting the pane, which made him feel quite sad. "How about if I sleep a little bit longer and forget all this nonsense", he thought, but that was something he was unable to do because he was used to sleeping on his right, and in his present state couldn't get into that position.`}
        />
        <ProjectCard 
          title={"Arborator"}
          contrast="DARK"
          image="https://plus.unsplash.com/premium_photo-1676117274720-545b12f547fb?q=80&w=4374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          description={`The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me? " `}
        />
        <ProjectCard 
          title={"Polystar"}
          contrast="DARK"
          image="https://images.unsplash.com/photo-1699355484587-b5018a07b73e?q=80&w=3648&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          description={`It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather.`} 
        />
        <ProjectCard 
          title={"FASS Plugin"}
          contrast="DARK"
          image="https://images.unsplash.com/photo-1697606378971-4a3bb7b64bd0?q=80&w=4384&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          description={`You've got to get enough sleep. Other travelling salesmen live a life of luxury. For instance, whenever I go back to the guest house during the morning to copy out the contract, these gentlemen are always still sitting there eating their breakfasts. `}
        />
      </div>
    </div>
  );
}

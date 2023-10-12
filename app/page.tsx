'use client'

import Image from 'next/image'
import styles from './page.module.css'
import {camptonBook, camptonBold} from './styles/fonts';

import PaperStage from './components/paperStage';
import ProjectCard from './components/ProjectCard';

import {init, update, generate} from './demo/main';

export default function Home() {

  const projectList = [
    
    {
      title: "Polka Folks",
      descrition: "..."
    },

    {
      title: "Arborator",
      descrition: "..."
    },

    {
      title: "FASS",
      descrition: "..."
    },

    {
      title: "Oscill",
      descrition: "..."
    }

  ]

  // ---------------------------------------------
  // HANDLERS

  const setStage = ( isPaperLoaded: boolean ) => {

    console.log('Is Paper Loaded? ', isPaperLoaded);

    init();
    generate();

  }

  const updateStage = ( mousePos: {x:number, y:number}) => {

    init();
    update(mousePos);
    generate()

  }

  return (

    <main className={styles.grid}>

      <div id="cover" className={styles.cover}>
        <h1 className={camptonBold.className}>Mother Volcano</h1>
        <h2>Eduardo Barbosa</h2>
        <PaperStage onPaperLoad={setStage} onMouseClick={updateStage}/>
      </div>

        
      <div id="gallery" className={`${styles.gallery} ${camptonBold.className}`}>

        { projectList.map( ( n ) => { return <ProjectCard key={n.title} className={styles.projectCard} title={n.title}/> }) }

      </div>

    </main>
  )
}

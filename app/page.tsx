import Image from 'next/image'
import styles from './page.module.css'
import {camptonBook, camptonBold} from './styles/fonts';

import ProjectCard from './components/ProjectCard';

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


  return (

    <main className={styles.grid}>

      <div>
        <h1 className={camptonBold.className}>Mother Volcano</h1>
        <h2>Eduardo Barbosa</h2>
      </div>

        
      <div id="gallery" className={`${styles.gallery} ${camptonBold.className}`}>

        { projectList.map( ( n ) => { return <ProjectCard className={styles.projectCard} title={n.title}/> }) }

      </div>

    </main>
  )
}

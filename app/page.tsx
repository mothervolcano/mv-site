import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {

  return (

    <main className={styles.grid}>

      <div>
        <h1>Mother Volcano</h1>
        <h2>Eduardo Barbosa</h2>
      </div>

      <div id="gallery" className={styles.gallery}>
        <div>
          <h3>Project Title</h3>
        </div>
        <div>
          <h3>Project Title</h3>
        </div>
        <div>
          <h3>Project Title</h3>
        </div>
        <div>
          <h3>Project Title</h3>
        </div>
        <div>
          <h3>Project Title</h3>
        </div>

      </div>

    </main>
  )
}

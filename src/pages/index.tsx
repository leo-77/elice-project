// src/pages/index.tsx
import { useState } from 'react';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello, Next.js!</h1>
    </div>
  );
};

export default Home;

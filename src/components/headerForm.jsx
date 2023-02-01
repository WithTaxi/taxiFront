import React from 'react';
import TAXI from './taxi.jpg';
import styles from './header.module.css';

export default function HeaderForm() {
  
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={TAXI} alt="택시 사진" />
      </div>
      <div
        className={styles.title}
      >TAXI</div>
    </div>
  )
}
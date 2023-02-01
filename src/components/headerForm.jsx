import React from 'react';
import TAXI from './taxi.jpg';
import styles from './header.module.css';
import { useNavigate } from 'react-router-dom';

export default function HeaderForm() {
  const navigate = useNavigate();
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={TAXI} alt="택시 사진" />
      </div>
      <div
        className={styles.title}
        onClick={(e) => navigate('/')}
        style={{cursor: 'pointer'}}
      >TAXI</div>
    </div>
  )
}
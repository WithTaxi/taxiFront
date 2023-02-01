import React, { useState, useEffect} from 'react';
import Header from '../components/headerForm';
import axios from 'axios';
import FindId from './FindId';
import styles from './selectFind.module.css';

axios.defaults.withCredentials = true;

export default function SelectFind() {

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <a href='FindId' className={styles.findId}>아이디 찾기</a>
        <a href='FindPw' className={styles.findPw}>비밀번호 찾기</a>
      </div>
    </div>
  )
}
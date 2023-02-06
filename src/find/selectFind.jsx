import React, { useState, useEffect} from 'react';
import Header from '../components/headerForm';
import axios from 'axios';
import FindId from './FindId';
import styles from './selectFind.module.css';

axios.defaults.withCredentials = true;

export default function SelectFind() {

  return (
    <div>

      {/* <div className={styles.toggleSwitch}>
        <input
          type="checkbox"
          className={styles.checkbox}
          id="toggleSwitch"
        />
        <label className={styles.label} htmlFor="toggleSwitch">
        <span className={styles.toggleInner}></span>
        <span className={styles.switch}></span>
      </label>
      </div> */}
      
      <div className={styles.wrapper}>
        <span
          className={styles.findId}

        ><a href='/findId'>아이디 찾기</a></span>

        <span
          className={styles.findPw}
        ><a href='/findPw'>비밀번호 찾기</a></span>
        {/* <div className={styles.wrapper}>
          <a href='FindId' className={styles.findId}>아이디 찾기</a>
          <a href='FindPw' className={styles.findPw}>비밀번호 찾기</a>
        </div> */}
        
      </div>
      <div><FindId/></div>
    </div>
  )
}
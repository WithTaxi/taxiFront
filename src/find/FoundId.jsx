import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './FoundId.module.css'
import Header from '../components/headerForm';
import copyImg from './copyBtn.png';
// import FieldSet from 'react-native-fieldset';
// import { View, Text } from 'react-native';
import axios from 'axios';

export default function FoundId() {

  const navigate = useNavigate();
  const location = useLocation();

  const [id, setId] = useState(location.state.id);
  // const [checked, setChecked] = useState(false);


  // function changeChecked(e) {
  //   setChecked(!checked);
  // }

  const findPw = (e) => {
    // e.preventDefault();
    navigate('/FindPw', {
      state: {
        id: id
      }
    });
  }


  const goLogin = (e) => {
    //window.sessionStorage.setItem("tmpUserId", id);
    navigate('/login', {
      state: {
        id: id
      }
    })
    console.log(id);
    // window.close();
  }

  useEffect(() => {
    setId(location.state.id);
    console.log(id);
    
  }, [location.state.id]);

  return (
    <>
      <div className={styles.header_wrapper}>
        <Header />
      </div>

      <div className={styles.FoundId}>

        <div className={styles.fieldSet}>
          <div className={styles.info}>회원님의 정보와 일치하는 아이디입니다.</div>
          <div className={styles.idbox}>
            <span className={styles.id}>{location.state.id}</span>
          </div>
        </div>

        <div className={styles.after_wrapper}>
          <button className={styles.findPw}>
            <a
              className={styles.pw_link}
              onClick={findPw}
            >비밀번호 찾기</a>
          </button>
          <button className={styles.login} onClick={goLogin}>
            <a
            >
              로그인
            </a>
          </button>
        </div>

      </div>
    </>
  )
}
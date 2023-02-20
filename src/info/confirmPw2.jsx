import React, { useState, useEffect, useRef} from 'react'
import axios, { AxiosHeaders } from 'axios';
import Header from '../components/headerForm';
import styles from './confirmPw.module.css';
import modules from './userInfo.module.css';

import { Link, useNavigate} from "react-router-dom";



axios.defaults.withCredentials = true;

export default function ConfirmPw() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const formRef = useRef();
  
  //비밀번호 일치 여부 확인
  function chkPw(e) {
    console.log(password);
    e.preventDefault();
    
    axios.post('http://localhost:8080/api/user/checkPassword', {
      password: password,
    }, { headers: {Authorization: `${window.localStorage.getItem('grantType')} ${window.localStorage.getItem('accessToken')}` } })
      .then((res) => {
        console.log(res.data);
        if (res.data == 1) {
          alert('비밀번호가 일치합니다.');
          navigate('/chnPw');
        }
        else {
          alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.')
        }
      })
      .catch((error) => {
        const tokenData = {
          "accessToken": window.localStorage.getItem('accessToken'),
          "refreshToken": window.localStorage.getItem('refreshToken')
        }
          axios
        .post(`http://localhost:8080/api/user/reissue`, tokenData )
        .then(response => {
          console.log(response);
          window.localStorage.setItem("accessToken", response.data.accessToken);
          window.localStorage.setItem("accessTokenExpireData", response.data.accessTokenExpireData);
          window.localStorage.setItem("grantType", response.data.grantType);
          window.localStorage.setItem("refreshToken", response.data.refreshToken);
          againPost();
          return;
        })
        .catch(function (err) {
          console.log(err);
        })
        console.log(error);
    })

    // fetch('http://localhost:8080/api/user/checkPassword', {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     password: formRef.current.password.value,
    //   }),
    // })
    //   .then(res => {
    //     if (res.status === 200) {
    //     console.log(res)
    //   }
    //   }).catch(err => {
    //     console.log(err);
    // })
  }

  function againPost() {
    axios.post('http://localhost:8080/api/user/checkPassword', {
      password: password,
    }, { headers: { Authorization: `${window.localStorage.getItem('grantType')} ${window.localStorage.getItem('accessToken')}` } }
    )
      .then((res) => {
        if (res.data === 1) {
          alert('비밀번호가 일치합니다.');
          navigate('/chnPw');
        }
        else {
          alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.')
        }
      })
      .catch((error) => { 
        console.log(error);
      })
  }
  return (
    <div className={styles.main_wrapper}>
      <div className={styles.header}>
        <Header />
      </div>

      <div className={styles.title}>현재 비밀번호를 입력하세요</div>
      <div className={styles.content_wrapper}>
        <form ref={formRef}>
          <div className={styles.content}>
            <input
              name='password'
            type='password'
            placeholder='password'
              value={password}
              className={styles.PwInput}
              onChange={(e) => setPassword(e.target.value)}
          />
          
            <button
            onClick={chkPw}
              className={styles.PwBtn}
              style={{ height: "50px"}}
            >입력</button>
          </div>
        </form>
      </div>
    </div>
  );
}
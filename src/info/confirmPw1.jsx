import React, { useState, useEffect, useRef} from 'react'
import axios, { AxiosHeaders } from 'axios';
import Header from '../components/headerForm';
import styles from './confirmPw.module.css';
import { useNavigate } from 'react-router-dom';


axios.defaults.withCredentials = true;

export default function ConfirmPw() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const formRef = useRef();
  // var params = new URLSearchParams();
  // params.append('password', password);
  function chkPw(e) {
    console.log(password);
    e.preventDefault();
    
    axios.post('http://localhost:8080/api/user/checkPassword', {
      password: JSON.stringify(password),
    }, { headers: {Authorization: `${window.localStorage.getItem('grantType')} ${window.localStorage.getItem('accessToken')}` } }
    )
      .then((res) => {
        console.log(res);
        if (res.data === 1) {
          alert('비밀번호가 일치합니다.');
          navigate('/chnInfo');
        }else if (res.data === 0){
          alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.')
        }
        
      })
      .catch((error) => {
        if (error.response.data == '만료된 토큰') {
          console.log(typeof error.response.data);
          const tokenData = {
            "accessToken": window.localStorage.getItem('accessToken'),
            "refreshToken": window.localStorage.getItem('refreshToken')
          }
          axios
            .post(`http://localhost:8080/api/user/reissue`, tokenData)
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
              if (err.response.data == '유효하지 않은 토큰입니다') {
                alert('로그인을 다시 진행해주세요.');
                navigate('/login');
                window.localStorage.clear();
                console.log(err);
                return;
              }
              console.log(err);
            })
          console.log(error);
        }
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
        console.log(res);
        if (res.data === 1) {
          alert('비밀번호가 일치합니다.');
          navigate('/chnInfo');
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
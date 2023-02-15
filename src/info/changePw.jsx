import React, { useState, useEffect} from 'react'
import axios from 'axios';
import Header from '../components/headerForm';
import styles from './changePw.module.css';
import { useNavigate } from 'react-router-dom';


axios.defaults.withCredentials = true;

export default function ChangePw() {
  const navigate = useNavigate();
  const [newPw, setNewPw] = useState('');
  const [chkNewPw, setChkNewPw] = useState('');

  const [PwStyle, setPwStyle] = useState({ visibility: 'visible' });


  useEffect(() => {
    if (newPw === '') {
      setPwStyle({ visibility: 'visible' })
    }
    else {
      if (chkNewPw === newPw) {
        setPwStyle({ visibility: 'hidden' });
      }
      else {
        setPwStyle({ visibility: 'visible' });
      }
    }
  }, [newPw]);

  useEffect(() => {
    if (chkNewPw === '') {
      setPwStyle({ visibility: 'visible' })
    }
    else {
      if (chkNewPw === newPw) {
        setPwStyle({ visibility: 'hidden' });
      }
      else {
        setPwStyle({ visibility: 'visible' });
      }
    }
  }, [chkNewPw]);


  async function changePw(e) {
    e.preventDefault();
    if (newPw === chkNewPw) {
      const response = await axios
        .put("http://localhost:8080/api/user/modifyPassword", {
          password: newPw
        },  { headers: {Authorization: `Bearer ${window.localStorage.getItem('token')}` } })
      console.log(response);
      if (response.data == 1) {
        window.localStorage.setItem('password', newPw);
        alert('비밀번호 변경이 완료되었습니다!');
        navigate('/login');
      }
    }
    else {
      alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
    }
  }

  return (
    <>
      <div className={styles.header}>
        <Header />
      </div>

      <form method='get' action='#'>
        {/* <fieldset>
          <legend>비밀번호 변경</legend> */}
      <div className={styles.main_wrapper}>

        <div className={styles.content_wrapper}>
          <div className={styles.newPwDiv}>
            <div className={styles.newPwtitle}>
              새로운 비밀번호
            </div>
            <input
              type='password'
              name='newPw'
                value={newPw}
                className={styles.newPwInput}
              onChange = {e => setNewPw(e.target.value)}
            />

          </div>

          <div className={styles.conPwDiv}>
            <div className={styles.conPwtitle}>
              새로운 비밀번호 확인
            </div>
            <input 
              type='password'
              name='chkNewPw'
                value={chkNewPw}
                className={styles.conPwInput}
              onChange = {e => setChkNewPw(e.target.value)}
            />
            <div className={styles.error} style={PwStyle}>
              비밀번호가 일치하지 않습니다.
            </div>
          </div>

            <div className={styles.chnPwBtn_wrapper}>
              <button
                onClick={changePw}
                className={styles.chnPwBtn}
              >
                비밀번호 변경
              </button>
              </div>
            </div>
          </div>
      </form>
    </>
  );
}
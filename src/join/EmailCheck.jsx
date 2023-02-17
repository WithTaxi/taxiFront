import React, { useState, useEffect} from 'react'
import axios from 'axios';
import styles from './EmailCheck.module.css'

import { Link, useNavigate, useLocation } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function EmailCheck() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [postEmail, setPostEmail] = useState('@dankook.ac.kr');
  const [authOk, setAuthOk] = useState(false);
  const [codeAns, setCodeAns] = useState('');
  const [code, setCode] = useState('');

  const [styleBox, setStyleBox] = useState({ visibility: 'hidden' });

  const emailArr = ['dankook.ac.kr', 'catholic.ac.kr', 'gachon.ac.kr', 'snu.ac.kr'];

  //도메인 부분
  const emailChange = (e) => {
    setPostEmail(`@${emailArr[e.target.value - 1]}`);
    
  }


  //이메일 중복 확인
  const dupCheck = (e) => {
    e.preventDefault();
    if (email === '') {
      alert('이메일을 입력해주세요.');
      return;
    }

    axios
      .get(`http://localhost:8080/api/user/join/user-email/${email}${postEmail}/dup`)
      .then(response => {
        if (response.data) {
          alert("사용할 수 없는 이메일입니다. 다시 입력해주세요.");
          
          setEmail('');
        }
        else {
          alert("사용할 수 있는 이메일입니다.");
          setAuthOk(true);
        }
      })
      .catch(function (err) {
        alert('error 발생')
        console.log(err);
      })
  }

  //이메일 인증
  var params = new URLSearchParams();
  const authCheck = (e) => {
    e.preventDefault();
    if (authOk === false) {
      alert('먼저 이메일 중복 확인을 진행해주세요.');
      return;
    }
    if (email === '') {
      alert('이메일을 입력해주세요.');
      return;
    }
  

    params.append('email', `${email}${postEmail}`);
    console.log(`${email}${postEmail}`);
    alert('인증 번호가 전송되었습니다. 메일함을 확인해주세요.');
    setStyleBox({ visibility: 'visible' })

    e.preventDefault();
    axios.post('http://localhost:8080/api/email/mailConfirm', params, {
      withCredentials: true,
    })
      .then((response) => {
        console.log(response.data);
        setCodeAns(response.data);
        // setEmailAnswer(JSON.stringify(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const checkCode = (e) => {
    e.preventDefault();
    if (code === codeAns) {
      alert("인증 성공하였습니다.");
      console.log(`${email}${postEmail}`)
      navigate('/join', {
        state: {
          email: `${email}${postEmail}`
        }
      });
    }
    else {
      alert("인증에 실패했습니다. 코드를 다시 확인해주세요.");
      setCode('');
    }
  }

  return (
    <>
      <div className={styles.main_wrapper}>
      <main className={styles.main}>
        <div className={styles.emailText}>
            대학생만 이용 가능한 서비스입니다.<br />
            확인을 위해 이메일 인증을 진행합니다.
          </div>
          
          <form className={styles.emailForm}>
            <input
              className={styles.emailInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='text'
              placeholder='이메일'
            />
            {/* <span className={styles.EmailMen}>@</span> */}
            <h2>@</h2>
            <select
                className={styles.emailSelect}
                // defaultValue={emailNum}
                onChange={emailChange}
              >
                <option className="emailOp" value="1" /*onClick={(e) => setEmailNum(e.target.value)}*/>dankook.ac.kr</option>
                <option className="emailOp" value="2" /*onClick={(e) => setEmailNum(e.target.value)}*/>catholic.ac.kr</option>
                <option className="emailOp" value="3" /*onClick={(e) => setEmailNum(e.target.value)}*/>gachon.ac.kr</option>
                <option className="emailOp" value="4" /*onClick={(e) => setEmailNum(e.target.value)}*/>snu.ac.kr</option>
              </select>
          </form>
          <div className={styles.dupCheck} onClick={dupCheck}>이메일 중복 확인</div>
          <div className={styles.authCheck} onClick={authCheck}>이메일 인증</div>
          <div className={styles.code_wrapper} style={styleBox}>
            <input
              className={styles.code_input}
              type='text'
              placeholder='인증 코드를 입력하세요'
              value={code}
              onChange={(e) => {setCode(e.target.value)}}
            />
            <div className={styles.codeCheck} onClick={checkCode}>확인</div>
          </div>
      </main>
      </div>
    </>
  );
}
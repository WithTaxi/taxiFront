import React, { useState, useEffect, useRef} from 'react'
import axios, { AxiosHeaders } from 'axios';
import Header from '../components/headerForm';
import modules from './userInfo.module.css';
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
      password: password,
    }, { "Content-Type": 'application/json' })
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
  return (
    <div>
      <div>현재 비밀번호를 입력하세요</div>
      <div>
        <form ref={formRef}>
          <div>
            <input
              name='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={chkPw}
              style={{ height: "50px"}}
              />
          </div>
        </form>
      </div>
    </div>
  );
}
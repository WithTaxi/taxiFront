import React, { useState, useEffect} from 'react'
import axios from 'axios';
import Header from '../components/headerForm';
import modules from './userInfo.module.css';
import { useNavigate } from 'react-router-dom';


axios.defaults.withCredentials = true;

export default function ChangePw() {
  const navigate = useNavigate();
  const [newPw, setNewPw] = useState('');
  const [chkNewPw, setChkNewPw] = useState('');

  async function changePw(e) {
    e.preventDefault();
    if (newPw === chkNewPw) {
      const response = await axios
        .put("http://localhost:8080/api/user/modifyPassword", {
          password: newPw
        }, { "Content-Type": 'application/json' })
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
      <Header />
      <div>

        <div>
          새로운 비밀번호
          <input
            type='password'
            name='newPw'
            value={newPw}
            onChange = {e => setNewPw(e.target.value)}
          />
        </div>

        <div>
          새로운 비밀번호 확인
          <input 
            type='password'
            name='chkNewPw'
            value={chkNewPw}
            onChange = {e => setChkNewPw(e.target.value)}
          />
        </div>
        <button
          onClick={changePw}
        >
          비밀번호 변경
        </button>
      </div>
    </>
  );
}
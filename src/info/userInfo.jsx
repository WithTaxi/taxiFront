import React, { useState, useEffect} from 'react'
import axios from 'axios';
import Header from '../components/headerForm';
import modules from './userInfo.module.css';
import { useNavigate } from 'react-router-dom';


axios.defaults.withCredentials = true;

export default function UserInfo() {
  const navigate = useNavigate();
  function withDrawal(e) {
    e.preventDefault();

    if (window.confirm("정말 탈퇴하시겠습니까?ㅜㅜ")) {
      axios.delete('http://localhost:8080/api/user/withdrawal', {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        if (response.data == 1) {
          alert('탈퇴 되었습니다.')
          navigate('/')
        }
      })
    }
    
  }
  
  return (
    <div>
      <Header />
      <div><a href='/confirmPw1'>개인 정보 변경</a></div>
      <div><a href='/confirmPw2'>비밀번호 변경</a></div>
      <div><a
        onClick={withDrawal}
        style={{cursor: 'pointer'}}
      >회원탈퇴</a></div>
    </div>
  );
}
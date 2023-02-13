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
          alert('탈퇴 되었습니다.');
          navigate('/login');
          window.localStorage.clear();
        }
      })
    }
    
  }
  
  return (
    <div className={modules.userInfo_wrapper}>
      <div className={modules.header}>
        <Header />
      </div>

      <div className={modules.chnInfoDiv}><button className={modules.chnInfoBtn}><a className={modules.chnInfo} href='/confirmPw1'>개인 정보 변경</a></button></div>
      <div className={modules.chnPwDiv}><button className={modules.chnPwBtn}><a className={modules.chnPw} href='/confirmPw2'>비밀번호 변경</a></button></div>
      <div className={modules.memberOutDiv}>
        <button className={modules.memberOutBtn}>
        <a
        className={modules.memberOut}
        onClick={withDrawal}
        style={{cursor: 'pointer'}}
      >회원탈퇴</a></button></div>
    </div>
  );
}
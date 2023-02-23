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
        headers: { Authorization: `${window.localStorage.getItem('grantType')} ${window.localStorage.getItem('accessToken')}` }
      })
        .then((response) => {
          console.log(response);
          if (response.data == 1) {
            alert('탈퇴 되었습니다.');
            navigate('/login');
            window.localStorage.clear();
          }
        }).catch((error) => {
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
                againDelete();
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
    }
    
  }

  function againDelete() {
    axios.delete('http://localhost:8080/api/user/withdrawal', {
      headers: { Authorization: `${window.localStorage.getItem('grantType')} ${window.localStorage.getItem('accessToken')}` }
    })
      .then((response) => {
        console.log(response);
        if (response.data == 1) {
          alert('탈퇴 되었습니다.');
          navigate('/login');
          window.localStorage.clear();
        }
      }).catch((err) => {
        console.log(err);
      })
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
import React, { useState, useEffect } from 'react';
import Header from '../components/headerForm';
import axios from 'axios';
import styles from './find.module.css';

axios.defaults.withCredentials = true;

export default function FindPw() {

  const [id, setId] = useState('');

  var params = new URLSearchParams();
  params.append('userId', id);

  function postInfo(e) {
    e.preventDefault();
    axios.post('http://localhost:8080/api/email/issueTemporaryPassword', params, {
      withCredentials: true,
    }
    ).then(function (response) {
        alert("임시 비밀번호를 발급하였습니다. 메일함을 확인해주세요.");
        console.log(response);
      }).catch(function (error) {
        alert("error는 " + error);
        console.log(error.response);
      });

  }

  return (
    <div>
      <Header />
      <div className={styles.main_wrapper}>
        <h1>비밀번호 찾기</h1>
        <div>
          <form
            className={styles.form_wrapper}
            action="/api/email/issueTemporaryPassword"
            method="POST"
            onSubmit={postInfo}
          >
            <input
              type="text"
              name="userId"
              value={id}
              className={styles.input}
              placeholder="UserId"
              onChange={(e) => setId(e.target.value)}
            />

            
            {/* <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/> */}
            <button
              className={styles.btn}
              type="submit"
              formMethod="get"
              // onClick={postInfo}
            >비밀번호 찾기</button>
          </form>
        </div>
      </div>
    </div>
  )
}
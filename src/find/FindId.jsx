import React, { useState, useEffect } from 'react';
import Header from '../components/headerForm';
import axios from 'axios';
import styles from './find.module.css';

axios.defaults.withCredentials = true;

export default function FindId() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [id, setId] = useState('');

  function postInfo(e) {
    e.preventDefault();
    axios.post('http://localhost:8080/api/user/findId', {
        name: name, email: email
    }, { "Content-Type": 'application/json' }
    ).then(function (response) {
        alert("아이디 찾기 성공");
        console.log(response.data);
        setId(response.data);
      }).catch(function (error) {
        alert("error는 " + error);
        console.log(error.response);
      });

  }

  return (
    <div>
      <Header />
      <div className={styles.main_wrapper}>
        <h1>아이디 찾기</h1>
        <div>
          <form
            className={styles.form_wrapper}
            action="/api/user/findId"
            method="GET"
            onSubmit={postInfo}
          >
            <input
              type="text"
              name="name"
              value={name}
              className={styles.input}
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              name="email"
              value={email}
              className={styles.input}
              placeholder="UserEmail"
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/> */}
            <button
              className={styles.btn}
              type="submit"
              formMethod="get"
              // onClick={postInfo}
            >아이디 찾기</button>
          </form>
        </div>
      </div>
    </div>
  )
}
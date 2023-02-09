import React, { useState, useEffect } from 'react';
import Header from '../components/headerForm';
import { Link, useNavigate} from "react-router-dom";

import axios from 'axios';
import styles from './find.module.css';

axios.defaults.withCredentials = true;

export default function FindId() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [nameStyle, setNameStyle] = useState({ visibility: 'visible' });
  const [emailStyle, setEmailStyle] = useState({ visibility: 'visible' });

  const [id, setId] = useState('');

  useEffect(() => {
    if (name !== '') {
      setNameStyle({ visibility: 'hidden' });
    }
    else {
      setNameStyle({ visibility: 'visible' });
    }
  }, [name]);

  useEffect(() => {
    if (email !== '') {
      setEmailStyle({ visibility: 'hidden' });
    }
    else {
      setEmailStyle({ visibility: 'visible' });
    }
  }, [email]);

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

  useEffect(() => {
    if (id !== '') {
      navigate('/FoundId', {
        state: {
          id: id
        }
      });
    }
  }, [id]);

  return (
    <div>
      <div className={styles.header_wrapper}>
        <Header />
      </div>
      <div className={styles.main_wrapper}>
        <h2>아이디 찾기</h2>
        <div>
          <form
            className={styles.form_wrapper}
            
            onSubmit={postInfo}
          >
            <div>
            <input
              type="text"
              name="name"
              value={name}
              className={styles.input}
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
            />
              <div
                style={nameStyle}
                className={styles.error}
              >
              이름을 입력해주세요.
              </div>
              </div>

            <div>
            <input
              type="email"
              name="email"
              value={email}
              className={styles.input}
              placeholder="UserEmail"
              onChange={(e) => setEmail(e.target.value)}
            />
              <div
                style={emailStyle}
                className={styles.error}
              >
              이메일을 입력해주세요.
              </div>
            </div>

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
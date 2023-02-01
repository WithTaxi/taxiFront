import React, { useState, useEffect, useRef} from 'react'
import axios from 'axios';
import Header from '../components/headerForm';
import styles from './login.module.css'
import { useCookies } from 'react-cookie';
import { setCookie, getCookie } from '../cookie.js';


import { Link, useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function Login() {
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const formRef = useRef();
  var userInfo = [];


  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['cookie']);
  const [logged, setLogged] = useState(false);
  const [checked, setChecked] = useState(false);

  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [idpwOk, setIdPwOk] = useState(false);


  useEffect(() => {
    if (idValid && pwValid) {
      setIdPwOk(false);
      return;
    }
    else {
      setIdPwOk(true);
    }
  }, [idValid, pwValid])

  //axios

  async function postInfo(e) {
    try {
      
      e.preventDefault();
      // const token = cookies.id;
      const response = await axios
        .post("http://localhost:8080/login", {
          // token: token,
          userId: formRef.current.userId.value,
          password: formRef.current.password.value,
          // username: id,
          // password: password,
        }, { "Content-Type": 'application/json' });
      // console.log(getCookie('cookie'));
      if (checked) {
        handleCookie(id, password)
      }
      console.log(response.data);
      // console.log(checked);
      
        //로그인 성공 시
        if (response.data == 1) {
          alert("로그인 성공!");
          window.localStorage.setItem("userId", id);
          window.localStorage.setItem("password", password);
          setLogged(true);
          console.log(logged);
          getInfo();
        }    
      
      
    } catch (error) {
      console.log(error);
    }
    
  }

  //사용자 정보 가져오기
  // async function getInfo() {
  //   // e.preventDefault();
  //   const response = await fetch('http://localhost:8080/api/user/info')
  //   if (response.status == 200) {
  //     const data = await response.json()
  //     console.log(data);
  //     window.localStorage.setItem("nickname", data["nickName"]);
  //     window.localStorage.setItem("university", data["university"]);
  //     navigate('/');
  //   }
  //   else {
  //     throw new Error('err 발생')
  //   }
  // }

  async function getInfo() {
    await axios.get('http://localhost:8080/api/user/info')
      .then((res) => {
        console.log(res.data);
        window.localStorage.setItem("name", res.data["name"]);
        window.localStorage.setItem("sex", res.data["sex"]);
        window.localStorage.setItem("nickName", res.data["nickName"]);
        window.localStorage.setItem("mobile", res.data["mobile"]);
        window.localStorage.setItem("birthday", res.data["birthday"]);
        window.localStorage.setItem("email", res.data["email"]);
        window.localStorage.setItem("university", res.data["university"]);
        navigate('/');
      })
      .catch((err) => {
        console.log('err 발생: ' + err);
    })
    // if (response.status == 200) {
    //   const data = await response.json()
    //   console.log(data);
    //   window.localStorage.setItem("nickname", data["nickName"]);
    //   window.localStorage.setItem("university", data["university"]);
    //   navigate('/');
    // }
  }

  const handleCookie = (userId, password) => {
    setCookie(
        'cookie',
        {
          userId: userId,
          password: password,
        },
        {
          path: '/',
        }
      );
  }  

  return (
    <div>
      
      <Header/>

      <div className={styles.main_wrapper}>
        <div className={styles.join}><Link to="/Join">회원가입</Link></div>
        <div className={styles.form_wrapper}>
          <form /*action="/login" method="POST" */ref={formRef} >
            <div id="id-wrapper">
              <input 
                type="text" 
                name="userId" 
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="아이디"
                className={styles.id}
                required
              />
              
            </div>
            
            <br/>

            <div id="pw-wrapper">
              <input 
                type="password" 
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
                className={styles.pw}
                required
              />
            </div>
            <br/>
            <div id="btn">
            <button
              className={styles.login_btn}
              // type="submit"
              // formMethod="post"
              onClick={postInfo}
            >로그인</button></div>

            <div className="_wrapper">
              <span className={styles.chk_wrapper}>
                <input
                  id='login_main'
                  type="checkbox"
                  name="login_man"
                  className={styles.login_man}
                  onClick={e => setChecked(true)}
                  placeholder="로그인 유지"
                />
                <label
                  htmlFor="login_main"
                >로그인 유지</label>
              </span>
              <span className={styles.idpw_find}>
                <Link to="/Find">아이디 | 비밀번호 찾기</Link>
              </span>
            </div>
          </form>
          {/* <div className={styles.other_login}>
            <a href="#"><div className={styles.google}>구글 로그인</div></a>
            <div className={styles.facebook} ><a href="#">페이스북 로그인</a> </div>
            <div className={styles.naver} ><a href="#">네이버 로그인</a> </div>
            <div className={styles.kakao} ><a href="#">카카오 로그인</a> </div>
          </div> */}
          </div>
      </div>
    </div>
  )
}



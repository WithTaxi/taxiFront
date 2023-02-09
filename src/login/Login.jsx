import React, { useState, useEffect, useRef} from 'react'
import axios from 'axios';
import Header from '../components/headerForm';
import styles from './login.module.css'
import { useCookies } from 'react-cookie';
import { setCookie, getCookie } from '../cookie.js';


import { Link, useNavigate, useLocation } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function Login() {
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const location = useLocation();

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
      if (location.state !== null) {
        setId(location.state.id);
        console.log(id);
      }
      else {
        setId('');
    }
    }, [location.state]);

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
      const response = await axios
        .post("http://localhost:8080/login", {
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
      //response 401: 회원 정보 잘못됨, 400: 정보 없음
      
        //로그인 성공 시
        if (response.data == 1) {
          alert("로그인 성공!");
          window.localStorage.setItem("userId", id);
          window.localStorage.setItem("password", password);
          setLogged(true);
          console.log(logged);
          getInfo();
      }    
        else if (response.data == 0) {
          alert(`로그인 실패!
정보를 다시 확인해주세요.`);
          setId('');
          setPassword('');
      }
      
      
    } catch (error) {
      console.log(error);
    }
    
  }


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

  const idFind = (e) => {
    //window.open("/findId", "findId", "width=500, height=550, top=50, left=200")
    navigate('/findId');
  }
  
  const pwFind = (e) => {
    //window.open("/findPw", "findPw", "width=600, height=500, top=50, left=200")
    navigate('/findPw');
  }

  const kakaoLogin = (e) => {
    window.location.href = `http://localhost:8080/oauth2/authorization/kakao`;
  }

  return (
    <div className={styles.main}>
      
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
                className={styles.loginId}
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
                className={styles.loginPw}
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

            <div className={styles.findWrapper}>
              <span className={styles.chk_wrapper}>
                {/* <input
                  id='login_main'
                  type="checkbox"
                  name="login_man"
                  className={styles.login_man}
                  onClick={e => setChecked(true)}
                  placeholder="로그인 유지"
                />
                <label
                  htmlFor="login_main"
                  className={styles.loginManText}
                >로그인 유지</label> */}
              </span>
              <span 
                onClick={idFind}
                className={styles.id_find}
              >
                아이디 찾기 | 
              </span>
              
              <span 
                onClick={pwFind}
                className={styles.pw_find}
              >
                비밀번호 찾기
              </span>
            </div>
          </form>
          {/* <div className={styles.other_login}>
            <a href="#"><div className={styles.google}>구글 로그인</div></a>
            <div className={styles.facebook} ><a href="#">페이스북 로그인</a> </div>
            <div className={styles.naver} ><a href="#">네이버 로그인</a> </div>
            <div className={styles.kakao} onClick={kakaoLogin}><a href="#">카카오 로그인</a> </div>
          </div> */}
          </div>
      </div>
    </div>
  )
}


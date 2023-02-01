import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/headerForm';
import axios from 'axios';
import styles from './join.module.css';
import 'url-search-params-polyfill';

import { Link, useNavigate } from "react-router-dom";



export default function Join() {

  const navigate = useNavigate();
  const [style, setStyle] = useState({ display: 'none' })
  const [EmailStyle, setEmailStyle] = useState({ display: 'none' });

  //유효성 검사
  const [idOK, setIdOK] = useState(true)
  const [PWOK, setPWOK] = useState(true)
  const [ChkOK, setChkOK] = useState(true)
  const [NameOK, setNameOK] = useState(true)
  const [SexOK, setSexOK] = useState(true)
  const [NicknameOK, setNicknameOK] = useState(true)
  const [MobileOK, setMobileOK] = useState(true)
  const [BirthOK, setBirthOK] = useState(true)
  const [EmailOK, setEmailOK] = useState(true)
  const [UnivOK, setUnivOK] = useState(true)

  //기본 정보
  const [errMsg, setErrMsg] = useState('필수 정보입니다.')
  const [ID, setID] = useState('');
  const [PW, setPW] = useState('');
  const [Chk_PW, setChk_PW] = useState('');
  const [Name, setName] = useState('');
  const [Sex, setSex] = useState('');
  const [Nickname, setNickname] = useState('');
  const [Mobile, setMobile] = useState('');
  const [Birth, setBirth] = useState('');
  var [Email, setEmail] = useState('');
  const [Univ, setUniv] = useState('');

  const [UnivNum, setUnivNum] = useState('1');


  //오류메시지 상태 저장
  const [idMsg, setIdMsg] = useState('')
  const [PWMsg, setPWMsg] = useState('')
  const [ChkMsg, setChkMsg] = useState('')
  const [NameMsg, setNameMsg] = useState('')
  const [SexMsg, setSexMsg] = useState('')
  const [NicknameMsg, setNicknameMsg] = useState('')
  const [MobileMsg, setMobileMsg] = useState('')
  const [BirthMsg, setBirthMsg] = useState('')
  const [EmailMsg, setEmailMsg] = useState('')
  const [UnivMsg, setUnivMsg] = useState('')

  const [EmailCode, setEmailCode] = useState('');
  const [EmailAnswer, setEmailAnswer] = useState('');


  const inputRef = useRef(null);


  useEffect(() => {
    if (PW !== undefined &&
      Chk_PW !== undefined &&
      PW === Chk_PW) {
      setErrMsg('필수 정보입니다.')
    }
    else {
      setErrMsg('비밀번호가 일치하지 않습니다.');
    }
  }, [PW, Chk_PW])

  //아이디
  useEffect(() => {
    var regExp = /^[a-z]+[a-z0-9]{5,19}$/g;
    if (ID === '') {
      setIdMsg('필수 정보입니다.');
      setIdOK(true);
    }
    else if (!regExp.test(ID)) {
      setIdMsg('영문자로 시작하는 영문자 또는 숫자 6~20자여야 합니다.');
      setIdOK(true);
    }
    else {
      setIdOK(false);
    }
  }, [ID]);

  //비밀번호
  useEffect(() => {
    var regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    if (PW === '') {
      setPWMsg('필수 정보입니다.');
      setPWOK(true);
    }
    else if (!regExp.test(PW)) {
      setPWMsg('8~16의 영문, 숫자, 특수 문자가 최소 한 자씩 포함되어야 합니다.');
      setPWOK(true);
    }
    else {
      setPWOK(false);
    }
  }, [PW]);

  //비밀번호 확인
  useEffect(() => {
    if (Chk_PW === '') {
      setChkMsg('필수 정보입니다.');
      setChkOK(true);
    }
    else if (PW !== Chk_PW) {
      setChkMsg('비밀번호가 일치하지 않습니다.');
      setChkOK(true);
    }
    else {
      setChkOK(false);
    }
  }, [Chk_PW]);

   //이름
  useEffect(() => {
    if (Name === '') {
      setNameMsg('필수 정보입니다.');
      setNameOK(true);
    }
    else {
      setNameOK(false);
    }
  }, [Name]);

   //이름
  useEffect(() => {
    if (Sex === '') {
      setSexMsg('필수 정보입니다.');
      setSexOK(true);
    }
    else {
      setSexOK(false);
    }
  }, [Sex]);

  //닉네임
  useEffect(() => {
    var regExp = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/;
    if (Nickname === '') {
      setNicknameMsg('필수 정보입니다.');
      setNicknameOK(true);
    }
    else if (!regExp.test(Nickname)) {
      setNicknameMsg('2~10자의 한글, 영문, 숫자만 가능합니다.');
      setNicknameOK(true);
    }
    else {
      setNicknameOK(false);
    }
  }, [Nickname]);

  //전화번호
  useEffect(() => {
    var regExp = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}/;
    if (Mobile === '') {
      setMobileMsg('필수 정보입니다.');
      setMobileOK(true);
    }
    else if (!regExp.test(Mobile)) {
      setMobileMsg("'010-1234-5678'의 형식으로 입력해주세요.");
      setMobileOK(true);
    }
    else {
      setMobileOK(false);
    }
  }, [Mobile]);

  //생년월일
  useEffect(() => {
    if (Birth === '') {
      setBirthMsg('필수 정보입니다.');
      setBirthOK(true);
    }
    else {
      setBirthOK(false);
    }
  }, [Birth]);

  //이메일
  useEffect(() => {
    if (Email === '') {
      setEmailMsg('필수 정보입니다.');
      setEmailOK(true);
    }
    else {
      setEmailOK(false);
    }
  }, [Email]);


  //대학교
  useEffect(() => {
    if (Univ === '') {
      setUnivMsg('필수 정보입니다.');
      setUnivOK(true);
    }
    else if (Univ.search('대학교') === -1) {
      setUnivMsg("'대학교'를 입력해주세요.");
      setUnivOK(true);
    }
    else {
      setUnivOK(false);
    }
  }, [Univ]);


  //회원가입 버튼 누른 후 정보 보냄
  async function postInfo(e) {
    try {
      //제대로 작성되지 않은 정보가 있다면 보내지지 않게 함
      // if (idOK === true || PWOK === true || ChkOK === true || NameOK === true || NicknameOK === true || SexOK === true || MobileOK === true || BirthOK === true || EmailOK === true || UnivOK === true) {
      //   e.preventDefault();
      //   alert('정보를 확인하세요');
      //   return;
      // }
      e.preventDefault();
      const response = await axios
        .post("http://localhost:8080/api/user/join", {
          userId: ID,
          password: PW,
          name: Name,
          nickName: Nickname,
          sex: Sex,
          mobile: Mobile,
          birthday: Birth,
          email: Email + inputRef.current[UnivNum - 1].innerText,
          university: Univ,
          provider: null,
          providerId: null,
        }, {"Content-Type": 'application/json'});
      alert("회원가입 성공!");
      console.log(response);
      navigate('/login');
        
    } catch (error) {
      console.log(error);
    }
    alert("끝");
  }
    
  //이메일 인증 코드 일치 확인
  function EmailAuth(e) {
    e.preventDefault();

    if (JSON.stringify(EmailCode) === EmailAnswer) {
      alert("인증 완료되었습니다.");
    }
    else {
      alert("인증 번호가 다릅니다.");
      setEmailCode("");
    }

  }

  //이메일 인증 코드 보내기
  var params = new URLSearchParams();
  
  function EmailBox(e) {
    if (Email === "") {
      alert("이메일을 입력해주세요.");
      return;
    }
    setEmailStyle({ style: "display" });

    Email += inputRef.current[UnivNum - 1].innerText
    console.log(Email);
    params.append('email', Email);
    
    e.preventDefault();
    axios.post('http://localhost:8080/api/email/mailConfirm', params, {
      withCredentials: true,
    })
      .then((response) => {
        setEmailAnswer(JSON.stringify(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  var sendNick = JSON.stringify({
    "Nickname": Nickname,
  })

  //닉네임 중복 확인
  function nickSearch(e) {
    e.preventDefault();
    axios
      .get(`http://localhost:8080/api/user/join/user-id/${Nickname}/dup`)
      .then(response => {
        if (response.data) {
          alert("사용할 수 없는 닉네임입니다. 다시 입력해주세요.");
          setNickname('');
        }
        else {
          alert("사용할 수 있는 닉네임입니다.")
        }

      })
      .catch(function (err) {
        alert('error 발생')
        console.log(err);
      })
    // console.log('닉네임 중복 확인을 완료했습니다.');
  }

  //아이디 중복 확인
  function IDSearch(e) {
    e.preventDefault();
    axios
      .get(`http://localhost:8080/api/user/join/user-id/${ID}/dup`)
      .then(response => {
        if (response.data) {
          alert("사용할 수 없는 아이디입니다. 다시 입력해주세요.");
          setID('');
        }
        else {
          alert("사용할 수 있는 아이디입니다.")
        }
      })
      .catch(function (err) {
        alert('error 발생')
        console.log(err);
      })
    // console.log('아이디 중복 확인을 완료했습니다.');
  }

  
  function univSelect(e) {
    setUnivNum(e.target.id);
    setUniv(e.target.innerText);
  }

  function emailChange(e) {
    setUnivNum(e.target.value);
    // setEmail(Email + inputRef.current[UnivNum - 1].innerText);
    // console.log(Email);
  }

  return (

    <div id="wrapper">
      <Header />

      <div className={styles.form_wrapper}>
        <form action ="/joinForm" method="POST">

          
          <div className={styles.form_content}>
            아이디 <br />
            <div className={styles.id}>
              
              <input
                type="text"
                className={styles.input}
                name="id"
                placeholder="UserId"
                value={ID}
                onChange={(e) => setID(e.target.value)}
              />
              <a
                className={styles.ID_search}
                onClick={IDSearch}
              >아이디 중복 확인</a>
              <br />
            </div>
            <div
              className={styles.empty_err}
              style={{visibility: idOK ? 'visible' : 'hidden'}}
            >{idMsg}</div>
          </div>

          <div className={styles.form_content}>
            <div className="pw">
              비밀번호 <br />
              <input
                type="password"
                className={styles.input}
                name="password"
                placeholder="Password"
                value={PW}
                onChange={(e) => setPW(e.target.value)}
              /><br />
            </div>
            <div
              className={styles.empty_err}
              style={{visibility: PWOK ? 'visible' : 'hidden'}}
            >{PWMsg}</div>
          </div>

          <div className={styles.form_content}>
            <div className="chk_pw">
              비밀번호 확인<br />
              <input
                type="password"
                className={styles.input}
                name="password"
                placeholder="Password"
                value={Chk_PW}
                onChange={(e) => setChk_PW(e.target.value)}
              /><br />
            </div>
            <div
              className={styles.empty_err}
              style={{visibility: ChkOK ? 'visible' : 'hidden'}}
            >{ChkMsg}</div>
          </div>

          <div className={styles.form_content}>
            <div className="name">
              이름 <br />
              <input
                type="text"
                className={styles.input}
                name="name"
                placeholder="Username"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              /><br />
            </div>
            <div
              className={styles.empty_err}
              style={{visibility: NameOK ? 'visible' : 'hidden'}}
            >{NameMsg}</div>
          </div>

          <div className={styles.form_content}>
            <div className={styles.sex}>
          
              <div className={styles.male}>
                <input
                  type="radio"
                  id='male'
                  name="sex"
                  value="male"
                  onChange={(e) => setSex('male')}
                />
                <label className={styles.label} htmlFor="male">남자</label><br />
              </div>
          
              <div className={styles.female}>
                <input
                  type="radio"
                  id='female'
                  name="sex"
                  value="female"
                  onChange={(e) => setSex('female')}
                />
                <label className={styles.label} htmlFor="female">여자</label><br />
              </div>
              
            </div>
            <div
              className={styles.sex_err}
              style={{visibility: SexOK ? 'visible' : 'hidden'}}
            >{SexMsg}</div>
          </div>

          <div className={styles.form_content}>
            닉네임 <br />
            <div className={styles.nickName}>
              
              <input
                type="text"
                className={styles.input}
                name="nickName"
                placeholder="UserNickName"
                value={Nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <a
                className={styles.nickname_search}
                onClick={nickSearch}
              >닉네임 중복 확인</a>
              <br />
            </div>
            <div
              className={styles.empty_err}
              style={{visibility: NicknameOK ? 'visible' : 'hidden'}}
            >{NicknameMsg }</div>
          </div>

          

          <div className={styles.form_content}>
            <div className="mobile">
              핸드폰 번호 <br />
              <input
                type="tel"
                className={styles.input}
                name="mobile"
                placeholder="Phone-Number"
                value={Mobile}
                onChange={(e) => setMobile(e.target.value)}
              /><br />
            </div>
            <div
              className={styles.empty_err}
              style={{visibility: MobileOK ? 'visible' : 'hidden'}}
            >{ MobileMsg}</div>
          </div>

          <div className={styles.form_content}>
            <div className="birth">
              생년월일<br />
              <input
                type="date"
                className={styles.input}
                name="birthday"
                value={Birth}
                onChange={(e) => setBirth(e.target.value)}
              /><br />
            </div>
            <div
              className={styles.empty_err}
              style={{visibility: BirthOK ? 'visible' : 'hidden'}}
            >{BirthMsg }</div>
          </div>

          <div className={styles.form_content}>
            이메일 <br/>
            <div className={styles.email}>
              <input
                type="text"
                className={styles.input}
                name="email"
                placeholder="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <select
                className={styles.emailSelect}
                defaultValue={UnivNum}
                onChange={emailChange}
                ref={inputRef}
              >
                <option className="emailOp" value="1" onClick={(e) => setUnivNum(e.target.value)}>@dankook.ac.kr</option>
                <option className="emailOp" value="2" onClick={(e) => setUnivNum(e.target.value)}>@catholic.ac.kr</option>
                <option className="emailOp" value="3" onClick={(e) => setUnivNum(e.target.value)}>@gachon.ac.kr</option>
                <option className="emailOp" value="4" onClick={(e) => setUnivNum(e.target.value)}>@snu.ac.kr</option>
              </select>

              <a
                className={styles.nickname_search}
                onClick={EmailBox}
              >이메일 인증</a>
              <br />
            </div>
            <div
              className={styles.empty_err}
              style={{visibility: EmailOK ? 'visible' : 'hidden'}}
            >필수 정보입니다.</div>
          </div>

          <div style={EmailStyle}>
            <input
              value={EmailCode}
              className={styles.emailAuth_input}
              onChange={(e) => setEmailCode(e.target.value)}
            />
            <button
              className={styles.email_auth}
              onClick={EmailAuth}
            >인증</button>
          </div>

          <div className={styles.form_content}>
            <div className="univ_wrapper">
            대학교 <br/>
              <div className={styles.univ}>
                <input
                  type="text"
                  className={styles.input}
                  id="univ_out"
                  name="university"
                  placeholder="Ex) 단국대학교"
                  value={Univ}
                  onChange={(e) => setUniv(e.target.value)}
                /><br />
                <a
                  className={styles.univ_search}
                  onClick={
                    e => setStyle({ display: 'block' })}
                >대학교 찾기</a>
            </div>
              <div
                className={styles.empty_err}
                style={{visibility: UnivOK ? 'visible' : 'hidden'}}
              >{ UnivMsg}</div>
            </div>
          </div>

          <div id="pop_info" className={styles.pop_wrap} style={style}>
            <div className={styles.pop_inner}>
              
              <ul className={styles.list_wrapper}>
                <li className={styles.univ_list}><a className={styles.univ_content} id="1" onClick={univSelect}>단국대학교</a></li>
                <li className={styles.univ_list}><a className={styles.univ_content} id="2" onClick={univSelect}>가톨릭대학교</a></li>
                <li className={styles.univ_list}><a className={styles.univ_content} id="3" onClick={univSelect}>가천대학교</a></li>
                <li className={styles.univ_list}><a className={styles.univ_content} id="4" onClick={univSelect}>서울대학교</a></li>
              </ul>
              
              <button
                type="button"
                className={styles.btn_close}
                onClick={e => {
                setStyle({display: 'none'})
              }}>닫기</button>
            </div>
          </div>


          <button
            className={styles.joinbtn}
            type="submit"
            formMethod="post"
            onClick={postInfo}
          >회원가입</button>
        </form>
        </div>
    </div>
  )
}
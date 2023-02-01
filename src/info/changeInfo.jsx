import React, { useState, useEffect} from 'react'
import axios from 'axios';
import Header from '../components/headerForm';
import modules from './userInfo.module.css';

import styles from './changeInfo.module.css';


axios.defaults.withCredentials = true;

export default function ChangeInfo() {
  const [id, setId] = useState(window.localStorage.getItem('userId'));
  const [pw, setPw] = useState(window.localStorage.getItem('password'));
  const [name, setName] = useState(window.localStorage.getItem('name'));
  const [sex, setSex] = useState(window.localStorage.getItem('sex'));
  const [nickname, setNickname] = useState(window.localStorage.getItem('nickName'));
  const [mobile, setMobile] = useState(window.localStorage.getItem('mobile'));
  const [birth, setBirth] = useState(window.localStorage.getItem('birthday'));
  const [univ, setUniv] = useState(window.localStorage.getItem('university'));


  var idx = window.localStorage.getItem('email').indexOf('@');
  var emailTmp = window.localStorage.getItem('email').substring(0, idx);
  var emailDomainTmp = window.localStorage.getItem('email').substring(idx);

  const [email, setEmail] = useState(emailTmp);
  const [emailDomain, setEmailDomain] = useState(emailDomainTmp);

  const [emailCode, setEmailCode] = useState('');
  const [answerCode, setAnswerCode] = useState('');

  const [auth, setAuth] = useState(true);

  const [style, setStyle] = useState({ display: 'none' })
  const [styleCode, setStyleCode] = useState({ display: 'none' });



  //닉네임 마스킹 처리
  useEffect(() => {
    if (name.length == 2) {
      setName(name[0] + '*');
    }
    else {
      var tmp = name[0]
      for (var i = 0; i < name.length - 2; i++){
        tmp += '*';
      }
      tmp += name[name.length - 1];
      setName(tmp);
    }
  }, [name]);

  //아이디 마스킹 처리
  useEffect(() => {
    var tmp = id.substring(0, 3);
    for (var i = 0; i < id.length - 3; i++) {
      tmp += '*';
    }
    setId(tmp);
  }, [id]);
  
  //전화번호 마스킹 처리
  useEffect(() => {
    var tmp1 = mobile.substring(0, 6);
    var tmp2 = mobile.substring(8, 11);
    tmp1 += '**' + tmp2 + '**';
    setMobile(tmp1);
  }, [mobile]);

  async function modifyInfo(e) {
    e.preventDefault();
    const response = await axios
      .put('http://localhost:8080/api/user/modifyUserInfo', {
      userId: id,
      password: pw,
      name: name,
      nickName: nickname,
      sex: sex,
      mobile: mobile,
      birthday: birth,
      email: email + emailDomain,
      university: univ,
      provider: null,
      providerId: null,
      }, { "Content-Type": 'application/json' })
    alert('변경 되었습니다.');
    console.log(response);
    window.localStorage.setItem('nickName', nickname);
    window.localStorage.setItem('mobile', mobile);
    window.localStorage.setItem('email', email + emailDomain);
    window.localStorage.setItem('university', univ);
  }

  //이메일 변경 시 이메일 인증

  var params = new URLSearchParams();

  async function changeEmail(e) {
    try {
      e.preventDefault();


      setStyleCode({ display: 'block' });
      alert('변경된 이메일로 이메일 인증 코드가 발급되었습니다. 메일함을 확인해주세요.');

      var emailTmp = email + emailDomain;
      console.log(emailTmp);
      params.append('email', emailTmp);
      const response = await axios
        .post('http://localhost:8080/api/email/mailConfirm', params, {
          withCredentials: true,
        })
      console.log(response);
      setAnswerCode(response.data);
    }
    catch(err) {
        console.log(err);
    }
  }

  const univArray = ['@dankook.ac.kr', '@catholic.ac.kr', '@gachon.ac.kr', '@snu.ac.kr'];

  function changeUniv(e) {
    e.preventDefault();
    setUniv(e.target.innerText);
    console.log(e.target.id);
    setEmailDomain(univArray[e.target.id - 1]);

    alert('이메일 인증을 진행해주세요.');
  }

  async function confirmEmailCode(e) {
    e.preventDefault();
    if (answerCode == emailCode) {
      setAnswerCode('');

      modifyInfo(e);
      window.localStorage.setItem('email', email + emailDomain);
      window.localStorage.setItem('university', univ);

      setStyleCode({ display: 'none' });
      
    }
    else {
      alert('비밀번호가 틀렸습니다. 다시 확인해주세요.');
    }
  }

  return (
    <div>
      <Header />

      <div className={modules.main_wrapper}>
        <table>
          {/* <colgroup className={modules.colgroup}></colgroup> */}

          <tbody>
            <tr className={modules.tr}>
              <th>
                <span>아이디</span>
              </th>

              <td>
                <input
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  disabled
                />
              </td>
            </tr>
            
            <tr className={modules.tr}>
              <th>
                <span>이름</span>
              </th>

              <td>
                <input
                  value={name}
                  // onChange={(e) => setName(e.target.value)}
                  disabled
                />
              </td>
            </tr>

            <tr className={modules.tr}>
              <th>
                <span>성별</span>
              </th>

              <td>
                <input
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                  disabled
                />
              </td>
            </tr>

            <tr className={modules.tr}>
              <th>
                <span>닉네임</span>
              </th>

              <td>
                <input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
                <button
                  onClick={modifyInfo}
                >변경</button>
              </td>
            </tr>

            <tr className={modules.tr}>
              <th>
                <span>핸드폰 번호</span>
              </th>

              <td>
                <input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  disabled
                />
                
              </td>
            </tr>

            <tr className={modules.tr}>
              <th>
                <span>생년월일</span>
              </th>

              <td>
                <input
                  value={birth}
                  onChange={(e) => setBirth(e.target.value)}
                  disabled
                />
              </td>
            </tr>

            <tr className={modules.tr}>
              <th>
                <span>이메일</span>
              </th>

              <td>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  value={emailDomain}
                  
                  disabled
                />
                <button
                  onClick={changeEmail}
                >인증</button>

                <div style={styleCode}>
                  인증코드를 입력하세요.
                  <input
                    type='text'
                    onChange={(e) => setEmailCode(e.target.value)}
                  />
                  <button
                    value={emailCode}
                    
                    onClick={confirmEmailCode}
                  >확인</button>
                </div>
              </td>
            </tr>

            <tr className={modules.tr}>
              <th>
                <span>대학교</span>
              </th>

              <td>
                <input
                  value={univ || ""}
                  onChange={(e) => setUniv(e.target.value)}
                />
                <button
                  onClick={
                    e => setStyle({ display: 'block' })}
                >변경</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div id="pop_info" className={styles.pop_wrap} style={style}>
            <div className={styles.pop_inner}>
              
              <ul className={styles.list_wrapper}>
                <li className={styles.univ_list}><a className={styles.univ_content} id="1" onClick={changeUniv}>단국대학교</a></li>
                <li className={styles.univ_list}><a className={styles.univ_content} id="2" onClick={changeUniv}>가톨릭대학교</a></li>
                <li className={styles.univ_list}><a className={styles.univ_content} id="3" onClick={changeUniv}>가천대학교</a></li>
                <li className={styles.univ_list}><a className={styles.univ_content} id="4" onClick={changeUniv}>서울대학교</a></li>
              </ul>
            
              <button
                type="button"
                className={styles.btn_close}
                onClick={e => {
                setStyle({display: 'none'})
              }}>닫기</button>
            </div>
          </div>
      </div>
    </div>
  );
}
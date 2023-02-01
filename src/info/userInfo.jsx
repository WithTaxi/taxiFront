import React, { useState, useEffect, useRef} from 'react'
import axios from 'axios';
import Header from '../components/headerForm';
import modules from './userInfo.module.css';


import { Link, useNavigate } from "react-router-dom";
import { MODULEDECLARATION_TYPES } from '@babel/types';

axios.defaults.withCredentials = true;

export default function userInfo() {

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
                  value={window.localStorage.getItem('userId')}
                />
              </td>
            </tr>
            
            <tr className={modules.tr}>
              <th>
                <span>비밀번호</span>
              </th>

              <td>
                <input
                  value={window.localStorage.getItem('password')}
                />
              </td>
            </tr>

            <tr className={modules.tr}>
              <th>
                <span>이름</span>
              </th>

              <td>
                <input
                  value={window.localStorage.getItem('name')}
                />
              </td>
            </tr>

            <tr className={modules.tr}>
              <th>
                <span>성별</span>
              </th>

              <td>
                <input
                  value={window.localStorage.getItem('sex')}
                />
              </td>
            </tr>

            <tr className={modules.tr}>
              <th>
                <span>닉네임</span>
              </th>

              <td>
                <input
                  value={window.localStorage.getItem('nickName')}
                />
                <button>변경</button>
              </td>
            </tr>

            <tr className={modules.tr}>
              <th>
                <span>핸드폰 번호</span>
              </th>

              <td>
                <input
                  value={window.localStorage.getItem('mobile')}
                />
                <button>변경</button>
              </td>
            </tr>

            <tr className={modules.tr}>
              <th>
                <span>생년월일</span>
              </th>

              <td>
                <input
                  value={window.localStorage.getItem('birthday')}
                />
              </td>
            </tr>

            <tr className={modules.tr}>
              <th>
                <span>이메일</span>
              </th>

              <td>
                <input
                  value={window.localStorage.getItem('email')}
                />
                <button>변경</button>
              </td>
            </tr>

            <tr className={modules.tr}>
              <th>
                <span>대학교</span>
              </th>

              <td>
                <input
                  value={window.localStorage.getItem('university')}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
        
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaxiRoom from './TaxiRoom';
import TaxiRoomDetail from './TaxiRoomDetail'
import Login from "../login/Login";
import Join from "../join/Join";
import Find from "../find/selectFind";
import FindId from "../find/FindId";
import FindPw from "../find/FindPw";
import Info from "../info/userInfo"

import Taxi from './Taxi';
import axios from 'axios';



function App() {
  const [logged, setLogged] = useState(false);
  const [id, setId] = useState("");
  //  const [userInfo, setUserInfo] = useState({});
  var userInfo = [];


  // if (logged) {
  //   console.log("로그인 된 상태입니다.");
  //   getInfo();
  // }
  // else {
  //   console.log("로그인이 되지 않은 상태입니다.");
  // }

  // useEffect(() => {
  //   console.log(logged);
  // }, [logged])

  // useEffect(() => {
  //   setLogged(true);
  //   setId(window.localStorage.getItem("username"))
  //   console.log("!");
  // }, [window.localStorage.getItem("username")])

  useEffect(() => {
    if (window.localStorage.getItem("userId") === null) {
      console.log("로그인이 되지 않은 상태입니다.");
    }
    else {
      setLogged(true);
      setId(window.localStorage.getItem("userId"))
      console.log("로그인 된 상태입니다.");
      //getInfo();
    }
  })



  async function getInfo() {
    //e.preventDefault();

    const response = await axios
      .get('http://localhost:8080/api/user/info')
    console.log(response);
    if (response.status == 200) {
      console.log(response.data);
      userInfo.push(response.data["nickName"]);
      userInfo.push(response.data["university"]);
      userInfo.push(response.data["userId"]);
    }
    else {
      throw new Error('err 발생')
    }
  }

  const parentFunction = (nick, univ, id) => {
    userInfo.push(nick, univ, id)
    console.log(nick, univ, id);
  }

  return (
    <Routes>
      <Route path='/' element={<TaxiRoom />} />
      <Route path='/TaxiRoomDetail/:name' element={<TaxiRoomDetail />}></Route>
      <Route
        path="/login"
        element={<Login parentFunction={parentFunction} />}
      ></Route>
      <Route path='/join' element={<Join />}></Route>
      <Route path='/find' element={<Find />}></Route>
      <Route path='/findId' element={<FindId />}></Route>
      <Route path='/findPw' element={<FindPw />}></Route>
      <Route path='/info' element={<Info />}></Route>
    </Routes>
  )
}

export default App;
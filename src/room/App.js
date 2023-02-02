import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import TaxiRoom from './TaxiRoom';
import TaxiRoomDetail from './TaxiRoomDetail'
import Login from "../login/Login";
import Join from "../join/Join";
import Find from "../find/selectFind";
import FindId from "../find/FindId";
import FindPw from "../find/FindPw";
import Info from "../info/userInfo"
import ChangeInfo from '../info/changeInfo';
import ChangePw from '../info/changePw';
import ConfirmPw1 from '../info/confirmPw1';
import ConfirmPw2 from '../info/confirmPw2';


// import Taxi from './Taxi';
// import axios from 'axios';



function App() {
  const navigate = useNavigate();
  // const [logged, setLogged] = useState(false);
  const [id, setId] = useState("");
  var userInfo = [];


  useEffect(() => {
    if (window.localStorage.getItem("userId") === null) {
      console.log("로그인이 되지 않은 상태입니다.");
    }
    else {
      setId(window.localStorage.getItem("userId"))
      console.log("로그인 된 상태입니다.");
    }
  }, [window.localStorage.getItem('userId')])


  const parentFunction = (nick, univ, id) => {
    userInfo.push(nick, univ, id)
    console.log(nick, univ, id);
  }

  return (
    <Routes>
      <Route 
        path='/' 
        element={<TaxiRoom/>} 
      />
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
      <Route path='/chnInfo' element={<ChangeInfo />}></Route>
      <Route path='/chnPw' element={<ChangePw />}></Route>
      
      <Route path='/confirmPw1' element={<ConfirmPw1 />}></Route>
      <Route path='/confirmPw2' element={<ConfirmPw2 />}></Route>
    </Routes>
  )
}

export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter,Routes,Route,Link,useParams } from 'react-router-dom';
import TaxiRoom from './room/TaxiRoom';
import TaxiRoomDetail from './room/TaxiRoomDetail'

function App() {
  const parmas = useParams()
  return (
    <Routes>
      <Route path='/' element={<TaxiRoom />}></Route>
      <Route path='/TaxiRoomDetail/:name' element={<TaxiRoomDetail />}></Route>
    </Routes>
  )
}

export default App;

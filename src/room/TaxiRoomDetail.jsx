import axios from "axios";
import { useState,useEffect,useRef,useCallback,React,useMemo } from "react";
import { useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import SockJS from 'sockjs-client'
import Stomp from "stompjs";
import styles from './TaxiRoomDetail.module.css'
import IsLogin from '../utils/isLogin';
import protobuf from 'protobufjs';
import pako from 'pako'
import { debounce } from "lodash";

function TaxiRoomDetail({}){
    const[message,setMessage]=useState('')
    const[roomId,setRoomId]=useState('')
    const[sender,setSender]=useState('')
    const[room,setRoom]=useState(' ')
    let [messageList,setMessageList]=useState([{
    }]);
    const[userList,setUserList]=useState([{}])

    const no = useRef(1)
    const focusRef = useRef();
    
    
    const onChange = debounce((e) => {
        e.persist()
        console.log(e.target.value);
        setMessage(e.target.value)
      }, 400);

    const inputRef = useRef(null);
    const sendMessage=(e)=>{
        ws.send("/app/chat/message",{},(JSON.stringify({type:'T',message:message,roomId:roomId,sender:sender})))
        setMessage('')

    }
   
    const get=()=>{
        axios.get("http://localhost:8080/chat/rooms/"+roomId, { headers: { Authorization: `${window.localStorage.getItem('grantType')} ${window.localStorage.getItem('accessToken')}` } })
            .then((response)=>{
                setRoom(response.data.roomName)
                console.log(room)
            })
        .catch((error) => {
        if (error.response.data == '만료된 토큰') {
          console.log(typeof error.response.data);
          const tokenData = {
            "accessToken": window.localStorage.getItem('accessToken'),
            "refreshToken": window.localStorage.getItem('refreshToken')
          }
          axios
            .post(`http://localhost:8080/api/user/reissue`, tokenData)
            .then(response => {
              console.log(response);
              window.localStorage.setItem("accessToken", response.data.accessToken);
              window.localStorage.setItem("accessTokenExpireData", response.data.accessTokenExpireData);
              window.localStorage.setItem("grantType", response.data.grantType);
              window.localStorage.setItem("refreshToken", response.data.refreshToken);
              againPost();
              return;
            })
            .catch(function (err) {
              if (err.response.data == '유효하지 않은 토큰입니다') {
                alert('로그인을 다시 진행해주세요.');
                navigate('/login');
                window.localStorage.clear();
                console.log(err);
                return;
              }
              console.log(err);
            })
          console.log(error);
        }
    })
    }

    const againPost = () => {
        axios.get("http://localhost:8080/chat/rooms/" + roomId, { headers: { Authorization: `${window.localStorage.getItem('grantType')} ${window.localStorage.getItem('accessToken')}` } })
            .then((response) => {
                setRoom(response.data.roomName)
                console.log(room)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    

    const created=()=>{
        setRoomId(localStorage.getItem('roomId'));
        setSender(localStorage.getItem('sender'));
    }

    

    const recvMessage=(recv)=>{
        setMessageList((prev)=>{
                return[
                    {
                        id:no.current++,
                        inMessage:recv.message,
                        sender:recv.sender
                    },
                    ...prev
                ]
            }
               
        )
    }

    
   
    
 
    let navigate = useNavigate();
    const sock = new SockJS("http://localhost:8080/ws/chat");
    let ws = Stomp.over(sock);
    var reconnect=0
    

    const connect=()=>{
        ws.connect({},()=>{
                ws.subscribe("/topic/chat/room/"+roomId,(response)=>{
                    const recv = JSON.parse(response.body);
                    recvMessage(recv);
                    console.log(recv)
                    
                });
                ws.send("/app/chat/message", {}, JSON.stringify({type:'ENTER', roomId:roomId, sender:sender}));     
        }, function(error) {
            if(reconnect++ <= 5) {
                setTimeout(function() {
                    console.log("connection reconnect");
                    sock = new SockJS("/ws/chat");
                    ws = Stomp.over(sock);
                    connect();
                },10*1000);
            }
        });
        
    }
   

    useEffect(()=>{
        
        connect()
        created()
        get()
    },[sender])



    

    const onKeyPress =(e)=>{
        if(e.key=="Enter"){
            sendMessage(e)
            focusRef.current.blur(); 
            e.target.value=''
        }
    }

    useEffect(() => {
        if (!IsLogin()) {
            navigate('/login');
        }
    }, [IsLogin()]);
    

    return(
            <div id={styles.wrapper}>
                <div id={styles.left}>
                    <div id={styles.input_group}>
                        <label id={styles.label}>방제목</label>
                        
                        <input id={styles.inputText} type="text" placeholder="전송하려면 ENTER를 누르세요" onChange={e => onChange(e)} onKeyDown={e=>onKeyPress(e)} ref={focusRef}></input>

                    </div>  
                    
                    <div id={styles.contentWrapper}>
                        <ul id={styles.input} className="list-group">
                            {messageList.map((item,idx)=>{return item.id!=null?(item.inMessage==' 님이 입장하셨습니다'?null:<li id={styles.listWrap} className="list-group-item"  key={item.id}>{item.sender}-{item.inMessage}</li>):null})}                
                        </ul>
                    </div>
                </div>   
                
                <div id={styles.right}>
                    <div id={styles.userList}>
                        
                    </div>

                    <button id={styles.out} className="btn btn-info btn-sm" onClick={() => navigate(-1) } >채팅방 나가기</button>
                </div>
            </div>
                
                
       
        
    )
}

export default TaxiRoomDetail;
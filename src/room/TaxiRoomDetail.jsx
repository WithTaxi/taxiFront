import axios from "axios";
import { useState,useEffect,useRef } from "react";
import { useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import SockJS from 'sockjs-client'
import Stomp from "stompjs";
import styles from './TaxiRoomDetail.module.css'
import IsLogin from '../utils/isLogin';


function TaxiRoomDetail(props){
    const[message,setMessage]=useState('')
    const[roomId,setRoomId]=useState('')
    const[sender,setSender]=useState('')
    const[room,setRoom]=useState(' ')
    let [messageList,setMessageList]=useState([{
    }]);
    const[userList,setUserList]=useState([{}])

    const no = useRef(1)
    const focusRef = useRef();

    const onChange = (e)=>setMessage(e.target.value);

    

    const sendMessage=()=>{
        ws.send("/app/chat/message",{},JSON.stringify({type:'TALK',message:message,roomId:roomId,sender:sender}))
        setMessage('')
    }

    const get=()=>{
        axios.get("http://localhost:8080/chat/rooms/"+roomId)
            .then((response)=>{
                setRoom(response.data.roomName)
                console.log(room)
            })
    }

    

    const created=()=>{
        setRoomId(localStorage.getItem('roomId'));
        setSender(localStorage.getItem('sender'));
        connect()
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
    let sock = new SockJS("http://localhost:8080/ws/chat");
    let ws = Stomp.over(sock);

    const connect=()=>{
        ws.connect({},()=>{
            ws.subscribe("/topic/chat/room/"+roomId,(response)=>{
                const recv = JSON.parse(response.body);
                recvMessage(recv);
                console.log(recv)
            });
            ws.send("/app/chat/message", {}, JSON.stringify({type:'ENTER', roomId:roomId, sender:sender}));    
        }) 
    }
   
    useEffect(()=>{
        created()
        get()
        focusRef.current.focus();
    },[sender])

    

    const onKeyPress =(e)=>{
        if(e.key=="Enter"){
            sendMessage()
        }
    }

    
    

    return(
        <>
            <div className="container">
                <div id={styles.input} className="input-group">
                    <div className="input-group-prepend">
                        <label className="input-group-text">내용</label>
                    </div>
                    <input type="text" className="form-control" value={message} onChange={onChange} onKeyDown={onKeyPress} ref={focusRef}/>
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button" onClick={sendMessage}>보내기</button>
                    </div>
                </div>
                <ul id={styles.input} className="list-group">
                    {messageList.map((item,idx)=>{return item.id!=null?(item.inMessage==' 님이 입장하셨습니다'?null:<li className="list-group-item"  key={item.key}>{item.sender}-{item.inMessage}</li>):null})}                
                </ul>

                <button id={styles.out} className="btn btn-info btn-sm" onClick={() => navigate(-1) } >채팅방 나가기</button>
            </div>
           
        </>
        
    )
}

export default TaxiRoomDetail;
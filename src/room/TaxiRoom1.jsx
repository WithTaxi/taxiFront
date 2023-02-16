import React,{useState,useRef,useEffect} from "react";
import styles from './TaxiRoom.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios"
import { Link, useNavigate} from "react-router-dom";
import { clear } from '@testing-library/user-event/dist/clear';
import IsLogin from '../utils/isLogin';

function TaxiRoom() {
    const navigate = useNavigate();
    const [roomName,setRoomName]=useState("");
    const [list, setList] = useState([]);
    const [userId, setUserId] = useState(window.localStorage.getItem("userId"));
    const [univ, setUniv] = useState(window.localStorage.getItem("university"));
    const [nick, setNick] = useState(window.localStorage.getItem("nickName"));
    let [ItemList,setItemList]=useState([{
        id:0
    }]);
    const no = useRef(1)
    const [state, updateState] = React.useState();

    const forceUpdate = React.useCallback(() => updateState({}), []);
    



    const login = () => {
        navigate('/login');
    }
    const logout = () => {
        window.localStorage.clear();
        setUniv("");
        setNick("");
        navigate('/login')
    }

    const clickInfo = (e) => {
        navigate('/info')
    }

    const AddList=()=>{
        if(roomName===""){
            return null
        }
        else{
            setItemList((prev)=>{
                console.log(ItemList.length)
                return[
                    {   
                        id : no.current++,
                        roomName:roomName,
                    },
                    ...prev,
                ]
            });
        }
    }
    
    const onChange = (e)=>setRoomName(e.target.value);
    const onKeyPress =(e)=>{
        if(e.key=="Enter"){
            createRoom()
        }
    }

    useEffect(()=>{
        findAllroom()
    },[])
      
    const findAllroom=()=>{
        axios.get('http://localhost:8080/chat/rooms')
        .then((response) => { 
            setList(response.data); 
            console.log(response.data)
        })
        .catch(
            (response)=>{
                console.log("실패")
            }
        )
    }


    const createRoom=(e)=>{
        if(roomName===""){
            alert("방 제목을 입력해주세요")
        }
        else{
            var params = new URLSearchParams();
            params.append("name",roomName);
            axios.post("http://localhost:8080"+'/chat/room', params)
            .then((response)=>{
                alert(response.data.roomName+"방 개설에 성공하였습니다.")
                setRoomName("")
                findAllroom()
            })
            .catch(
                (response)=>{
                    console.log(response)
                    alert("채팅방 개설에 실패하였습니다.");
                }
            )
        }
    }

    
    const enterRoom=(e)=>{
        localStorage.setItem('roomId',e.roomId);
        localStorage.setItem('sender',nick);
        if(e.userCount<=4){
            document.location.href="/TaxiRoomDetail/"+e.roomName
        }
        
    }

    const deleteRoom=(e)=>{
        console.log(e.roomId)
        if(e.host_id==userId){
            axios.get("http://localhost:8080/chat/room/delete/"+e.roomId)
            window.location.reload();
        }
        
    }

    useEffect(() => {
        if (!IsLogin()) {
            navigate('/login');
        }
    }, [IsLogin()]);

        return (
            <>
            
                <div id={styles.ti}>
                    <img id={styles.taxiImage} src="Taxi.jpg"></img>
                    <h2>택시합승</h2>
                </div>
                <div id={styles.wrap}>
                    <div id={styles.inform}>

                        {IsLogin()
                            ?
                            <div id={styles.my}>
                                <img id={styles.profile} src="bus.png"></img>
                                <h5 id={styles.nick}>{nick}</h5>
                                <h5 id={styles.college}>{univ}</h5>
                                <button
                                    id={styles.button1}
                                    onClick={clickInfo}
                                >내정보</button>
                                <button
                                    id={styles.button2}
                                    onClick={logout}
                                >로그아웃</button>
                            </div>
                            :
                            <div id={styles.my}>
                                <button
                                    id={styles.button1}
                                    onClick={login}
                                >로그인</button>
                            </div>}
                        <div id={styles.my2}>
                            <iframe id={styles.advertisement} src="https://forecast.io/embed/#lat=37.5266&lon=127.0403&name=서울&color=&font=&units=si"></iframe>
                        </div>
                    
                    </div>
                    <div id={styles.makeRoom}>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <label className="input-group-text">방제목</label>
                            </div>
                            <input type="text" className="form-control" value={roomName} onChange={onChange} onKeyDown={onKeyPress} />
                            <div >
                                <button className="btn btn-primary" type="button" onClick={() => (createRoom(), AddList())}>채팅방 개설</button>
                            </div>
                        </div>
                        <ul className="list-group">
                            {list.map((item, idx) => { return item.id == 0 ? null : <li  key={item.roomId} className="list-group-item list-group-item-action" id={styles.list}>방 제목 : {item.roomName}({item.userCount}/4)<div id={styles.button}><button id="delete" onClick={() => {enterRoom(item)}}>입장</button><button id="delete" onClick={() => {deleteRoom(item)}}>삭제</button></div></li> })}
                        </ul>
                    </div>
                </div>
            </>
        )
    
}

export default TaxiRoom;
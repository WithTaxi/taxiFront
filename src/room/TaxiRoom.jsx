import React,{useState,useRef,useEffect} from "react";
import styles from './TaxiRoom.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios"
import { Link, useNavigate} from "react-router-dom";
import { clear } from '@testing-library/user-event/dist/clear';

function TaxiRoom(props) {
    const navigate = useNavigate();
    const [roomName, setRoomName] = useState("");
    const [logged, setLogged] = useState(props.logged);
    const [list, setList] = useState([]);

    const [univ, setUniv] = useState(window.localStorage.getItem("university"));
    const [nick, setNick] = useState(window.localStorage.getItem("nickName"));
    let [ItemList,setItemList]=useState([{
        id:0
    }]);
    const no = useRef(1)


    useEffect(() => {
        if (window.localStorage.getItem('userId') === null) {
            setLogged(false);
        }
        else {
            setLogged(true);
        }
    }, [window.localStorage.getItem('userId')])

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
        console.log(e)
        var sender = prompt('대화명을 입력해 주세요.');
        if(sender !== "") {
            localStorage.setItem('sender',sender);
            localStorage.setItem('roomId',e.roomId);
            document.location.href="/TaxiRoomDetail/"+e.roomName
        }
        else{
            
        }
    }

    return(
        <>
            
            <div id={styles.ti}>
                <img id={styles.taxiImage} src="Taxi.jpg"></img>
                <h2>택시합승</h2>
            </div>
            <div id={styles.wrap}>
                <div id={styles.inform}>

                    {logged
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
                        </div>
                    }
                </div>
                <div id={styles.makeRoom}>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <label className="input-group-text">방제목</label>
                        </div>
                        <input type="text" className="form-control"  value={roomName} onChange={onChange} onKeyDown={onKeyPress} />
                        <div >
                            <button className="btn btn-primary" type="button" onClick={()=>(createRoom(),AddList())}>채팅방 개설</button>
                        </div>
                    </div>
                    <ul className="list-group">
                        {list.map((item,idx)=>{return item.id==0?null:<li onClick={()=>{enterRoom(item)}} key={item.roomId} className="list-group-item list-group-item-action" id={styles.list}>방 제목 : {item.roomName}<span className="badge badge-info badge-pill"> {item.userCount}</span></li>})} 
                    </ul>
                </div>
            </div>
            <div>
        
      </div>
        </>
    )
}

export default TaxiRoom;
import React,{useState,useRef,useEffect} from "react";
import styles from './TaxiRoom.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios"
import { Link, useNavigate} from "react-router-dom";
import { clear } from '@testing-library/user-event/dist/clear';
import IsLogin from '../utils/isLogin';
import Room from './room'


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
        axios.get('http://localhost:8080/chat/rooms',{ headers: { Authorization: `${window.localStorage.getItem('grantType')} ${window.localStorage.getItem('accessToken')}` } })
        .then((response) => { 
            setList(response.data); 
            console.log(response.data)
        })
        .catch(
            (error) => {
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
                }
            })
    }

    function againPost() {
    axios.get('http://localhost:8080/chat/rooms',{ headers: { Authorization: `${window.localStorage.getItem('grantType')} ${window.localStorage.getItem('accessToken')}` } })
    
      .then((response) => { 
            setList(response.data); 
            console.log(response.data)
        })
      .catch((error) => { 
        console.log(error);
      })
  }


    const createRoom=(e)=>{
        if(roomName===""){
            alert("방 제목을 입력해주세요")
        }
        else{
            var params = new URLSearchParams();
            params.append("name",roomName);
            axios.post("http://localhost:8080"+'/chat/room', params,{ headers: { Authorization: `${window.localStorage.getItem('grantType')} ${window.localStorage.getItem('accessToken')}` } })
            .then((response)=>{
                alert(response.data.roomName+"방 개설에 성공하였습니다.")
                setRoomName("")
                findAllroom()
            })
            .catch(
                (error) => {
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
                }
            }
            )
        }
    }

    const newRoom=()=>{
        document.location.href="/"
    }
    const enterRoom=(e)=>{
        localStorage.setItem('roomId',e.roomName);
        localStorage.setItem('sender',nick);
        console.log(e.userCount)
        if(e.userCount<=4){
            document.location.href="/TaxiRoomDetail/"+e.roomName
        }
        
    }

    const deleteRoom=(e)=>{
        console.log(e.roomId)
        if(e.host_id==userId){
            axios.get("http://localhost:8080/chat/room/delete/"+e.roomId,{ headers: { Authorization: `${window.localStorage.getItem('grantType')} ${window.localStorage.getItem('accessToken')}` } })
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
                    <h2 onClick={newRoom}>Taxi <>Ride Together</></h2>
                    <div id={styles.nav}>
                        <button id={styles.navInform} onClick={clickInfo}>내정보</button>     
                        <button id={styles.navLog} onClick={logout}>로그아웃</button>
                    </div>
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
                        <div id={styles.input_group}>
                            <label id={styles.label}>방제목</label>
                            <input id={styles.inputText} type="text"  value={roomName} onChange={onChange} onKeyDown={onKeyPress} />
                            <button  id={styles.btnPrimary} type="button" onClick={() => (createRoom(), AddList())}>채팅방 개설</button>
                            
                        </div>
                        <div id={styles.app_container}>
                            {
                            list.map((item)=>{
                                return(
                                    <Room
                                        item={item}
                                        enterRoom={enterRoom}
                                        title={item.roomName}
                                        userCount={item.userCount}
                                        deleteRoom={deleteRoom}
                                    />
                                    )
                                })
                            }
                        </div>
                        
                    </div>
                </div>
            </>
        )
    
}

export default TaxiRoom;
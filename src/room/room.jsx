import React,{useState} from "react";
import styles from './TaxiRoom.module.css'

export default function Room({title,userCount,enterRoom,item,deleteRoom}){
    const [univ, setUniv] = useState(window.localStorage.getItem("university"));
    return(
        <div className={styles.room_container} >
            <img className={styles.room_college} src="./taxilogo.jpg" alt="college"></img>
            <div className={styles.room_info}>
                <h4>(방제목)<span>({userCount}/4)</span><br></br>{title}</h4>
                
                
            </div>
            <div className={styles.buttonWrapper}>
                <button className={styles.enter} onClick={()=>{enterRoom(item)}}>입장</button>
                <button className={styles.delete} onClick={()=>{deleteRoom(item)}}>삭제</button>
                    
            </div>
        </div>
    )
}
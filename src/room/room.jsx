import React,{useState} from "react";
import styles from './TaxiRoom.module.css'

export default function Room({title,userCount,enterRoom,item}){
    const [univ, setUniv] = useState(window.localStorage.getItem("university"));
    return(
        <div className={styles.room_container} onClick={()=>{enterRoom(item)}}>
            
            <img className={styles.room_college} src="./gachonCollege.jpg" alt="college"></img>
            <div className={styles.room_info}>
                <h4>(방제목)<br></br>{title}</h4>
                <span>({userCount}/4)</span>
            </div>
        </div>
    )
}
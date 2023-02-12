import React, { useEffect,useRef } from "react";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useHistory} from "react-router-dom";
import { dbService } from "fbase";
import { collection,getDocs,query,where,orderBy } from "firebase/firestore";
import { useState } from "react";
import {authService} from "fbase";

export default ({refreshUser,userObj})=>{
    const [newDisplayName,setNewDisplayName]=useState(userObj.displayName)
    const newUserImg=useRef(userObj.userImg)
    const history=useHistory() //useHistory가 react-router-dom 버전 6에서는 useNavigate로 바뀜 (현재버전 5)
    const auth=getAuth()
    const onLogOutClick=async()=>{
        await signOut(auth)
        history.push("/") //homepage로 리다이렉트
    }
    const onChange=(event)=>{
        const {target:{value}}=event
        setNewDisplayName(value)
    }
    const onSubmit=async(event)=>{
        event.preventDefault()
        if(userObj.displayName!==newDisplayName){
            await updateProfile(authService.currentUser, { displayName: newDisplayName,userImg:newUserImg });
            refreshUser() //이 함수는 appjs에서 정의됨 //바뀐 user이름을 리랜더링 위해 부모컴포넌트(app.js)로 보냄
        }
    }
    // const getMyNweets=async()=>{
    //     const q = query(collection(dbService, "nweets"), where("creatorId", "==", userObj.uid),orderBy("date","desc")) //where,orderby는 sql 쿼리문 생각하면 됨
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //     });
    // }
    // useEffect(()=>{
    //     getMyNweets()
    // },[])
    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input className="formInput" autoFocus onChange={onChange} type="text" placeholder="Display name" value={newDisplayName}/>
                <input className="formBtn" type="submit" value="Update Profile" style={{marginTop: 10,}}/>
            </form>   
            <img src={userObj.userImg}></img>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>Log Out</span>
        </div>
    )
}



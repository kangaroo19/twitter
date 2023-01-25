import React, { useEffect } from "react";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useHistory} from "react-router-dom";
import { dbService } from "fbase";
import { collection,getDocs,query,where,orderBy } from "firebase/firestore";
import { useState } from "react";
export default ({userObj})=>{
    const [newDisplayName,setNewDisplayName]=useState(userObj.displayName)
    const history=useHistory() //useHistory가 react-router-dom 버전 6에서는 useNavigate로 바뀜 (현재버전 5)
    const auth=getAuth()
    const onLogOutClick=()=>{
        signOut(auth)
        history.push("/") //homepage로 리다이렉트
    }
    const onChange=(event)=>{
        const {target:{value}}=event
        setNewDisplayName(value)
    }
    const onSubmit=(event)=>{
        event.preventDefault()
        if(userObj.displayName!==newDisplayName){
            const auth=getAuth()
            updateProfile(auth.currentUser, {
                displayName: newDisplayName,
              }).then(() => {
                console.log(userObj.displayName)
              }).catch((error) => {
                // An error occurred
                // ...
              });
        }
    }
    const getMyNweets=async()=>{
        const q = query(collection(dbService, "nweets"), where("creatorId", "==", userObj.uid),orderBy("date","desc")) //where,orderby는 sql 쿼리문 생각하면 됨
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    }
    useEffect(()=>{
        getMyNweets()
    },[])
    return (
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName}/>
                <input type="submit" value="Update Profile"/>
            </form>   
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}



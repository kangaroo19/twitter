import React, { useEffect } from "react";
import { useState } from "react";
import { collection, addDoc,serverTimestamp,getDocs,query,onSnapshot,doc, QuerySnapshot, orderBy  } from "firebase/firestore";
import { dbService } from "fbase";
import Nweet from "components/Nweet";
export default ({userObj})=>{ //userObj는 유저의 고유한 식별번호
    const [nweet,setNweet]=useState("")
    const [nweets,setNweets]=useState([])
    const [attachment,setAttachment]=useState()
    useEffect(()=>{
        const q=query(collection(dbService,"nweets"),orderBy("date","desc"))
        const un=onSnapshot(q,(snapshot)=>{ //데이터베이스에 변화가 생기면 onSnapshot 실행됨
            const arr=[]
            snapshot.forEach((doc)=>{
                arr.push({
                    id:doc.id, //여기 id는 creatorid와 다름
                    ...doc.data()
                })
            })
            setNweets(arr)
        })
    },[])
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "nweets"), {
              text : nweet,
              date : serverTimestamp(), //이거때문에 두번호출됨
              creatorId : userObj.uid
            }); //위의 객체(nweet)가 Nweet컴포넌트의 nweetObj프롭으로 들어감

          } catch (e) {
            console.error("Error adding document: ", e);
          }
        setNweet("")
    }
    const onChange=(event)=>{
        const {target:{value}}=event
        setNweet(value)
    }
    const onFileChange=(event)=>{
        const {target:{files}}=event
        const theFile=files[0]
        const reader=new FileReader()
        reader.onloadend=(finishedEvent)=>{
            const {currentTarget:{result}}=finishedEvent
            setAttachment(result)
        }
        reader.readAsDataURL(theFile)
    }
    const onClearAttachment=()=>setAttachment(null)
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange}type="text" placeholder="what s on your mind" maxLength={120}/>
                <input type="file" onChange={onFileChange} accept="image/*"/>
                <input type="submit" value="tweet"/>
                {attachment && 
                    <div>
                        <img src={attachment} alt="" width="50px" height="50px"/>
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>}
                
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet 
                        key={nweet.id} 
                        nweetObj={nweet} 
                        isOwner={nweet.creatorId===userObj.uid}/> //nweet를 작성한 아이디값(nweet.creatorid)과 현재 로그인한 사용자의 아이디값(userObj.uid)이 같으면 true
                ))}
            </div>
        </div>
    )
}


//https://firebase.google.com/docs/firestore/quickstart#web-version-9_3
import React, { useEffect } from "react";
import { useState } from "react";
import { collection, addDoc,serverTimestamp,getDocs,query,onSnapshot,doc, QuerySnapshot, orderBy  } from "firebase/firestore";
import { dbService, storageService} from "fbase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Nweet from "components/Nweet";
import {v4 as uuidv4} from "uuid"
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
        const AttachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(AttachmentRef, attachment, "data_url");
        const attachmentUrl=await getDownloadURL(ref(storageService,"123"))
        const nweetObj={
            text : nweet,
            date : Date.now(), //이거때문에 두번호출됨
            creatorId : userObj.uid,
            attachmentUrl
        }
        
        const docRef = await addDoc(collection(dbService, "nweets"),nweetObj); //위의 객체(nweet)가 Nweet컴포넌트의 nweetObj프롭으로 들어감
        setNweet("")
        setAttachment("")
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
        reader.readAsDataURL(theFile) //이미지를 읽어와서 loadend 이벤트 트리거됨 이미지 데이터가 문자열 데이터로 result 속성에 담겨짐
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
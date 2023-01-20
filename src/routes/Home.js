import React, { useEffect } from "react";
import { useState } from "react";
import { collection, addDoc,serverTimestamp,getDocs,query,onSnapshot,doc, QuerySnapshot, orderBy  } from "firebase/firestore";
import { dbService } from "fbase";
export default ({userObj})=>{
    const [nweet,setNweet]=useState("")
    const [nweets,setNweets]=useState([])
    
   
    useEffect(()=>{
        const q=query(collection(dbService,"nweets"),orderBy("date","desc"))
        const un=onSnapshot(q,(snapshot)=>{
            const arr=[]
            console.log(123)
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
            });
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        setNweet("")
    }
    const onChange=(event)=>{
        const {target:{value}}=event
        setNweet(value)
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange}type="text" placeholder="what s on your mind" maxLength={120}/>
                <input type="submit" value="tweet"/>
            </form>
            <div>
                {nweets.map((nweet) => (
                <div key={nweet.id}>
                    <h4>{nweet.text}</h4>
                </div>
                ))}
            </div>
        </div>
    )
}


//https://firebase.google.com/docs/firestore/quickstart#web-version-9_3
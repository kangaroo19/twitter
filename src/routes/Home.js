import React, { useEffect } from "react";
import { useState } from "react";
import { collection, query,onSnapshot, orderBy  } from "firebase/firestore";
import { dbService, storageService} from "fbase";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
export default ({userObj})=>{ //userObj는 유저의 고유한 식별번호
    const [nweets,setNweets]=useState([])
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
    
    return (
        <div className="container" style={{border:'1px solid black',}}>
            <NweetFactory userObj={userObj}/>
            <div style={{ marginTop: 30 }}>
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
import React from "react";
import { useState } from "react";
import { collection, addDoc,serverTimestamp } from "firebase/firestore";
import { dbService } from "fbase";
export default ()=>{
    const [nweet,setNweet]=useState("")
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "nweets"), {
              nweet,
              date:serverTimestamp()
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
        </div>
    )
}


//https://firebase.google.com/docs/firestore/quickstart#web-version-9_3
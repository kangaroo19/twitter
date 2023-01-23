import React from "react";
import {doc,deleteDoc, updateDoc} from 'firebase/firestore'
import { dbService } from "fbase";
import { useState } from "react";
const Nweet=({nweetObj,isOwner})=>{
    const [editing,setEditing]=useState(false) //edit form 토글버튼 위함 true면 edit form 나옴
    const [newNweet,setNewNweet]=useState(nweetObj.text) //nweet의 값 수정가능
    const onDeleteClick=async()=>{
        const ok=window.confirm("Are you sure")
        if(ok){
            await deleteDoc(doc(dbService,"nweets",`${nweetObj.id}`)) //path는 아이디값 (사용자 아이디값 아님)
        }
    }
    const toggleEditing=()=>setEditing((prev)=>!prev) 
    const onSubmit=async(event)=>{
        event.preventDefault()
        await updateDoc(doc(dbService,"nweets",`${nweetObj.id}`),{text:newNweet})
        setEditing(false)
    }
    const onChange=(event)=>{
        const {target:{value}}=event
        setNewNweet(value)
    }
    return (
        <div>
           {
                editing ? (
                    <>
                        <form onSubmit={onSubmit}>
                            <input 
                                type="text" 
                                placeholder="Edit your nweet"
                                value={newNweet} 
                                required
                                onChange={onChange}/>
                            <input type="submit" value="Update Nweet"/>
                        </form>
                        <button onClick={toggleEditing}>Cancel</button>
                    </>
                ) : (
                    <>
                        <h4>{nweetObj.text}</h4>
                        {}
                        {isOwner && ( 
                            <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                            </>
                        )}
                    </>
            )}
        </div>
    )
}

export default Nweet
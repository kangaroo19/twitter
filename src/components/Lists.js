import { useState,useEffect } from "react"
import { dbService } from "fbase";
import { doc,addDoc, collection, setDoc,query,onSnapshot,orderBy, QuerySnapshot } from "firebase/firestore";

function Lists({userObj}){
    const [users,setUsers]=useState([])
    useEffect(()=>{
        const q=query(collection(dbService,"users"))
        const un=onSnapshot(q,(querySnapshot)=>{
        const array=[]
        console.log(userObj.displayName)
        querySnapshot.forEach((doc)=>{
            array.push(doc.data())
            console.log(array)
        })
        setUsers(array)
        
    })
    },[])
    return (
        <>
        <div>유저목록</div>
        {users.map((v)=>(
            <div key={v.uid}>
                {v.userName}
            </div>
        ))}
        </>
    )
}

export default Lists
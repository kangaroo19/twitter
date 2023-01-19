import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useHistory} from "react-router-dom";
export default ()=>{
    const history=useHistory() //useHistory가 react-router-dom 버전 6에서는 useNavigate로 바뀜 (현재버전 5)
    const auth=getAuth()
    const onLogOutClick=()=>{
        signOut(auth)
        history.push("/") //homepage로 리다이렉트
    }
    return (
        <>
           <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}



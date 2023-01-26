import React,{ useState }  from "react";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

const AuthForm=()=>{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [newAccount,setNewAccount]=useState(true) //true일때는 create acc, false 일때는 login
    const [error,setError]=useState("")
    const onChange=(event)=>{
        const {target:{name,value}}=event
        if(name==="email"){
            setEmail(value)
        }
        else if(name==="password"){
            setPassword(value)
        }
    }
    const onSubmit=async(event)=>{ //async함수는 반드시 프로미스 리턴
        event.preventDefault()
        const auth = getAuth()
        try {
            let data
            if(newAccount){ //create acc
                data = await createUserWithEmailAndPassword(auth,email,password)
                setNewAccount(false)

            }
            else{ //log in
                data = await signInWithEmailAndPassword(auth,email,password)
            }
        }
        catch(error){
            setError(error.message)
        }
    }
    const toggleAccount=()=>setNewAccount((prev)=>!prev)
    return (
        <>
            <form action="" onSubmit={onSubmit} className="container">
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Email" 
                    required 
                    value={email}
                    onChange={onChange}
                    className="authInput"/>
                <input 
                    name="password" 
                    type="password" 
                    placeholder="password" 
                    required 
                    value={password}
                    onChange={onChange}
                    className="authInput"/>
                <input className="authInput authSubmit" type="submit" value={newAccount ? "Create Account" : "Log In"}/>
                {error && <span className="authError">{error}</span>}
            </form>
            <span className="authSwitch" onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
        </>
    )
}

export default AuthForm
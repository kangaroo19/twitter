import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

const Auth= ()=>{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [newAccount,setNewAccount]=useState(true) //true일때는 create acc, false 일때는 login
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
                
            }
            else{ //log in
                data = await signInWithEmailAndPassword(auth,email,password)
            }
        }
        catch(error){
            const erroCode=error.code
            const errorMsg=error.message
            alert(erroCode)
        }
    }
    return (
        <div>
            <form action="" onSubmit={onSubmit}>
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Email" 
                    required 
                    value={email}
                    onChange={onChange}/>
                <input 
                    name="password" 
                    type="password" 
                    placeholder="password" 
                    required 
                    value={password}
                    onChange={onChange}/>
                <input type="submit" value={newAccount ? "Create Account" : "Log In"}/>
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    )
}
export default Auth

// https://firebase.google.com/docs/auth/web/password-auth?authuser=1#web-version-9
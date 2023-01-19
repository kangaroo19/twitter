import { getAuth,signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword,signInWithEmailAndPassword, GithubAuthProvider } from "firebase/auth";
import React, { useState } from "react";

const Auth= ()=>{
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
    const onSocialClick=async(event)=>{
        const auth=getAuth()
        const {target:{name}}=event
        let provider
        if(name==="google"){
            provider=new GoogleAuthProvider()
        }else if(name==="github"){
            provider=new GithubAuthProvider()
        }
        const data=await signInWithPopup(auth,provider)
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
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    )
}
export default Auth

// https://firebase.google.com/docs/auth/web/password-auth?authuser=1#web-version-9

//Auth 컴포넌트에서 이메일을 만들고 로그인하던,
//구글로 로그인하던,깃허브로 로그인하던
//로그인 성공하면 user정보가 채워지고
//user값이 변화하는지 지켜보는 app.js컴포넌트의 onAuthStateChanged함수가
//isloggenin값 변화에 따라 다음 컴포넌트 보여줌

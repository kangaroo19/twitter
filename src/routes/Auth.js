import AuthForm from "components/AuthForm";
import { getAuth,signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword,signInWithEmailAndPassword, GithubAuthProvider } from "firebase/auth";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTwitter,faGoogle,faGithub} from "@fortawesome/free-brands-svg-icons";
const Auth= ()=>{
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
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm/>
            <div className="authBtns">
                <button className="authBtn" onClick={onSocialClick} name="google">Continue with Google<FontAwesomeIcon icon={faGoogle} /></button>
                <button className="authBtn" onClick={onSocialClick} name="github">Continue with Github<FontAwesomeIcon icon={faGithub} /></button>
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

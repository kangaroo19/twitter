import { useEffect, useState } from "react";
import React from "react";
import AppRouter from "components/Router";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import {authService} from "fbase";
function App() {
  const auth = getAuth();
  const [init,setInit]=useState(false) //로딩창으로 대체하면 될듯
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  const [userObj,setUserObj]=useState(null)
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{ //user의 값이 바뀔 때마다 실행됨
      if(user){ //이미 로그인 했을때
        setIsLoggedIn(true)
        setUserObj({ //원래는 setUserObj(user)였는데 이렇게 하면 user객체의 크기가 너무 커서 리액트가 변화를 감지 못함 그래서 사용하는 것(이름,아이디,업데이트프로필)만 객체로 전달
          displayName:user.displayName,
          uid:user.uid,
          // updateProfile:(args)=>updateProfile(user,{displayName:user.displayName}) 
        })
        
      } else{
        setUserObj(null)
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  },[])
  const refreshUser=()=>{
    const user=authService.currentUser
    console.log(user)
    setUserObj({
      displayName:user.displayName,
      uid:user.uid,
      //updateProfile:(args)=>updateProfile(user,{displayName:user.displayName})
    })
  }
  return (
    <>
      {init ? <AppRouter 
                  refreshUser={refreshUser}
                  isLoggedIn={isLoggedIn} 
                  userObj={userObj}/> 
                  : "Initailizing"}
    </>
  );
}

export default App;

//isLoggedIn이 true라는 것은 현재 사용자가 로그인 했다는 뜻 이므로
//approuter 컴포넌트에 isloggedin 프롭에 true값 전달되고
//홈 화면 보여줌

//onAuthStateChanged
//user가 트루라는것은 이미 로그인햇다는뜻

//새로고침시
//init이 false이므로 아주 잠깐동안 initializing나옴
//firebase불러오면 user 값에 따라 isloggedin 값 바뀌고
//init 값 true로 바뀌고 home컴포넌트 불러옴
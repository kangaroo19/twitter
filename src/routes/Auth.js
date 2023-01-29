import { getAuth,signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword,signInWithEmailAndPassword, GithubAuthProvider } from "firebase/auth";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTwitter,faGoogle,faGithub} from "@fortawesome/free-brands-svg-icons";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Error from 'components/Error'
import Copyright from "components/CopyRight";
import styled from 'styled-components';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const Auth= ()=>{
    
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [newAccount,setNewAccount]=useState(true) //true일때는 create acc, false 일때는 login
    const [error,setError]=useState("")
    const [open,setOpen]=useState(false)
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
    const theme = createTheme();
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
            setOpen(true)
            setError(error.message)
        }
    }
    function callBack(value){ //자식 컴포넌트의 데이터 부모 컴포넌트(app)로 보내기 위함
        setOpen(value)
    }
    const toggleAccount=()=>setNewAccount((prev)=>!prev)
    return (
      <Grid container>
        <Grid className="auth_intro_container" item xs={8} style={{height:'100vh',}}>
            <div>
              <h1 className="auth_intro_header animate__animated animate__fadeIn">당신의 친구들과 함께 대화하세요</h1>
            </div>
        </Grid>
        {/* <Grid item style={{border:'1px solid black'}}> */}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 10 }}
            />
          <Typography component="h1" variant="h5">로그인</Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              type="email" 
              label="이메일"
              name="email"
              autoComplete="email"
              value={email}
              onChange={onChange}
              autoFocus
            />
            <TextField
              margin="normal"
              type="password" 
              required
              fullWidth
              name="password"
              label="비밀번호"
              value={password}
              onChange={onChange}
              id="password"
              autoComplete="current-password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onSubmit}
            >
              {newAccount ? "계정 생성" : "로그인"}
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <span className="login_toggle"  onClick={toggleAccount}>{newAccount ? "로그인 하기" : "계정 생성하기"}</span>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              onClick={onSocialClick} 
              name="google"
            > 
            <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon> 구글로 로그인
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
             <FontAwesomeIcon icon={faGithub} />깃허브로 로그인
            </Button>
          </Box>
        </Box>
        <Copyright/>
        {open?<Error error={error} callBack={callBack}/>:null}
      </Container>
    </ThemeProvider>
    </Grid>
    // </Grid>
  );
    
}
export default Auth

// https://firebase.google.com/docs/auth/web/password-auth?authuser=1#web-version-9

//Auth 컴포넌트에서 이메일을 만들고 로그인하던,
//구글로 로그인하던,깃허브로 로그인하던
//로그인 성공하면 user정보가 채워지고
//user값이 변화하는지 지켜보는 app.js컴포넌트의 onAuthStateChanged함수가
//isloggenin값 변화에 따라 다음 컴포넌트 보여줌



import React, { useState } from "react";
import { HashRouter as Router,Route,Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation"
import { Grid } from "@mui/material";
export default ({refreshUser,isLoggedIn,userObj})=>{
    return (
        <Router>
            <Grid container>
            {isLoggedIn && 
            <Grid item xs={3} style={{borderRight:'1px solid black',height:'100vh'}}>
                <Navigation userObj={userObj} />
            </Grid>
            }
            <Switch><>
                {isLoggedIn 
                ? 
                <Grid item xs={6}>
                <section style={{
                    maxWidth: 700,
                    width: "800px",
                    margin: "0 auto",
                    marginTop: '40px',
                    // display: "flex",
                    // justifyContent: "center",
                  }}>
                 <Route exact path="/"><Home userObj={userObj}/></Route>
                 <Route exact path="/profile"><Profile userObj={userObj} refreshUser={refreshUser}/></Route>
                </section>
                </Grid>
                :
                <>
                 <Route exact path="/"><Auth/></Route>
                </>} </>  
            </Switch>
            <Grid item xs={3}>
                <article className=""style={{borderLeft:'1px solid black',height:'100vh'}}></article>
            </Grid>
            </Grid>

            
        </Router>
    )
}

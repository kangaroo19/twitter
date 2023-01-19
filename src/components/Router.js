import React, { useState } from "react";
import { HashRouter as Router,Route,Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation"
export default ({isLoggedIn})=>{
    console.log(isLoggedIn)
    return (
        <Router>
            {isLoggedIn && <Navigation/>}
            <Switch>
                {isLoggedIn 
                ? 
                <>
                 <Route exact path="/"><Home/></Route>
                 <Route exact path="/profile"><Profile/></Route>
                </>
                :
                <>
                 <Route exact path="/"><Auth/></Route>
                </>}   
            </Switch>
        </Router>
    )
}

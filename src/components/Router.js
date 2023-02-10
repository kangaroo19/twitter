//네비게이션 화면 및 라우팅 
import React, { useState } from "react";
import { HashRouter as Router,Route,Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation"
import { Grid } from "@mui/material";
import {Link} from "react-router-dom"



import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import Person2Icon from '@mui/icons-material/Person2';


export default ({refreshUser,isLoggedIn,userObj},props)=>{

    const drawerWidth = 240;

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
        <Toolbar />
        <Divider />
        <List>
            <Link to="/" style={{textDecoration:'none',color:'black'}}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary="홈 화면"></ListItemText>
                    </ListItemButton>
                </ListItem>
            
            </Link>
            <Link to="/profile" style={{textDecoration:'none',color:'black'}}>
                <ListItem disablePadding>
                <ListItemButton>
                        <ListItemIcon>
                            <Person2Icon/>
                        </ListItemIcon>
                        <ListItemText primary="내 프로필"></ListItemText>
                    </ListItemButton>
                </ListItem>
            </Link>
            
        </List>
        <Divider />
        
        </div>
    );

  const container = window !== undefined ? () => window().document.body : undefined;
    return (
        // 네비게이션화면
        <Router>
            <Grid>
            {isLoggedIn ?
            <Box sx={{ display: 'flex',}}>
            <CssBaseline />
            <AppBar
              position="fixed"
              sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
              }}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  안녕하세요! {userObj.displayName}님
                </Typography>
              </Toolbar>
            </AppBar>
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
            >
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
              >
                {drawer}
              </Drawer>
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
              >
                {drawer}
              </Drawer>
            </Box>
            <Box
              component="main"
              sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
              <Toolbar />

            {/*홈화면 ,프로필화면,로그인화면 라우팅*/}
           
                    <Switch><>
                        {isLoggedIn 
                        &&
                        <Grid >
                                
                        <Grid container>
                            <Grid item xs={8}>
                                <Route exact path="/"><Home userObj={userObj}/></Route>
                            </Grid>
                            <Grid item xs={4}>
                                {/* 친구목록 컴포넌트 추가 미디어 쿼리 고려해야됨 */}
                            </Grid>
                        </Grid>
                        <Route exact path="/profile"><Profile userObj={userObj} refreshUser={refreshUser}/></Route>
                        
                        </Grid>
                        } </>  
                    </Switch>
                
           

            </Box>
            {/* 로그인 화면 */}
          </Box>
          
            :<Route exact path="/"><Auth></Auth></Route>}
            
           
            </Grid>

            
        </Router>
    )
}

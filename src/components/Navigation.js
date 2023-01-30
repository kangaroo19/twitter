import React from "react";
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {faBars} from "@fortawesome/free-solid-svg-icons";
// import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

//
// import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import MuiAppBar from '@mui/material/AppBar';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { mainListItems, secondaryListItems } from './listItems';
import MuiDrawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );
function Navigation({userObj}){
    const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
    return (
        <nav>
            <ul style={{ display: "flex", justifyContent: "center", marginTop: 50,flexDirection:'column',alignItems:'center' }}>
                <li style={{marginBottom:'50px',fontSize:'1.5rem'}}>
                <Link to="/" style={{textDecoration:'none',color:'#000'}}>
                    {/* <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" /> */}
                    <span > <FontAwesomeIcon icon={faTwitter} color={"#000"} size="1x" />메인 화면</span>
                </Link>
                </li>
                <li style={{fontSize:'1.5rem',}}>
                <Link to="/profile" style={{textDecoration:'none',color:'#000'}}>
                        <span><FontAwesomeIcon icon={faUser} color={"#000"} size="1x" />내 프로필</span>
                        {/* <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" /> */}
                        {/* <span style={{ marginTop: 10 }}>{userObj.displayName? `${userObj.displayName}의 Profile`: "Profile"} */}
                        {/* </span> */}
                </Link>
                </li>
            </ul>
        </nav>


    //     <Box sx={{ flexGrow: 1 }}>
    //   <AppBar position="fixed" open={open}>
    //   <Toolbar
            
    //         sx={{
    //           pr: '24px', // keep right padding when drawer closed
    //         }}
    //       >
    //         <IconButton
    //           edge="start"
    //           color="inherit"
    //           aria-label="open drawer"
    //           onClick={toggleDrawer}
    //           sx={{
    //             marginRight: '36px',
    //             ...(open && { display: 'none' }),
    //           }}
    //         >
    //         <FontAwesomeIcon icon={faBars}  size="1x" />

    //         </IconButton>
    //         <Typography
    //           component="h1"
    //           variant="h6"
    //           color="inherit"
    //           noWrap
    //           sx={{ flexGrow: 1 }}
    //         >
    //           안녕하세요 {userObj.displayName}님
    //         </Typography>
    //         {/* <IconButton color="inherit">
    //           <Badge badgeContent={4} color="secondary">
    //             <NotificationsIcon />
    //           </Badge>
    //         </IconButton> */}
    //       </Toolbar>
    //   </AppBar>
    //   <Drawer className="drawer"style={{height:'100vh',position:'fixed',top:0}} variant="permanent" open={open}>
    //       <Toolbar
    //         sx={{
    //           display: 'flex',
    //           alignItems: 'center',
    //           justifyContent: 'flex-end',
    //           px: [1],
    //         }}
    //       >
    //         <IconButton onClick={toggleDrawer}>
    //             <FontAwesomeIcon icon={faBars}  size="1x" />
              
    //         </IconButton>
    //       </Toolbar>
    //       <Divider />
    //       <List component="nav">
    //         {/* {mainListItems} */}
    //         <ListItemButton>
    //         <Link to="/" style={{ marginRight: 10 }}>
    //   <ListItemIcon>
      
    //     <DashboardIcon />
        
    //   </ListItemIcon>
    //   </Link>
    //   <Link to="/" style={{ marginRight: 10 }}>
    //   <ListItemText primary="메인" />
    //   </Link>
    // </ListItemButton>
    // <ListItemButton>
    // <Link
    //                 to="/profile"
    //                 style={{ marginRight: 10 }}>
    //   <ListItemIcon>
    //     <PeopleIcon />
    //   </ListItemIcon>
    //   </Link>
    //   <Link
    //                 to="/profile"
    //                 style={{ marginRight: 10 }}>
    //                     <ListItemText primary="내 프로필" />
    //                     {/* <span style={{ marginTop: 10 }}>{userObj.displayName? `${userObj.displayName}의 Profile`: "Profile"} */}
    //                     {/* </span> */}
    //             </Link>
    // </ListItemButton>
    //       </List>
    //     </Drawer>
    // </Box>
    )
}

export default Navigation
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';
export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="메인" />
    </ListItemButton>
    
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link
                    to="/profile"
                    style={{
                    marginLeft: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    fontSize: 12,
                    }}>
                        <ListItemText primary="내 프로필" />
                        {/* <span style={{ marginTop: 10 }}>{userObj.displayName? `${userObj.displayName}의 Profile`: "Profile"} */}
                        {/* </span> */}
                </Link>
    </ListItemButton>
   
  </React.Fragment>
);
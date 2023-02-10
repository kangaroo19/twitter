import React from "react";
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {faBars} from "@fortawesome/free-solid-svg-icons";





import { Sidebar, SidebarItem } from 'react-responsive-sidebar';

function Navigation({userObj}){
  const items = [
    <SidebarItem><Link to="/" style={{textDecoration:'none',color:'white'}}><FontAwesomeIcon icon={faTwitter} color={"#fff"} size="1x" />홈 화면</Link></SidebarItem>,
    <SidebarItem><Link to="/profile" style={{textDecoration:'none',color:'white'}}><FontAwesomeIcon icon={faUser} color={"#fff"} size="1x" />내 프로필</Link></SidebarItem>,
  ];
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
                    <FontAwesomeIcon icon={faTwitter} color={"#000"} size="1x" className="nav-icon"/><span className="nav-span">메인 화면</span>
                </Link>
                </li>
                <li style={{fontSize:'1.5rem',}}>
                <Link to="/profile" style={{textDecoration:'none',color:'#000'}}>
                <FontAwesomeIcon icon={faUser} color={"#000"} size="1x" className="nav-icon"/><span className="nav-span">내 프로필</span>
                        {/* <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" /> */}
                        {/* <span style={{ marginTop: 10 }}>{userObj.displayName? `${userObj.displayName}의 Profile`: "Profile"} */}
                        {/* </span> */}
                </Link>
                </li>
            </ul>
        </nav>


    
    )
}

export default Navigation
import React from "react";
import {doc,deleteDoc, updateDoc} from 'firebase/firestore'
import { getStorage, ref, deleteObject } from "firebase/storage";
import { storageService } from "fbase";
import { getDatabase, child, get } from "firebase/database";
import { dbService } from "fbase";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const Nweet=({nweetObj,isOwner})=>{

    const [editing,setEditing]=useState(false) //edit form 토글버튼 위함 true면 edit form 나옴
    const [newNweet,setNewNweet]=useState(nweetObj.text) //nweet의 값 수정가능
    const onDeleteClick=async()=>{
        const ok=window.confirm("Are you sure") //alert창같은거 확인누르면 true 반환
        if(ok){
            await deleteDoc(doc(dbService,"nweets",`${nweetObj.id}`)) //path는 아이디값 (사용자 아이디값 아님),database안의 값 삭제
            await deleteObject(ref(storageService,nweetObj.attachmentUrl,nweetObj.creatorId)) //storage안의 값 삭제
        }
    }
    
    const toggleEditing=()=>setEditing((prev)=>!prev) 
    const onSubmit=async(event)=>{
        event.preventDefault()
        await updateDoc(doc(dbService,"nweets",`${nweetObj.id}`),{text:newNweet})
        setEditing(false)
    }
    const onChange=(event)=>{
        const {target:{value}}=event
        setNewNweet(value)
    }
    
    return (
        <div className="nweet">
           {
                editing ? (
                    <>
                        <form onSubmit={onSubmit} className="container nweetEdit">
                            <input 
                                type="text" 
                                placeholder="Edit your nweet"
                                value={newNweet} 
                                required
                                onChange={onChange}/>
                            <input type="submit" value="Update Nweet" className="formBtn" />
                        </form>
                        <span onClick={toggleEditing} className="formBtn cancelBtn">Cancel</span>
                    </>
                ) : (<List sx={{ width: '100%',  bgcolor: 'background.paper' }} >
                <ListItem alignItems="flex-start" divider>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={nweetObj.creatorImg} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={nweetObj.creatorName}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          
                        </Typography>
                        {nweetObj.text}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                </List>
                    // <>
                    
                    //     <h4>{nweetObj.creatorName}:{nweetObj.text}</h4>
                    //     {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
                    //     {isOwner && ( 
                    //         <div className="nweet__actions">
                    //         <span onClick={onDeleteClick}>
                    //         <FontAwesomeIcon icon={faTrash} />
                    //       </span>
                    //       <span onClick={toggleEditing}>
                    //         <FontAwesomeIcon icon={faPencilAlt} />
                    //       </span>
                    //     </div>
                    //     )}
                    // </>
            )}
        </div>
    )
}

export default Nweet
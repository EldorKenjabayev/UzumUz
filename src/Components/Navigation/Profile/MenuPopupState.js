import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Avatar } from '@mui/material';
export default function MenuPopupState({ loggedInUserName, handleLogout}) {
  if (!loggedInUserName) {
    return null; 
  }

  return (
    
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Avatar sx={{
            width:'35px',
            height:"35px",
            cursor:'pointer',
            marginTop:'6px'
          }} variant="contained" {...bindTrigger(popupState)}>
            {loggedInUserName.charAt(0).toUpperCase()}
          </Avatar>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Mening Profilim</MenuItem>
            <MenuItem onClick={() => { popupState.close(); handleLogout(); }}>Chiqish</MenuItem> 
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}

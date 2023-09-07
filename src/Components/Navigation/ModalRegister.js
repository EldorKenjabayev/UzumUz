import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Registration from "./Registration";
import Authorization from "./Authorization";
import "./modal.css";
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "95%",
//   bgcolor: "background.paper",
//   boxShadow: "2px 2px #ccc",
//   p: 2,
//   borderRadius: "15px",
// };

const ModalRegister = ({
  open,
  handleClose,
  snucbar,
  setSnucbarpen,
  setIsLoggedIn,
  setSnucbarauthorization,
  isLoggedIn,
  loggedInUserName,
  setLoggedInUserName,
  ProfileUser,
  setProfileUser,
}) => {
  const [register, setRegister] = useState(false);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: "2px 2px #ccc",
              p: 2,
              borderRadius: "15px",
            }}
            className="modal"
          >
            {register ? (
              <Registration
                setOpen={handleClose}
                setRegister={setRegister}
                snucbar={snucbar}
                setSnucbarpen={setSnucbarpen}
              />
            ) : (
              <Authorization
                setOpen={handleClose}
                setRegister={setRegister}
                setSnucbarauthorization={setSnucbarauthorization}
                isLoggedIn={isLoggedIn}
                loggedInUserName={loggedInUserName}
                setLoggedIn={setIsLoggedIn}
                setLoggedInUserName={setLoggedInUserName}
                ProfileUser={ProfileUser}
                setProfileUser={setProfileUser}
              />
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalRegister;

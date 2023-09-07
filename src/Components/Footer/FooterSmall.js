import React from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  Box,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import LogoAppstore from "./Img/download-on-the-app-store-apple-logo-svgrepo-com.svg";
import LogoGoogleplay from "./Img/google-play-download-android-app-logo-svgrepo-com.svg";
import LogoInsta from "./Img/Frame.png";
import LogoTealegramm from "./Img/telegram.png";
import LogoFacebook from "./Img/facebook.png";
import LogoYouTube from "./Img/youtube.png";
import "./FooterSmall.css";
const accordionStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export default function FooterSmall() {
  return (
    <Box
      sx={{
        fontFamily: "Robobto",
      }}
    >
      <Accordion style={accordionStyle}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" align="center">
            Biz haqimizda
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography align="center">Topshirish punktlari</Typography>
          <br />
          <Typography align="center">Vakansiyalar</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion style={accordionStyle}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" align="center">
            Foydalanuvchilarga
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography align="center">Biz bilan bogʻlanish</Typography>
          <br />
          <Typography align="center">Savol-Javob</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion style={accordionStyle}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" align="center">
            Tadbirkorlarga
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography align="center">Uzumda soting</Typography>
          <br />
          <Typography align="center">Sotuvchi kabinetiga kirish</Typography>
        </AccordionDetails>
      </Accordion> <br />
      <Box
        sx={{
          fontFamily: "Roboto",
        }}
      >
        <Box className="flexFooter2">
          <Box>
            <h3>Ilovani yuklab olish</h3>
            <li style={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center'
            }}>
              <Link style={{
                height:'70px'
              }}
                to={
                  "https://apps.apple.com/ru/app/uzum-%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82-%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD/id1640483056"
                }
              >
                <img
                  src={LogoAppstore}
                  alt="App Store"
                  style={{
                    width: "122px",
                  }}
                />
              </Link>
              <Link
                to={"https://play.google.com/store/apps/details?id=uz.uzum.app"}
              >
                <img
                  src={LogoGoogleplay}
                  alt="Google Play"
                  style={{
                    width: "122px",
                  }}
                />
              </Link>
            </li>
          </Box>
          <Box className="flexSmall">
            <h3>Uzum ijtimoiy tarmoqlarda</h3>
            <Box
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "10px",
                width:"20%",
                margin:"auoto"
              }}
            >
              <Link to={"https://www.instagram.com/uzum.market"}>
                <img src={LogoInsta} alt="instagram" />
              </Link>
              <Link to={"https://t.me/uzum_market"}>
                <img src={LogoTealegramm} alt="telegramm" />
              </Link>
              <Link
                to={"https://www.youtube.com/channel/UCY3nNF2MUDKHrELA6LzbnHA"}
              >
                <img src={LogoYouTube} alt="telegramm" />
              </Link>
              <Link to={"https://www.facebook.com/uzummarket"}>
                <img src={LogoFacebook} alt="telegramm" />
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{
        fontFamily:'Roboto'
      }}>
        <hr className="footer-line" />
        <Box sx={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                flexDirection:'column',
                textAlign:'center'
            }}>
            <Box>
            <h4>Maxfiylik kelishuvi</h4>
            <h4>Foydalanuvchi kelishuvi</h4>
            </Box>
            <p>«2023© XK MCHJ «UZUM MARKET». STIR 309376127. Barcha huquqlar himoyalangan»</p>
        </Box>
      </Box>
    </Box>
  );
}

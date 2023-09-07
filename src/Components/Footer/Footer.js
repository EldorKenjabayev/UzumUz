import { Box } from "@mui/material";
import React from "react";
import LogoAppstore from "./Img/Снимок экрана 2023-09-05 122813.png";
import LogoGoogleplay from "./Img/Снимок экрана 2023-09-05 122833.png";
import LogoInsta from "./Img/Frame.png";
import LogoTealegramm from "./Img/telegram.png";
import LogoFacebook from "./Img/facebook.png";
import LogoYouTube from "./Img/youtube.png";
import "./Footer.css";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <Box>
      <Box
        sx={{
          fontFamily: "Roboto",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 3%",
          gap: "3%",
          flexWrap: "wrap",
        }}
      >
        <ul>
          <h3>Biz haqimizda</h3>
          <li>Topshirish punktlari</li>
          <li>Vakansiyalar</li>
        </ul>
        <ul>
          <h3>Foydalanuvchilarga</h3>
          <li>Biz bilan bogʻlanish</li>
          <li>Savol-Javob</li>
        </ul>
        <ul>
          <h3>Tadbirkorlarga</h3>
          <li>Uzumda soting</li>
          <li>Sotuvchi kabinetiga kirish</li>
        </ul>
        <ul className="flexFooter">
          <Box>
            <h3>Ilovani yuklab olish</h3>
            <li
              style={{
                display: "flex",
                gap: "3vw",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Link
                to={
                  "https://apps.apple.com/ru/app/uzum-%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82-%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD/id1640483056"
                }
              >
                <img src={LogoAppstore} alt="App Store" />
              </Link>
              <Link
                to={"https://play.google.com/store/apps/details?id=uz.uzum.app"}
              >
                <img src={LogoGoogleplay} alt="Google Play" />
              </Link>
            </li>
          </Box>
          <Box>
            <h3>Uzum ijtimoiy tarmoqlarda</h3>
            <li
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
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
            </li>
          </Box>
        </ul>
      </Box>
      <Box sx={{
        fontFamily:'Roboto'
      }}>
        <hr className="footer-line" />
        <Box sx={{
                display:'flex',
                justifyContent:'space-between',
                alignItems:'center'
            }}>
            <Box sx={{
                display:'flex',
                gap:'1vw'
            }}>
            <h4>Maxfiylik kelishuvi</h4>
            <h4>Foydalanuvchi kelishuvi</h4>
            </Box>
            <p>«2023© XK MCHJ «UZUM MARKET». STIR 309376127. Barcha huquqlar himoyalangan»</p>
        </Box>
      </Box>
    </Box>
  );
}
